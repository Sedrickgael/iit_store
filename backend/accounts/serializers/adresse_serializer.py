from rest_framework import serializers
from accounts.models.adresse import Adresse
from cities_light.models import City, Region, Country


class AdresseSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle Adresse.
    """
    city = serializers.SlugRelatedField(slug_field='name', queryset=City.objects.all())
    region = serializers.SlugRelatedField(slug_field='name', queryset=Region.objects.all())
    country = serializers.SlugRelatedField(slug_field='name', queryset=Country.objects.all())

    class Meta:
        model = Adresse
        fields = ['id', 'street', 'city', 'region', 'country', 'profil']
        read_only_fields = ['id', 'profil']
