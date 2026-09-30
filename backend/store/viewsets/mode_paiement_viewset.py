from rest_framework import viewsets

from backend.store.models.mode_paiement import ModePaiementModel
from backend.store.serializers.mode_paiement_sz import ModePaiementSerializer


class ModePaiementViewSet(viewsets.ModelViewSet):
    queryset = ModePaiementModel.objects.all()
    serializer_class = ModePaiementSerializer
