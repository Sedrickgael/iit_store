from rest_framework import serializers
from .models import Avis


class AvisSerializer(serializers.ModelSerializer):
    profil_username = serializers.CharField(
        source='profil.user.username',
        read_only=True
    )

    product_name = serializers.CharField(
        source='product.nom',
        read_only=True
    )

    class Meta:
        model = Avis
        fields = [
            'id',
            'profil',
            'profil_username',
            'product',
            'product_name',
            'note',
            'commentaire',
            'is_approved',
            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'id',
            'profil_username',
            'product_name',
            'is_approved',
            'created_at',
            'updated_at',
        ]

    def validate_note(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError(
                "La note doit être comprise entre 1 et 5."
            )
        return value

    def validate(self, attrs):
        profil = attrs.get('profil')
        product = attrs.get('product')

        if self.instance is None:
            if Avis.objects.filter(profil=profil, product=product).exists():
                raise serializers.ValidationError({
                    "avis": "Ce profil a déjà donné un avis sur ce produit."
                })

        return attrs