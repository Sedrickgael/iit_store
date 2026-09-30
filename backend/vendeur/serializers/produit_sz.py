from rest_framework import serializers
from vendeur.models.produit import Produit


class ProduitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = ['id', 'nom', 'slug', 'description', 'prix', 'image']