from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from customer.models.avis import Avis
from customer.serializers.avis import AvisSerializer


class AvisViewSet(viewsets.ModelViewSet):
    queryset = Avis.objects.filter(active=True, is_approved=True)
    serializer_class = AvisSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = Avis.objects.filter(active=True, is_approved=True)
        product_id = self.request.query_params.get("product")
        if product_id:
            qs = qs.filter(product_id=product_id)
        return qs

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data["profil"] = request.user.id
        # Auto-approbation : l'avis apparaît immédiatement
        data["is_approved"] = True

        product_id = data.get("product")
        # Si l'utilisateur a déjà un avis sur ce produit, on le met à jour
        existing = Avis.objects.filter(
            profil=request.user, product_id=product_id, active=True
        ).first()
        if existing:
            existing.note = data.get("note", existing.note)
            existing.commentaire = data.get("commentaire", existing.commentaire)
            existing.is_approved = True
            existing.save()
            return Response(
                AvisSerializer(existing).data, status=status.HTTP_200_OK
            )

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)