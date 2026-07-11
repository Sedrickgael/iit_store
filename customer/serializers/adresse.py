from rest_framework import serializers
from customer.models.adresse import Adresse
from cities_light.models import City, Country


class AdresseSerializer(serializers.ModelSerializer):

    # Lecture : détails de la ville et du pays
    city = serializers.SerializerMethodField()
    country = serializers.SerializerMethodField()

    # Écriture : on reçoit les IDs
    city_id = serializers.PrimaryKeyRelatedField(
        queryset=City.objects.all(),
        source='city',
        allow_null=True,
        required=False
    )
    country_id = serializers.PrimaryKeyRelatedField(
        queryset=Country.objects.all(),
        source='country',
        allow_null=True,
        required=False
    )

    class Meta:
        model = Adresse
        fields = [
            "id",
            "profil",
            "type",
            "street",
            "country_id",
            "country",
            "city_id",
            "city",
            "is_default",
        ]

    def get_city(self, obj):
        if obj.city:
            return {"id": obj.city.id, "name": obj.city.name}
        return None

    def get_country(self, obj):
        if obj.country:
            return {"id": obj.country.id, "name": obj.country.name}
        return None
