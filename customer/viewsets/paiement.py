from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from customer.models.paiement import PaiementModel
from customer.serializers.paiement import PaiementSerializer


class PaiementViewSet(ModelViewSet):
    queryset = PaiementModel.objects.all()
    serializer_class = PaiementSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return PaiementModel.objects.none()
        user = self.request.user
        return PaiementModel.objects.filter(profil=user)
