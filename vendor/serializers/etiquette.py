from rest_framework import serializers
from vendor.models.etiquette import Etiquette

class EtiquetteSerializer(serializers.ModelSerializer):
    
    
    produits = serializers.SerializerMethodField()


    class Meta:
         model = Etiquette
         fields = ["id", "name", "description", "slug", "produits"]


    def get_produits(self, obj):
         return [
              {
                "id": item.id,
                "name": item.name,
                "description" : item.description,
                "slug" : item.slug,
                "price" : item.price
              }
               for item in obj.etiquette_produit_ids.all()
         ]

   