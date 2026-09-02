from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from store.serializers.livraison import LivraisonSerializer
from store.models.livraison import Livraison


class LivraisonViewSet(viewsets.ModelViewSet):
    queryset = Livraison.objects.filter(active=True)
    serializer_class = LivraisonSerializer
    permission_classes = [IsAuthenticated]