from store.models.mode_de_reglement import ModeDeReglement
from rest_framework import viewsets
from store.serializers.mode_de_paiement import ModeDeReglementSerializer

class ModeDeReglementViewSet(viewsets.ModelViewSet):
    queryset = ModeDeReglement.objects.filter(active = True)
    serializer_class = ModeDeReglementSerializer