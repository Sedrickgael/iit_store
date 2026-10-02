from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from accounts.models.profil_client import ProfilClient
from accounts.serializers.profil_client_serializer import ProfilClientSerializer


class ProfilClientViewSet(viewsets.ModelViewSet):
    queryset = ProfilClient.objects.all()
    serializer_class = ProfilClientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Un utilisateur ne voit que SON profil
        return ProfilClient.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Le profil appartient automatiquement à l'utilisateur connecté
        serializer.save(user=self.request.user)