from rest_framework import serializers
from store.models.panier import Panier
from store.models.ligne_panier import PanierItem


class PanierItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(source="product.name", read_only=True)
    product_price = serializers.DecimalField(source="product.price", max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = PanierItem
        fields = [
            "id",
            "slug",
            "product",
            "product_name",
            "product_price",
            "quantity",
            "sub_total",
        ]


class PanierSerializer(serializers.ModelSerializer):

    items = PanierItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Panier
        fields = [
            "id",
            "slug",
            "profil",
            "session_key",
            "items",
            "total",
        ]

    def get_total(self, obj):
        return sum(item.sub_total for item in obj.items.all())
        