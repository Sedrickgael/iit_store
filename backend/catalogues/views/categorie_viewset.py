from rest_framework import viewsets
from catalogues.models.categorie import Categorie
from rest_framework.permissions import AllowAny, IsAdminUser
from catalogues.serializers.categorie_serializer import CategorieSerializer
# Create your views here.



class CategorieViewSet(viewsets.ModelViewSet):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer

    def get_permissions(self):
        # La lecture est publique (tout le monde voit les catégories)
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        # L'écriture est réservée à l'admin
        return [IsAdminUser()]