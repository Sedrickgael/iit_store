from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from base.utils.permissions import IsVendeur
from vendor.serializers.produit import ProduitSerializer
from vendor.models.produit import Produit
from vendor.models.boutique import Vendeur
from vendor.models.categorie import Categorie


class ProduitViewSet(viewsets.ModelViewSet):
    queryset = Produit.objects.filter(active=True)
    serializer_class = ProduitSerializer

    # Lecture publique ; écriture réservée aux vendeurs/admins
    def get_permissions(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return [IsVendeur()]
        return [AllowAny()]

    def get_queryset(self):
        qs = Produit.objects.filter(active=True)
        # Un vendeur ne voit que ses propres produits
        user = self.request.user
        if user and user.is_authenticated and getattr(user, "role", "") == "vendeur":
            boutique = getattr(user, "boutique", None)
            if boutique:
                qs = qs.filter(vendeur=boutique)
        return qs

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        # Associe automatiquement le produit à la boutique du vendeur connecté
        user = request.user
        if getattr(user, "role", "") == "vendeur":
            boutique = getattr(user, "boutique", None)
            if not boutique:
                return Response(
                    {"detail": "Aucune boutique associée à ce compte."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            data["vendeur"] = boutique.id

        # Catégorie générique si aucune n'est fournie
        if not data.get("categorie_id"):
            categorie, _ = Categorie.objects.get_or_create(
                name="general",
                defaults={"description": "Produits génériques"},
            )
            data["categorie_id"] = categorie.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)