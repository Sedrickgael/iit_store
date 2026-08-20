from rest_framework import viewsets
from vendeur.serializers.boutique import BoutiqueSerializer
from vendeur.models.boutique import Boutique


class BoutiqueViewSet(viewsets.ModelViewSet):
    queryset = Boutique.objects.filter(active=True)
    serializer_class = BoutiqueSerializer