from rest_framework import viewsets
from vendor.serializers.vendeur import VendeurSerializer
from vendor.models.boutique import Vendeur


class VendeurViewSet(viewsets.ModelViewSet):
    queryset = Vendeur.objects.filter(active=True)
    serializer_class = VendeurSerializer