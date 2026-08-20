from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from store.models.ligne_commande import LigneCommande
from store.serializers.ligne_commande_serializer import LigneCommandeSerializer


class LigneCommandeViewSet(ModelViewSet):
    queryset = LigneCommande.objects.all()
    serializer_class = LigneCommandeSerializer
    permission_classes = [IsAuthenticated]