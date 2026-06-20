from rest_framework import serializers
from store.models.panier import Panier

class PanierSerializer(serializers.ModelSerializer):
    
    product = serializers.SerializerMethodField()

    class Meta:
         model = Panier
         fields = ["id", "session_key", "product_id", "quantity", "product"]



     
    def get_products(self, obj):
          return [
               {
                    "id": item.id,
                    "name": item.name,
                    "slug" : item.slug,
                    "price": item.price
               }
          for item in obj.articles_panier.all()
          ]
