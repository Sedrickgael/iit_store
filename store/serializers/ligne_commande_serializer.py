from rest_framework import serializers
from store.models.ligne_commande import LigneCommande


class LigneCommandeSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    sub_total = serializers.ReadOnlyField()  

    class Meta:
        model = LigneCommande
        fields = [
            "id",
            "order",
            "product",
            "product_name",
            "quantity",
            "unit_price",
            "sub_total",
        ]