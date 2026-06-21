from rest_framework import serializers
from .models import Favoris


class FavorisSerializer(serializers.ModelSerializer):
    profil_username = serializers.CharField(
        source='profil.user.username',
        read_only=True
    )

    product_name = serializers.CharField(
        source='product.nom',
        read_only=True
    )

    class Meta:
        model = Favoris
        fields = [
            'id',
            'profil',
            'profil_username',
            'product',
            'product_name',
            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'id',
            'profil_username',
            'product_name',
            'created_at',
            'updated_at',
        ]

    def validate(self, attrs):
        profil = attrs.get('profil')
        product = attrs.get('product')

        if self.instance is None:
            if Favoris.objects.filter(profil=profil, product=product).exists():
                raise serializers.ValidationError({
                    "favori": "Ce produit est déjà dans les favoris de ce profil."
                })

        return attrs