from vendor.models.etiquette import Etiquette
from rest_framework import viewsets
from vendor.serializers.etiquette import EtiquetteSerializer 

class EtiquetteViewSet(viewsets.ModelViewSet):
    queryset = Etiquette.objects.filter(active = True)
    serializer_class = EtiquetteSerializer