from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from catalogues.models.produit import Produit
from catalogues.serializers.produit_serializer import ProduitSerializer
# Create your views here.


class ProduitViewSet(viewsets.ModelViewSet):
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer

    def get_permissions(self):
        # La lecture est publique (la vitrine), l'écriture exige d'être connecté
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
            # Lecture publique : tous les produits actifs (la vitrine)
            if self.action in ['list', 'retrieve']:
                return Produit.objects.filter(is_active=True)
            # Écriture : un vendeur ne voit que SES produits
            return Produit.objects.filter(boutique__user=self.request.user)

    def perform_create(self, serializer):
        # Le produit appartient automatiquement à la boutique du vendeur connecté
        serializer.save(boutique=self.request.user.boutique)