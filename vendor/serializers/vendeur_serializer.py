from rest_framework import serializers
from iit_store.vendor.models.boutique import Vendeur


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
            "password",
            "produit_id",
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
        for item in obj.produit_id.all()
        ]
    