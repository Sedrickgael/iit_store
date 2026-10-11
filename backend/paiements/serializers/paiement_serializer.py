from rest_framework import serializers
from paiements.models.paiement import Paiement
from commandes.serializers.commande_serializer import CommandeSerializer


class PaiementSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle Paiement.
    """
    commande = CommandeSerializer(read_only=True)

    class Meta:
        model = Paiement
        fields = ['id', 'commande', 'montant', 'mode_reglement', 'reference', 'statut', 'created_at', 'updated_at']
        read_only_fields = ['id', 'commande', 'montant', 'mode_reglement', 'statut', 'created_at', 'updated_at']