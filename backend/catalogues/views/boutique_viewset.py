from rest_framework import viewsets
from catalogues.models.boutique import Boutique
from catalogues.serializers.boutique_serializer import BoutiqueSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
# Create your views here.

class BoutiqueViewSet(viewsets.ModelViewSet):
    queryset = Boutique.objects.all()
    serializer_class = BoutiqueSerializer

    def get_permissions(self):
        # La lecture est publique (la vitrine), l'écriture exige d'être connecté
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        # Lecture publique : toutes les boutiques actives
        if self.action in ['list', 'retrieve']:
            return Boutique.objects.filter(is_active=True)
        # Écriture : un vendeur ne voit que SA boutique
        return Boutique.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # La boutique appartient automatiquement au vendeur connecté
        serializer.save(user=self.request.user)