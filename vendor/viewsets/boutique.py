from rest_framework import viewsets
from vendor.serializers.boutique import BoutiqueSerializer
from vendor.models.boutique import Boutique


class BoutiqueViewSet(viewsets.ModelViewSet):
    queryset = Boutique.objects.filter(active=True)
    serializer_class = BoutiqueSerializer