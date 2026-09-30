from rest_framework import viewsets
from vendeur.models.produit import ProduitModel
from vendeur.serializers.produit_sz import ProduitSerializer


class ProduitViewSet(viewsets.ModelViewSet):
    queryset = ProduitModel.objects.all()
    serializer_class = ProduitSerializer
    
    