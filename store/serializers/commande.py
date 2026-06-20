from rest_framework import serializers
from store.models.commande import Commande
from store.models.commande import LigneCommande



class LigneCommandeSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="produit.name", read_only=True)

    class Meta:
        model = LigneCommande
        fields = [
            "id",
            "slug",
            "quantity",
            "order_id",
            "sub_total",
            "product_id",
            "unit_price",
            "product_name",
        ]


class CommandeSerializer(serializers.ModelSerializer):

    lignes = LigneCommandeSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()

    def get_total(self, obj):
        return sum(l.quantity * l.unit_price for l in obj.lignes.all())

    class Meta:
        model = Commande
        fields = [
            "id",
            "slug",
            "number",
            "statut",
            "lignes",
            "total",
            "destination",
        ]