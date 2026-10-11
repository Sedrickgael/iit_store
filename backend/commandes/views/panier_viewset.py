from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db import transaction
from commandes.models.panier import Panier
from commandes.models.detail_panier import DetailsPanier
from commandes.models.commande import Commande
from commandes.models.detail_commande import DetailsCommande
from commandes.models.mode_reglement import ModeDeReglement
from commandes.serializers.panier_serializer import PanierSerializer
from commandes.serializers.commande_serializer import CommandeSerializer
from paiements.models.paiement import Paiement


class PanierViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour le modèle Panier.
    """
    queryset = Panier.objects.all()
    serializer_class = PanierSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Un client ne voit que SON panier
        return Panier.objects.filter(client__profil__user=self.request.user)

    def perform_create(self, serializer):
        # Le panier appartient automatiquement au client connecté
        serializer.save(client=self.request.user.profil.client)

    @action(detail=True, methods=['post'], url_path='commander')
    def commander(self, request, pk=None):
        """
        Transforme le panier en commande :
        - vérifie le stock de chaque produit
        - copie les lignes dans la commande (prix figé)
        - décrémente le stock
        - vide le panier
        """
        panier = self.get_object()

        # Lire le mode de règlement envoyé par le client (optionnel)
        mode_reglement_id = request.data.get('mode_reglement')
        mode_reglement = None
        if mode_reglement_id:
            try:
                mode_reglement = ModeDeReglement.objects.get(id=mode_reglement_id)
            except ModeDeReglement.DoesNotExist:
                return Response(
                    {"detail": "Mode de règlement invalide."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        with transaction.atomic():
            # ① Vérifier que le panier n'est pas vide
            lignes = list(panier.details.all())
            if not lignes:
                return Response(
                    {"detail": "Le panier est vide."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # ② Vérifier le stock de chaque produit
            for ligne in lignes:
                if ligne.quantity > ligne.produit.quantite_stock:
                    return Response(
                        {"detail": f"Stock insuffisant pour {ligne.produit.nom}. Il n'en reste que {ligne.produit.quantite_stock}."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

            # ③ Créer la commande (avec le mode de règlement choisi)
            commande = Commande.objects.create(client=panier.client, mode_reglement=mode_reglement)

            # ④ Créer le paiement (en attente)
            total = sum(ligne.produit.prix_effectif * ligne.quantity for ligne in lignes)
            Paiement.objects.create(
                commande=commande,
                montant=total,
                mode_reglement=mode_reglement,
            )

            # ⑤ Copier les lignes du panier dans la commande (prix figé)
            for ligne in lignes:
                DetailsCommande.objects.create(
                    commande=commande,
                    produit=ligne.produit,
                    quantity=ligne.quantity,
                    price=ligne.produit.prix_effectif,
                )
                # ⑥ Décrémenter le stock
                ligne.produit.quantite_stock -= ligne.quantity
                ligne.produit.save()

            # ⑦ Vider le panier
            panier.details.all().delete()

        return Response(CommandeSerializer(commande).data, status=status.HTTP_201_CREATED)
