from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from store.serializers.commande import CommandeSerializer
from store.models.commande import Commande
from store.models.ligne_de_commande import LigneCommande
from store.models.mode_de_reglement import ModeDeReglement
from store.models.panier import Panier
from vendor.models.produit import Produit


class CommandeViewSet(viewsets.ModelViewSet):
    queryset = Commande.objects.filter(active=True)
    serializer_class = CommandeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Un utilisateur ne voit que ses propres commandes
        return Commande.objects.filter(profil=self.request.user, active=True)

    def create(self, request, *args, **kwargs):
        destination = request.data.get("destination")
        lignes = request.data.get("lignes") or []
        mode_reglement_id = request.data.get("mode_reglement")

        if not destination:
            return Response(
                {"detail": "Le champ 'destination' est requis."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not lignes:
            return Response(
                {"detail": "Le champ 'lignes' est requis."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        mode_reglement = None
        if mode_reglement_id:
            mode_reglement = ModeDeReglement.objects.filter(
                id=mode_reglement_id, active=True
            ).first()

        commande = Commande.objects.create(
            profil=request.user,
            destination=destination,
            mode_reglement=mode_reglement,
        )

        for ligne in lignes:
            product_id = ligne.get("product_id")
            quantity = int(ligne.get("quantity", 1))
            try:
                produit = Produit.objects.get(id=product_id, active=True)
            except Produit.DoesNotExist:
                continue
            LigneCommande.objects.create(
                order=commande,
                product=produit,
                quantity=max(1, quantity),
                unit_price=produit.price,
            )

        # Vide le panier de l'utilisateur après la commande
        Panier.objects.filter(profil=request.user, active=True).delete()

        return Response(
            CommandeSerializer(commande).data,
            status=status.HTTP_201_CREATED,
        )