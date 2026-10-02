from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from accounts.models.adresse import Adresse
from accounts.serializers.adresse_serializer import AdresseSerializer


class AdresseViewSet(viewsets.ModelViewSet):
    queryset = Adresse.objects.all()
    serializer_class = AdresseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Un utilisateur ne voit que les adresses de SON profil
        return Adresse.objects.filter(profil__user=self.request.user)

    def perform_create(self, serializer):
        # L'adresse appartient automatiquement au profil de l'utilisateur connecté
        serializer.save(profil=self.request.user.profil)