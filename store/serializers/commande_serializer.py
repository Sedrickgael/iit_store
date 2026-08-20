from rest_framework import serializers
from store.models.commande import Commande


class CommandeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commande
        fields = ['id', 'utilisateur', 'reference', 'date_de_commande', 'produit', 'quantite', 'statut']