from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from base.utils.permissions import IsAdmin
from vendor.serializers.vendeur import VendeurSerializer
from vendor.models.boutique import Vendeur


class VendeurViewSet(viewsets.ModelViewSet):
    queryset = Vendeur.objects.filter(active=True)
    serializer_class = VendeurSerializer

    # Lecture publique ; gestion réservée aux admins
    def get_permissions(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return [IsAdmin()]
        return [AllowAny()]