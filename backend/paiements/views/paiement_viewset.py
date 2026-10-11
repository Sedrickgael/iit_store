from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from paiements.models.paiement import Paiement
from paiements.serializers.paiement_serializer import PaiementSerializer


class PaiementViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet pour le modèle Paiement (lecture seule).
    """
    queryset = Paiement.objects.all()
    serializer_class = PaiementSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Un client ne voit que SES paiements
        return Paiement.objects.filter(commande__client__profil__user=self.request.user)