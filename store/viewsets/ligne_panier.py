from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from store.models.ligne_panier import PanierItem
from store.serializers.ligne_panier import PanierItemSerializer


class PanierItemViewSet(ModelViewSet):
    queryset = PanierItem.objects.all()
    serializer_class = PanierItemSerializer
    permission_classes = [IsAuthenticated]
