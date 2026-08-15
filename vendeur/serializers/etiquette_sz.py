from rest_framework import serializers
from vendor.models.etiquette import Etiquette


class EtiquetteSerializer(serializers.ModelSerializer):

    produits = serializers.SerializerMethodField()

    class Meta :
        model = Etiquette
        fields = [
            "id",
            "slug",
            "name", 
            "description", 
            "produits",
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
        for item in obj.etiquette_produits_ids.all()
        ]