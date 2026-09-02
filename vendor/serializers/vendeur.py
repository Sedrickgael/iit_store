from rest_framework import serializers
from vendor.models.boutique import Vendeur


class VendeurSerializer(serializers.ModelSerializer):

    produits = serializers.SerializerMethodField()

    class Meta :
        model = Vendeur
        fields = [
            "id",
            "slug",
            "last_name", 
            "first_name", 
            "email",
            "produits"
            ]
        
    def get_produits(self, obj):
        return  [
            {
                'id': item.id,
                "slug" : item.slug,
                'name': item.name,
                'price' : item.price,
                'description': item.description,
            }
        for item in obj.vendeur_produits.all()
        ]
    