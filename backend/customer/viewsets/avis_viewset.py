from rest_framework import viewsets

from backend.customer.models.avis import AvisModel
from backend.customer.serializers.avis_sz import AvisSerializer


class AvisViewSet(viewsets.ModelViewSet):
    queryset = AvisModel.objects.all()
    serializer_class = AvisSerializer
