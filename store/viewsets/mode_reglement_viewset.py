from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from store.models.mode_reglement import ModeDeReglement
from store.serializers.mode_reglement_serializer import ModeDeReglementSerializer


class ModeDeReglementViewSet(ModelViewSet):
    queryset = ModeDeReglement.objects.all()
    serializer_class = ModeDeReglementSerializer
    permission_classes = [IsAuthenticated]