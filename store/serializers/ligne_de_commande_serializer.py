from rest_framework import serializers
from .models import LigneCommande


class LigneCommandeSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(
        source='product.nom',
        read_only=True
    )

    order_number = serializers.CharField(
        source='order.number',
        read_only=True
    )

    sub_total = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    class Meta:
        model = LigneCommande
        fields = [
            'id',
            'order',
            'order_number',
            'product',
            'product_name',
            'quantity',
            'unit_price',
            'sub_total',
            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'id',
            'order_number',
            'product_name',
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

    def validate_unit_price(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Le prix unitaire doit être supérieur à 0."
            )

        return value