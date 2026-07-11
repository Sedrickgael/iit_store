from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from store.models.panier import Panier
from store.serializers.panier import PanierSerializer


class PanierViewSet(ModelViewSet):
    queryset = Panier.objects.all()
    serializer_class = PanierSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return Panier.objects.none()
        user = self.request.user
        return Panier.objects.filter(profil__user=user)
