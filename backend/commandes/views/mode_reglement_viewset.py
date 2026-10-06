from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAdminUser
from commandes.models.mode_reglement import ModeDeReglement
from commandes.serializers.mode_reglement_serializer import ModeReglementSerializer


class ModeReglementViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour le modèle ModeReglement.
    """
    queryset = ModeDeReglement.objects.all()
    serializer_class = ModeReglementSerializer

    def get_permissions(self):
        # La lecture est publique (tout le monde voit les modes de paiement)
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        # L'écriture est réservée à l'admin
        return [IsAdminUser()]