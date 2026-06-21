from rest_framework import serializers
from cities_light.models import City, Country
from .models import Adresse


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name']


class CitySerializer(serializers.ModelSerializer):
    country = CountrySerializer(read_only=True)

    class Meta:
        model = City
        fields = ['id', 'name', 'country']


class AdresseSerializer(serializers.ModelSerializer):
    country_detail = CountrySerializer(source='country', read_only=True)
    city_detail = CitySerializer(source='city', read_only=True)

    country = serializers.PrimaryKeyRelatedField(
        queryset=Country.objects.all(),
        required=False,
        allow_null=True
    )

    city = serializers.PrimaryKeyRelatedField(
        queryset=City.objects.all(),
        required=False,
        allow_null=True
    )

    class Meta:
        model = Adresse
        fields = [
            'id',
            'profil',
            'type',
            'street',
            'country',
            'country_detail',
            'city',
            'city_detail',
            'is_default',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, attrs):
        country = attrs.get('country')
        city = attrs.get('city')

        if city and country:
            if city.country != country:
                raise serializers.ValidationError({
                    "city": "Cette ville n'appartient pas au pays sélectionné."
                })

        return attrs