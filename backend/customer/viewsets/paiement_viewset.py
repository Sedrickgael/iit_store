from rest_framework import viewsets

from customer.models.paiement import PaiementModel
from customer.serializers.paiement_sz import PaiementSerializer


class PaiementViewSet(viewsets.ModelViewSet):
    queryset = PaiementModel.objects.all()
    serializer_class = PaiementSerializer
