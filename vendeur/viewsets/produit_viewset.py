from rest_framework import viewsets
from vendor.serializers.produit import ProduitSerializer
from vendor.models.produit import Produit


class ProduitViewSet(viewsets.ModelViewSet):
    queryset = Produit.objects.filter(active=True)
    serializer_class = ProduitSerializer