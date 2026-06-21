from rest_framework import viewsets
from vendor.serializers.etiquette_serializer import EtiquetteSerializer
from vendor.models.etiquette import Etiquette


class EtiquetteViewSet(viewsets.ModelViewSet):
    queryset = Etiquette.objects.filter(active=True)
    serializer_class = EtiquetteSerializer