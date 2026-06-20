from store.models.panier import Panier 
from rest_framework import viewsets
from store.serializers.panier import PanierSerializer 

class PanierViewSet(viewsets.ModelViewSet):
    queryset = Panier.objects.filter(active = True)
    serializer_class = PanierSerializer