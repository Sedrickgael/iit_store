from rest_framework import viewsets
from vendeur.serializers.categorie_sz import CategorieSerializer
from vendeur.models.categorie import Categorie


class CategorieViewSet(viewsets.ModelViewSet):
    queryset = Categorie.objects.filter(active=True)
    serializer_class = CategorieSerializer