from store.models.commande import Commande
from rest_framework import viewsets
from store.serializers.commande import CommandeSerializer 

class CommandeViewSet(viewsets.ModelViewSet):
    queryset = Commande.objects.filter(active = True)
    serializer_class = CommandeSerializer