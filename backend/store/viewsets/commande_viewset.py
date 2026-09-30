from rest_framework import viewsets
from store.models.commande import CommandeModel
from store.serializers.commande_sz import CommandeSerializer


class CommandeViewSet(viewsets.ModelViewSet):
    queryset = CommandeModel.objects.all()
    serializer_class = CommandeSerializer