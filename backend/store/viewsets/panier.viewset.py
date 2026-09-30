from rest_framework import viewsets
from backend.store.models.panier import PanierModel
from backend.store.serializers.panier_sz import PanierSerializer


class PanierViewSet(viewsets.ModelViewSet):
    queryset = PanierModel.objects.all()
    serializer_class = PanierSerializer