from rest_framework import serializers
from customer.models.favoris import Favoris


class FavorisSerializer(serializers.ModelSerializer):

    profil = serializers.SerializerMethodField()
    product = serializers.SerializerMethodField()

    class Meta:
        model = Favoris
        fields = [
            "id",
            "profil",
            "product",
        ]

    def get_profil(self, obj):
        return {
            "id": obj.profil.id,
            "username": obj.profil.user.username,
        }

    def get_product(self, obj):
        return {
            "id": obj.product.id,
            "name": str(obj.product),
        }
