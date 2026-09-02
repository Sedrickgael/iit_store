from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from base.utils.permissions import IsVendeur
from vendor.serializers.etiquette import EtiquetteSerializer
from vendor.models.etiquette import Etiquette


class EtiquetteViewSet(viewsets.ModelViewSet):
    queryset = Etiquette.objects.filter(active=True)
    serializer_class = EtiquetteSerializer

    def get_permissions(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return [IsVendeur()]
        return [AllowAny()]