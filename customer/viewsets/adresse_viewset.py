from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from customer.models.adresse import Adresse
from customer.serializers.adresse import AdresseSerializer


class AdresseViewSet(ModelViewSet):
    queryset = Adresse.objects.all()
    serializer_class = AdresseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return Adresse.objects.none()
        # Chaque utilisateur ne voit que ses propres adresses
        user = self.request.user
        return Adresse.objects.filter(profil__user=user)