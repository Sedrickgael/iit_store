from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from base.utils.permissions import IsVendeur
from vendor.serializers.categorie import CategorieSerializer
from vendor.models.categorie import Categorie


class CategorieViewSet(viewsets.ModelViewSet):
    queryset = Categorie.objects.filter(active=True)
    serializer_class = CategorieSerializer

    def get_permissions(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return [IsVendeur()]
        return [AllowAny()]