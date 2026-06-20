from store.models.livraison import Livraison 
from rest_framework import viewsets
from store.serializers.livraison import LivraisonSerializer

class LivraisonViewSet(viewsets.ModelViewSet):
    queryset = Livraison.objects.filter(active = True)
    serializer_class = LivraisonSerializer