from rest_framework import serializers
from vendor.models.categorie import Categorie


class CategorieSerializer(serializers.ModelSerializer):

    produits = serializers.SerializerMethodField()

    class Meta :
        model = Categorie
        fields = [
            "id",
            "slug",
            "name", 
            "description", 
            "produits",
            ]
        
    def get_produits(self, obj):
        return  [
            {
                'id': item.id,
                'slug' : item.slug,
                'name': item.name,
                'price' : item.price,
                'description': item.description,
            }
        for item in obj.produit_ids.all()
        ]