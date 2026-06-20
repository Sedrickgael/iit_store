from rest_framework import viewsets

from vendeur.models.etiquette import Etiquette
from vendeur.serializers.etiquette_sz import EtiquetteSerializer


class EtiquetteViewSet(viewsets.ModelViewSet):
    queryset = Etiquette.objects.all()
    serializer_class = EtiquetteSerializer
