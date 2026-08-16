from rest_framework import viewsets

from store.models.mode_paiement_serializer import ModePaiementModel
from store.serializers.mode_paiement_serializer import ModePaiementSerializer


class ModePaiementViewSet(viewsets.ModelViewSet):
    queryset = ModePaiementModel.objects.all()
    serializer_class = ModePaiementSerializer
