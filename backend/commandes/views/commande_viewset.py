from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from commandes.models.commande import Commande
from commandes.serializers.commande_serializer import CommandeSerializer


class CommandeViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour le modèle Commande.
    """
    queryset = Commande.objects.all()
    serializer_class = CommandeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Un client ne voit que SES commandes
        qs = super().get_queryset()
        if not self.request.user.is_staff:
            qs = qs.filter(client__profil__user=self.request.user)
        return qs