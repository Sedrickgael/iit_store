from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from store.models.livraison import Livraison
from store.serializers.livraison_serializer import LivraisonSerializer


class LivraisonViewSet(ModelViewSet):
    queryset = Livraison.objects.all()
    serializer_class = LivraisonSerializer
    permission_classes = [IsAuthenticated]