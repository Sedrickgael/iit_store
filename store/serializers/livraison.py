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
        order = obj.livraison_commande
        return {
            'id': order.id,
            'slug': order.slug,
            'number': order.number,
            'statut': order.statut,
            'destination': order.destination,
        }