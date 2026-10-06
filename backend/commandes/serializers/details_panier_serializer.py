from rest_framework import serializers
from commandes.models.detail_panier import DetailsPanier
from catalogues.serializers.produit_serializer import ProduitSerializer


class DetailsPanierSerializer(serializers.ModelSerializer):
    """
    Serializer pour les détails du panier.
    """
    produit = ProduitSerializer(read_only=True)

    class Meta:
        model = DetailsPanier
        fields = ['id', 'panier', 'produit', 'quantity', 'montant_total']
        read_only_fields = ['id', 'panier', 'montant_total']

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError("La quantité doit être supérieure à zéro.")
        return value