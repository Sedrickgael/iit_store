from rest_framework import serializers
from .models import Boutique


class BoutiqueSerializer(serializers.ModelSerializer):
    profil_username = serializers.CharField(
        source='profil.user.username',
        read_only=True
    )

    country_name = serializers.CharField(
        source='country.name',
        read_only=True
    )

    city_name = serializers.CharField(
        source='city.name',
        read_only=True
    )

    produits = serializers.StringRelatedField(
        source='produit_id',
        many=True,
        read_only=True
    )

    class Meta:
        model = Boutique
        fields = [
            'id',
            'profil',
            'profil_username',
            'name',
            'address',
            'country',
            'country_name',
            'city',
            'city_name',
            'email',
            'slug',
            'produit_id',
            'produits',
            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'id',
            'profil',
            'profil_username',
            'country_name',
            'city_name',
            'slug',
            'produits',
            'created_at',
            'updated_at',
        ]

    def validate_name(self, value):
        if not value or len(value.strip()) < 2:
            raise serializers.ValidationError(
                "Le nom de la boutique est trop court."
            )
        return value

    def validate_address(self, value):
        if not value or len(value.strip()) < 5:
            raise serializers.ValidationError(
                "L'adresse de la boutique est trop courte."
            )
        return value

    def validate(self, attrs):
        request = self.context.get('request')
        country = attrs.get('country')
        city = attrs.get('city')

        if not request or not request.user.is_authenticated:
            raise serializers.ValidationError(
                "Vous devez être connecté pour créer une boutique."
            )

        if city and country and city.country != country:
            raise serializers.ValidationError({
                "city": "Cette ville n'appartient pas au pays sélectionné."
            })

        return attrs

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['profil'] = request.user.profil
        return super().create(validated_data)