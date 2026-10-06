from rest_framework import serializers
from commandes.models.commande import Commande


class CommandeSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle Commande.
    """
    class Meta:
        model = Commande
        fields = ['commande_id', 'status','created_at', 'updated_at']
        read_only_fields = ['commande_id', 'created_at', 'updated_at','status']
