from rest_framework import serializers
from commandes.models.panier import Panier
from commandes.serializers.details_panier_serializer import DetailsPanierSerializer


class PanierSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle Panier.
    """
    details = DetailsPanierSerializer(many=True, read_only=True)

    class Meta:
        model = Panier
        fields = ['id', 'client', 'details', 'created_at', 'updated_at']
        read_only_fields = ['id', 'client', 'created_at', 'updated_at']