from rest_framework import viewsets

from customer.models.avis import AvisModel
from customer.serializers.avis_sz import AvisSerializer


class AvisViewSet(viewsets.ModelViewSet):
    queryset = AvisModel.objects.all()
    serializer_class = AvisSerializer
