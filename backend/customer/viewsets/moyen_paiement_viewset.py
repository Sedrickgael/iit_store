from rest_framework import viewsets

from backend.customer.models.moyen_paiement import MoyenPaiementModel
from backend.customer.serializers.moyen_paiement_sz import MoyenPaiementSerializer


class MoyenPaiementViewSet(viewsets.ModelViewSet):
    queryset = MoyenPaiementModel.objects.all()
    serializer_class = MoyenPaiementSerializer
