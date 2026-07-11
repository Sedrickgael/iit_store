from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from store.models.commande import Commande
from store.serializers.commande import CommandeSerializer


class CommandeViewSet(ModelViewSet):
    queryset = Commande.objects.all()
    serializer_class = CommandeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return Commande.objects.none()
        # Chaque client ne voit que ses commandes
        user = self.request.user
        return Commande.objects.filter(profil__user=user)
