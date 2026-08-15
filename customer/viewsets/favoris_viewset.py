from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from customer.models.favoris import Favoris
from customer.serializers.favoris import FavorisSerializer


class FavorisViewSet(ModelViewSet):
    queryset = Favoris.objects.all()
    serializer_class = FavorisSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return Favoris.objects.none()
        # Chaque utilisateur ne voit que ses favoris
        user = self.request.user
        return Favoris.objects.filter(profil__user=user)