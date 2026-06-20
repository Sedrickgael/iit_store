from rest_framework import serializers
from store.models.panier import Panier


class PanierSerializer(serializers.ModelSerializer):

    product = serializers.SerializerMethodField()

    class Meta :
        model = Panier
        fields = [
            "id",
            "slug",
            "product",
            "quantity",
            "session_key",
            "product_id",
            ]
        
    def get_product(self, obj):
        return  [
            {
                'id': item.id,
                'slug' : item.slug,
                'name': item.name,
                'price': item.price,
            }
        for item in obj.articles_panier.all()
        ]
        