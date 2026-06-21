from rest_framework import serializers
from .models import PanierItem


class PanierItemSerializer(serializers.ModelSerializer):
    product_name = serializers.StringRelatedField(
        source='product',
        read_only=True
    )

    product_price = serializers.DecimalField(
        source='product.price',
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    sub_total = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    class Meta:
        model = PanierItem
        fields = [
            'id',
            'cart',
            'product',
            'product_name',
            'product_price',
            'quantity',
            'sub_total',
            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'id',
            'product_name',
            'product_price',
            'sub_total',
            'created_at',
            'updated_at',
        ]

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "La quantité doit être supérieure à 0."
            )
        return value

    def validate(self, attrs):
        cart = attrs.get('cart')
        product = attrs.get('product')

        if self.instance is None:
            if PanierItem.objects.filter(cart=cart, product=product).exists():
                raise serializers.ValidationError({
                    "product": "Ce produit est déjà dans le panier."
                })

        return attrs