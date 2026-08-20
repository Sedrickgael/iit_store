from rest_framework import viewsets

from store.models.panier import Panier
from store.serializers.panier_serializer import PanierSerializer


class PanierViewSet(viewsets.ModelViewSet):
    queryset = Panier.objects.all()
    serializer_class = PanierSerializer
