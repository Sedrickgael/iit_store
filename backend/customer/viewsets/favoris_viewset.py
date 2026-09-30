from rest_framework import viewsets

from backend.customer.models.favoris import FavorisModel
from backend.customer.serializers.favoris_sz import FavorisSerializer


class FavorisViewSet(viewsets.ModelViewSet):
    queryset = FavorisModel.objects.all()
    serializer_class = FavorisSerializer
