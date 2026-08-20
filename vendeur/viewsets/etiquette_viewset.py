from rest_framework import viewsets
from vendeur.serializers.etiquette_sz import EtiquetteSerializer
from vendeur.models.etiquette import Etiquette


class EtiquetteViewSet(viewsets.ModelViewSet):
    queryset = Etiquette.objects.filter(active=True)
    serializer_class = EtiquetteSerializer