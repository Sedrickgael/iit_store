from vendor.models.categorie import Categorie
from rest_framework import viewsets
from vendor.serializers.categorie import CategorieSerializer 

class CategorieViewSet(viewsets.ModelViewSet):
    queryset = Categorie.objects.filter(active = True)
    serializer_class = CategorieSerializer