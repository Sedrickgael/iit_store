from rest_framework import serializers
from store.models.panier import Panier
from store.models.ligne_panier import PanierItem


class PanierItemReadSerializer(serializers.ModelSerializer):
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

    sub_total = serializers.SerializerMethodField()

    class Meta:
        model = PanierItem
        fields = [
            'id',
            'product',
            'product_name',
            'product_price',
            'quantity',
            'sub_total',
            'created_at',
            'updated_at',
        ]

    def get_sub_total(self, obj):
        return obj.sub_total


class PanierSerializer(serializers.ModelSerializer):
    profil_username = serializers.CharField(
        source='profil.user.username',
        read_only=True
    )

    session_key_value = serializers.CharField(
        source='session_key.session_key',
        read_only=True
    )

    items = PanierItemReadSerializer(
        many=True,
        read_only=True
    )

    total = serializers.SerializerMethodField()

    class Meta:
        model = Panier
        fields = [
            'id',
            'profil',
            'profil_username',
            'session_key',
            'session_key_value',
            'items',
            'total',
            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'id',
            'profil_username',
            'session_key_value',
            'items',
            'total',
            'created_at',
            'updated_at',
        ]

    def get_total(self, obj):
        return sum(item.sub_total for item in obj.items.all())

    def validate(self, attrs):
        profil = attrs.get('profil')
        session_key = attrs.get('session_key')

        if not profil and not session_key:
            raise serializers.ValidationError(
                "Le panier doit être lié à un profil ou à une session."
            )

        return attrs