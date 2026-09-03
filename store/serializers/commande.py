from rest_framework import serializers
from store.models.commande import Commande
from store.models.ligne_de_commande import LigneCommande



class LigneCommandeSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    product_image = serializers.CharField(source="product.image", read_only=True)

    class Meta:
        model = LigneCommande
        fields = [
            "id",
            "quantity",
            "order_id",
            "sub_total",
            "product_id",
            "unit_price",
            "product_name",
            "product_image",
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
            "number",
            "statut",
            "lignes",
            "total",
            "destination",
        ]