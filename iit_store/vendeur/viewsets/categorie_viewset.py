from rest_framework import viewsets
from vendeur.models.categorie import Categorie
from vendeur.serializers.categorie_sz import CategorieSerializer
# Create your views here.

class CategorieViewSet(viewsets.ModelViewSet):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer