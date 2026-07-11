from rest_framework import serializers
from vendor.models.boutique import Boutique
from vendor.models.produit import Produit
from cities_light.models import City, Country


class BoutiqueSerializer(serializers.ModelSerializer):

    profil = serializers.SerializerMethodField()
    city = serializers.SerializerMethodField()
    country = serializers.SerializerMethodField()
    produits = serializers.SerializerMethodField()

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

    produit_id = serializers.PrimaryKeyRelatedField(
        queryset=Produit.objects.all(),
        many=True,
        required=False
    )

  
    slug = serializers.SlugField(read_only=True)

    class Meta:
        model = Boutique
        fields = [
            "id",
            "profil",
            "name",
            "address",
            "country_id",
            "country",
            "city_id",
            "city",
            "email",
            "slug",
            "produit_id",
            "produits",
        ]

    def get_profil(self, obj):
        return {
            "id": obj.profil.id,
            "username": obj.profil.user.username,
        }

    def get_city(self, obj):
        if obj.city:
            return {"id": obj.city.id, "name": obj.city.name}
        return None

    def get_country(self, obj):
        if obj.country:
            return {"id": obj.country.id, "name": obj.country.name}
        return None

    def get_produits(self, obj):
        return [
            {"id": p.id, 
             "name": str(p)
             }
            for p in obj.produit_id.all()
        ]