from rest_framework import serializers
from vendor.models.categorie import Categorie

class CategorieSerializer(serializers.ModelSerializer):
    
    
    produits = serializers.SerializerMethodField()


    class Meta:
         model = Categorie
         fields = ["id", "name", "description", "slug", "produits"]


    def get_produits(self, obj):
         return [
              {
                "id": item.id,
                "name": item.name,
                "description" : item.description,
                "slug" : item.slug,
                "price": item.price
              }
               for item in obj.produit_ids.all()
         ]

   