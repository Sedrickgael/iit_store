from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from store.serializers.favori import FavoriSerializer
from store.models.favori import Favori


class FavoriViewSet(viewsets.ModelViewSet):
    """
    Favoris de l'utilisateur connecté.
    """
    serializer_class = FavoriSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favori.objects.filter(profil=self.request.user, active=True)

    def perform_create(self, serializer):
        serializer.save(profil=self.request.user)

    def create(self, request, *args, **kwargs):
        produit_id = request.data.get("produit")
        if not produit_id:
            return Response(
                {"detail": "Le champ 'produit' est requis."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        favori, created = Favori.objects.get_or_create(
            profil=request.user,
            produit_id=produit_id,
        )
        if not created:
            return Response(
                {"detail": "Produit déjà en favoris."},
                status=status.HTTP_200_OK,
            )
        return Response(
            self.get_serializer(favori).data,
            status=status.HTTP_201_CREATED,
        )