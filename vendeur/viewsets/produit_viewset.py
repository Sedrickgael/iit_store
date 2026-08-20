from rest_framework import viewsets
from vendeur.serializers.produit_sz import ProduitSerializer
from vendeur.models.produit import Produit


class ProduitViewSet(viewsets.ModelViewSet):
    queryset = Produit.objects.filter(active=True)
    serializer_class = ProduitSerializer