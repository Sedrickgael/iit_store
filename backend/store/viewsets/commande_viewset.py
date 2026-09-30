from rest_framework import viewsets
from backend.store.models.commande import CommandeModel
from backend.store.serializers.commande_sz import CommandeSerializer


class CommandeViewSet(viewsets.ModelViewSet):
    queryset = CommandeModel.objects.all()
    serializer_class = CommandeSerializer