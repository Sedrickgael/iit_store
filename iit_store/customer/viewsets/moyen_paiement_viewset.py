from rest_framework import viewsets

from customer.models.moyen_paiement import MoyenPaiementModel
from customer.serializers.moyen_paiement_sz import MoyenPaiementSerializer


class MoyenPaiementViewSet(viewsets.ModelViewSet):
    queryset = MoyenPaiementModel.objects.all()
    serializer_class = MoyenPaiementSerializer
