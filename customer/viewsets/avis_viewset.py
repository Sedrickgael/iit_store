from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from customer.models.avis import Avis
from customer.serializers.avis import AvisSerializer


class AvisViewSet(ModelViewSet):
    queryset = Avis.objects.all()
    serializer_class = AvisSerializer
    permission_classes = [IsAuthenticated]