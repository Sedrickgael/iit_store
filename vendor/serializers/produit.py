from rest_framework import serializers
from vendor.models.produit import Produit


class ProduitSerializer(serializers.ModelSerializer):

    categorie = serializers.SerializerMethodField()
    etiquettes = serializers.SerializerMethodField()
    vendeur_nom = serializers.SerializerMethodField()

    class Meta :
        model = Produit
        fields = [
            "id",
            "slug",
            "name", 
            "price",
            "description", 
            "vendeur",
            "vendeur_nom",
            "categorie",
            "etiquettes",
            ]
        
    def get_categorie(self, obj):
        return {
            'id': obj.categorie.id,
            "slug": obj.categorie.slug,
            'name': obj.categorie.name,
            'description': obj.categorie.description,
        }
    
    def get_vendeur_nom(self, obj):
        v = obj.vendeur
        return f"{v.first_name} {v.last_name}" if v else None
    
    def get_etiquettes(self, obj):
        return  [
            {
                'id': item.id,
                "slug" : item.slug,
                'name': item.name,
                'description': item.description,
            }
        for item in obj.etiquette.all()
        ]