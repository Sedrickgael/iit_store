from rest_framework import serializers
from store.models.livraison import Livraison


class LivraisonSerializer(serializers.ModelSerializer):

    order = serializers.SerializerMethodField()

    class Meta :
        model = Livraison
        fields = [
            "id",
            "slug",
            "city", 
            "order", 
            "status", 
            "country", 
            "order_id", 
            "shipped_at", 
            "expected_at",
            "delivered_at",
            "tracking_number", 
            ]
        
    def get_order(self, obj):
        return  [
            {
                'id': item.id,
                'slug' : item.slug,
                'number': item.number,
                'statut': item.statut,
                'destination' : item.destination,
            }
        for item in obj.livraison_commande.all()
        ]