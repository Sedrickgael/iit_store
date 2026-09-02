from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from base.utils.permissions import IsVendeur
from vendor.serializers.produit import ProduitSerializer
from vendor.models.produit import Produit


class ProduitViewSet(viewsets.ModelViewSet):
    queryset = Produit.objects.filter(active=True)
    serializer_class = ProduitSerializer

    # Lecture publique ; écriture réservée aux vendeurs/admins
    def get_permissions(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return [IsVendeur()]
        return [AllowAny()]