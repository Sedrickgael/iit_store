from rest_framework import serializers
from commandes.models.commande import Commande
from commandes.serializers.detail_commande_serializer import DetailCommandeSerializer
from commandes.serializers.mode_reglement_serializer import ModeReglementSerializer
from accounts.serializers.client_serializer import ClientSerializer


class CommandeSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle Commande.
    """
    client = ClientSerializer(read_only=True)
    details = DetailCommandeSerializer(many=True, read_only=True)
    mode_reglement = ModeReglementSerializer(read_only=True)

    class Meta:
        model = Commande
        fields = ['commande_id', 'client', 'status', 'mode_reglement', 'details', 'created_at', 'updated_at']
        read_only_fields = ['commande_id', 'client', 'status', 'mode_reglement', 'created_at', 'updated_at']
