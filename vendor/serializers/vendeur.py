from rest_framework import serializers
from vendor.models.vendeur import Vendeur

class VendeurSerializer(serializers.ModelSerializer):
    
    
    produits = serializers.SerializerMethodField()



    class Meta:
         model = Vendeur
         fields = ["id", "last_name", "first_name", "email", "password", "slug", "produit_id", "produits" ]


    
    def get_produits(self, obj):
         return [
              {
                "id": item.id,
                "name": item.name,
                "description" : item.description,
                "slug" : item.slug,
                "price": item.price
              }
               for item in obj.produit_id.all()
         ]
    


   