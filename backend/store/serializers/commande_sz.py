from rest_framework import serializers
from store.models.commande import CommandeModel


class CommandeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommandeModel
        fields = ['id', 'utilisateur', 'reference', 'date_de_commande', 'produit', 'quantite', 'statut']