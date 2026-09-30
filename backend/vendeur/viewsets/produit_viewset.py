from rest_framework import viewsets
from backend.vendeur.models.produit import ProduitModel
from backend.vendeur.serializers.produit_sz import ProduitSerializer


class ProduitViewSet(viewsets.ModelViewSet):
    queryset = ProduitModel.objects.all()
    serializer_class = ProduitSerializer
    
    