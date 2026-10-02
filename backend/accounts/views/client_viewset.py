from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from accounts.models.client import Client
from accounts.serializers.client_serializer import ClientSerializer


class ClientViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Lecture seule : le Client ne crée rien via l'API.
    Ses actions (commande, panier) passent par d'autres ressources.
    """
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Un utilisateur ne voit que SON client
        return Client.objects.filter(profil__user=self.request.user)