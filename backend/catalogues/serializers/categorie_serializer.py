from rest_framework import serializers
from catalogues.models.categorie import Categorie


class CategorieSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle Categorie.
    """
    class Meta:
        model = Categorie
        fields = ['id', 'nom', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']
