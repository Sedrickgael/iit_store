from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from commandes.models.detail_panier import DetailsPanier
from commandes.serializers.details_panier_serializer import (
    DetailsPanierSerializer,
    DetailsPanierEcritureSerializer,
)


class DetailsPanierViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour les détails du panier.
    """
    queryset = DetailsPanier.objects.all()
    serializer_class = DetailsPanierSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        # Lecture : produit en détail. Écriture : produit par id.
        if self.action in ['create', 'update', 'partial_update']:
            return DetailsPanierEcritureSerializer
        return DetailsPanierSerializer

    def get_queryset(self):
        # Un client ne voit que les détails de SON panier
        return DetailsPanier.objects.filter(panier__client__profil__user=self.request.user)

    def perform_create(self, serializer):
        # Le panier du client connecté
        panier = self.request.user.profil.client.panier
        produit = serializer.validated_data['produit']
        quantity = serializer.validated_data['quantity']

        # Si le produit est déjà dans le panier, on augmente la quantité
        # Sinon, on crée une nouvelle ligne
        ligne, created = DetailsPanier.objects.get_or_create(
            panier=panier,
            produit=produit,
            defaults={'quantity': quantity},
        )
        if not created:
            ligne.quantity += quantity
            ligne.save()