from rest_framework import viewsets
from store.serializers.mode_de_reglement import ModeDeReglementSerializer
from store.models.mode_de_reglement import ModeDeReglement


class ModeDeReglementViewSet(viewsets.ModelViewSet):
    queryset = ModeDeReglement.objects.filter(active=True)
    serializer_class = ModeDeReglementSerializer