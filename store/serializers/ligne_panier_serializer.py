from rest_framework import serializers
from store.models.ligne_panier import PanierItem


class PanierItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    sub_total = serializers.ReadOnlyField()  

    class Meta:
        model = PanierItem
        fields = [
            "id",
            "cart",
            "product",
            "product_name",
            "quantity",
            "sub_total",
        ]