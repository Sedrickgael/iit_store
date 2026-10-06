from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from commandes.models.panier import Panier
from commandes.serializers.panier_serializer import PanierSerializer


class PanierViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour le modèle Panier.
    """
    queryset = Panier.objects.all()
    serializer_class = PanierSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Un client ne voit que SON panier
        return Panier.objects.filter(client__profil__user=self.request.user)

    def perform_create(self, serializer):
        # Le panier appartient automatiquement au client connecté
        serializer.save(client=self.request.user.profil.client)