from rest_framework import serializers
from store.models.livraison import Livraison

class LivraisonSerializer(serializers.ModelSerializer):
    
    order = serializers.SerializerMethodField();
    
    class Meta:
         model = Livraison
         fields = ["id", "order_id", "order", "status", "country", "city", "address", "tracking_number", "shipped_at", "expected_at", "delivered_at", "slug" ]


    def get_order(self, obj):
         return [
              {
                "id": item.id,
                "number": item.number,
                "destination" : item.destination,
                "status": item.status,
              }
               for item in obj.livraison_commande.all()
         ]

   