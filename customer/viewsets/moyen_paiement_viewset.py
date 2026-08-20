from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from customer.models.moyen_paiement import MoyenPaiementModel
from customer.serializers.moyen_paiement_sz import MoyenPaiementSerializer


class MoyenPaiementViewSet(ModelViewSet):
    queryset = MoyenPaiementModel.objects.all()
    serializer_class = MoyenPaiementSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return MoyenPaiementModel.objects.none()
        user = self.request.user
        return MoyenPaiementModel.objects.filter(profil__user=user)