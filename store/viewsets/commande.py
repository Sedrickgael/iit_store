from rest_framework import viewsets
from store.serializers.commande import CommandeSerializer
from store.models.commande import Commande


class CommandeViewSet(viewsets.ModelViewSet):
    queryset = Commande.objects.filter(active=True)
    serializer_class = CommandeSerializer