from vendor.models.vendeur import Vendeur
from rest_framework import viewsets
from vendor.serializers.vendeur import VendeurSerializer 

class VendeurViewSet(viewsets.ModelViewSet):
    queryset = Vendeur.objects.filter(active = True)
    serializer_class = VendeurSerializer