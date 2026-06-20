from rest_framework import viewsets
from customer.models import Favorite
from customer.serializers import FavoriteSerializer

class FavoriteViewSet(viewsets.ModelViewSet):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer