from rest_framework import viewsets
from store.serializers.livraison_serializer import LivraisonSerializer
from store.models.livraison import Livraison


class LivraisonViewSet(viewsets.ModelViewSet):
    queryset = Livraison.objects.filter(active=True)
    serializer_class = LivraisonSerializer