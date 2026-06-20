from vendor.models.produit import Produit
from rest_framework import viewsets
from vendor.serializers.produit import ProduitSerializer  

class ProduitViewSet(viewsets.ModelViewSet):
    queryset = Produit.objects.filter(active = True)
    serializer_class = ProduitSerializer