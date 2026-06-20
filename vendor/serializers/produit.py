from rest_framework import serializers
from vendor.models.produit import Produit

class ProduitSerializer(serializers.ModelSerializer):
    
    
    categorie = serializers.SerializerMethodField()
    etiquettes = serializers.SerializerMethodField()
    vendeurs = serializers.SerializerMethodField()

    class Meta:
         model = Produit
         fields = ["id", "name", "description", "price", "slug", "categorie_id", "categorie", "etiquette_id", "etiquettes", "vendeurs"]


    def get_categorie(self, obj):
         return [
              {
                "id": obj.categorie_id.id,
                "name": obj.categorie_id.name,
                "description" : obj.categorie_id.description,
                "slug" : obj.categorie_id.slug
              }
        
         ]
    
    def get_etiquettes(self, obj):
         return [
              {
                "id": item.id,
                "name": item.name,
                "description" : item.description,
                "slug" : item.slug
              }
               for item in obj.etiquette_id.all()
         ]
    
    def get_vendeurs(self, obj):
         return [
              {
                "id": item.id,
                "last_name": item.last_name,
                "first_name" : item.first_name,
                "slug" : item.slug
              }
               for item in obj.vendeur_id.all()
         ]

   