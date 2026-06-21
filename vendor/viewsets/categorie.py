from rest_framework import viewsets
from vendor.serializers.categorie_serializer import CategorieSerializer
from vendor.models.categorie import Categorie


class CategorieViewSet(viewsets.ModelViewSet):
    queryset = Categorie.objects.filter(active=True)
    serializer_class = CategorieSerializer