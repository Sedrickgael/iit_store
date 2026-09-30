from rest_framework import viewsets

from backend.vendeur.models.etiquette import Etiquette
from backend.vendeur.serializers.etiquette_sz import EtiquetteSerializer


class EtiquetteViewSet(viewsets.ModelViewSet):
    queryset = Etiquette.objects.all()
    serializer_class = EtiquetteSerializer
