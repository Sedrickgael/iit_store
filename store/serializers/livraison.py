from rest_framework import serializers
from store.models.livraison import Livraison


class LivraisonSerializer(serializers.ModelSerializer):
    city = serializers.SerializerMethodField()
    country = serializers.SerializerMethodField()

    class Meta:
        model = Livraison
        fields = [
            "id",
            "order",
            "status",
            "address",
            "country",
            "city",
            "tracking_number",
            "shipped_at",
            "expected_at",
            "delivered_at",
        ]

    def get_city(self, obj):
        if obj.city:
            return {"id": obj.city.id, "name": obj.city.name}
        return None

    def get_country(self, obj):
        if obj.country:
            return {"id": obj.country.id, "name": obj.country.name}
        return None
