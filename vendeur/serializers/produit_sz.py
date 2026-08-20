from rest_framework import serializers
from vendeur.models.produit import Produit


class ProduitSerializer(serializers.ModelSerializer):

    categorie = serializers.SerializerMethodField()
    etiquettes = serializers.SerializerMethodField()
    vendeurs = serializers.SerializerMethodField()

    class Meta :
        model = Produit
        fields = [
            "id",
            "slug",
            "name", 
            "price",
            "description", 
            "categorie_id",
            "categorie",
            "etiquette_id",
            "etiquettes",
            "vendeurs",
            ]
        
    def get_categorie(self, obj):
        return  [
            {
                'id': obj.categorie_id.id,
                "slug" : obj.categorie_id.slug,
                'name': obj.categorie_id.name,
                'description': obj.categorie_id.description,
            }
        ]
    
    def get_etiquettes(self, obj):
        return  [
            {
                'id': item.id,
                "slug" : item.slug,
                'name': item.name,
                'description': item.description,
            }
        for item in obj.etiquette_id.all()
        ]
    
    def get_vendeurs(self, obj):
        return  [
            {
                'id': item.id,
                "slug" : item.slug,
                'last_name': item.last_name,
                'first_name': item.first_name,
            }
        for item in obj.vendeur_id.all()
        ]