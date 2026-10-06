from rest_framework import serializers
from commandes.models.detail_commande import DetailsCommande
from catalogues.serializers.produit_serializer import ProduitSerializer


class DetailCommandeSerializer(serializers.ModelSerializer):
    """
    Serializer pour les détails d'une commande.
    """
    produit = ProduitSerializer(read_only=True)

    class Meta:
        model = DetailsCommande
        fields = ['commande', 'produit', 'quantity', 'montant_total']
        read_only_fields = ['commande', 'produit', 'montant_total']

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError("La quantité doit être supérieure à zéro.")
        return value