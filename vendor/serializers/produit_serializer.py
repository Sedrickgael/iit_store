from rest_framework import serializers
from .models import Produit


class ProduitSerializer(serializers.ModelSerializer):
    boutique_name = serializers.CharField(
        source='boutique.name',
        read_only=True
    )

    categorie_name = serializers.CharField(
        source='categorie.name',
        read_only=True
    )

    etiquettes = serializers.StringRelatedField(
        source='etiquette',
        many=True,
        read_only=True
    )

    class Meta:
        model = Produit
        fields = [
            'id',
            'name',
            'description',
            'price',
            'slug',
            'boutique',
            'boutique_name',
            'categorie',
            'categorie_name',
            'etiquette',
            'etiquettes',
            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'id',
            'slug',
            'boutique_name',
            'categorie_name',
            'etiquettes',
            'created_at',
            'updated_at',
        ]

    def validate_name(self, value):
        if not value or len(value.strip()) < 2:
            raise serializers.ValidationError(
                "Le nom du produit est trop court."
            )
        return value

    def validate_description(self, value):
        if not value or len(value.strip()) < 5:
            raise serializers.ValidationError(
                "La description est trop courte."
            )
        return value

    def validate_price(self, value):
        if value is not None and value <= 0:
            raise serializers.ValidationError(
                "Le prix du produit doit être supérieur à 0."
            )
        return value