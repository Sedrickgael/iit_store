from rest_framework import serializers
from store.models.favori import Favori


class FavoriSerializer(serializers.ModelSerializer):
    produit_id = serializers.IntegerField(source="produit.id", read_only=True)
    produit_name = serializers.CharField(source="produit.name", read_only=True)
    produit_price = serializers.DecimalField(
        source="produit.price", max_digits=10, decimal_places=2, read_only=True
    )
    produit_image = serializers.CharField(source="produit.image", read_only=True)

    class Meta:
        model = Favori
        fields = [
            "id",
            "profil",
            "produit",
            "produit_id",
            "produit_name",
            "produit_price",
            "produit_image",
        ]