from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from store.serializers.panier import PanierSerializer
from store.models.panier import Panier
from store.models.ligne_panier import PanierItem
from vendor.models.produit import Produit


class PanierViewSet(viewsets.ModelViewSet):
    """
    Panier anonyme (via session_key) ou connecté (via profil).
    - Visiteur non connecté : on utilise sa session navigation.
    - Utilisateur connecté : son panier est lié à son profil.
    """
    queryset = Panier.objects.filter(active=True)
    serializer_class = PanierSerializer

    def get_permissions(self):
        if self.action == "list":
            return [AllowAny()]
        if self.action in ("ma_panier", "ajouter", "retirer", "fusionner"):
            return [AllowAny()]
        # Toute autre écriture (create/update/destroy) exige un compte
        return [IsAuthenticated()]

    def obtenir_cle_session(self, request):
        """Retourne une session_key stable, en créant la session si besoin.

        Priorité :
        1. le header `X-Session-Key` envoyé par le frontend (localStorage),
        2. sinon le cookie de session Django.
        """
        header_key = request.headers.get('X-Session-Key')
        if header_key:
            return header_key
        if request.user and request.user.is_authenticated:
            return None  # on utilisera le profil
        if not request.session.session_key:
            request.session.save()
        return request.session.session_key

    def obtenir_panier(self, request, creer=False):
        """Retrouve le panier du client courant (profil ou session)."""
        user = request.user
        if user and user.is_authenticated:
            qs = Panier.objects.filter(profil=user, active=True)
            if creer:
                return qs.first() or Panier.objects.create(profil=user)
            return qs.first()
        # Anonyme : via session_key
        session_key = self.obtenir_cle_session(request)
        qs = Panier.objects.filter(session_key=session_key, active=True)
        if creer:
            return qs.first() or Panier.objects.create(session_key=session_key)
        return qs.first()

    @action(detail=False, methods=["get"], url_path="ma_panier")
    def ma_panier(self, request):
        panier = self.obtenir_panier(request, creer=True)
        serializer = self.get_serializer(panier)
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        """Sur GET, ne renvoie que le panier du client courant."""
        panier = self.obtenir_panier(request)
        if not panier:
            return Response({"items": [], "total": 0})
        serializer = self.get_serializer(panier)
        return Response(serializer.data)

    @action(detail=False, methods=["post"], url_path="ajouter")
    def ajouter(self, request):
        """Ajoute ou incrémente un produit dans le panier."""
        product_id = request.data.get("product")
        quantity = int(request.data.get("quantity", 1))

        try:
            product = Produit.objects.get(id=product_id, active=True)
        except Produit.DoesNotExist:
            return Response({"detail": "Produit introuvable."}, status=404)

        panier = self.obtenir_panier(request, creer=True)
        item, created = PanierItem.objects.get_or_create(
            cart=panier, product=product,
            defaults={"quantity": quantity},
        )
        if not created:
            item.quantity += quantity
            item.save()

        return Response(self.get_serializer(panier).data)

    @action(detail=False, methods=["post"], url_path="retirer")
    def retirer(self, request):
        """Retire une quantité ou supprime l'article du panier."""
        product_id = request.data.get("product")
        quantity = int(request.data.get("quantity", 1))

        panier = self.obtenir_panier(request)
        if not panier:
            return Response({"detail": "Panier vide."}, status=404)

        try:
            item = PanierItem.objects.get(cart=panier, product_id=product_id)
        except PanierItem.DoesNotExist:
            return Response({"detail": "Article absent du panier."}, status=404)

        item.quantity -= quantity
        if item.quantity <= 0:
            item.delete()
        else:
            item.save()

        return Response(self.get_serializer(panier).data)

    @action(detail=False, methods=["post"], url_path="fusionner")
    def fusionner(self, request):
        """Fusionne le panier de session dans le panier du profil (après connexion)."""
        if not (request.user and request.user.is_authenticated):
            return Response({"detail": "Authentification requise."}, status=401)

        session_key = self.obtenir_cle_session(request)
        panier_session = Panier.objects.filter(session_key=session_key, active=True).first()
        panier_profil = Panier.objects.filter(profil=request.user, active=True).first()

        if panier_session:
            panier_profil = panier_profil or Panier.objects.create(profil=request.user)
            for item in panier_session.items.all():
                obj, created = panier_profil.items.get_or_create(
                    product=item.product,
                    defaults={"quantity": item.quantity},
                )
                if not created:
                    obj.quantity += item.quantity
                    obj.save()
            panier_session.delete()

        if panier_profil:
            return Response(self.get_serializer(panier_profil).data)
        return Response({"detail": "Aucun panier à fusionner."}, status=404)