from rest_framework import serializers
from store.models.panier import Panier
from store.serializers.ligne_panier import PanierItemSerializer


class PanierSerializer(serializers.ModelSerializer):
    items = PanierItemSerializer(many=True, read_only=True)
    total = serializers.ReadOnlyField()  

    class Meta:
        model = Panier
        fields = [
            "id",
            "profil",
            "session_key",
            "items",
            "total",
        ]