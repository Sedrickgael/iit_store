from rest_framework import serializers
from backend.vendeur.models.categorie import Categorie

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = ['id', 'name', 'slug', 'description']
