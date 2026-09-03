from rest_framework import serializers
from vendor.models.produit import Produit


class ProduitSerializer(serializers.ModelSerializer):

    categorie = serializers.SerializerMethodField()
    etiquettes = serializers.SerializerMethodField()
    vendeurs = serializers.SerializerMethodField()

    class Meta:
        model = Produit
        fields = [
            "id",
            "slug",
            "name",
            "price",
            "description",
            "categorie",      
            "etiquettes",      
            "vendeurs",
        ]

    def get_categorie(self, obj):
        if not obj.categorie:
            return None
        return {                        
            'id': obj.categorie.id,      
            'slug': obj.categorie.slug,
            'name': obj.categorie.name,
            'description': obj.categorie.description,
        }

    def get_etiquettes(self, obj):
        # Sécurisation avec getattr au cas où le champ 'etiquette' diffère
        etiquettes = getattr(obj, 'etiquette', None) or getattr(obj, 'etiquettes', None)
        if not etiquettes:
            return []
            
        return [
            {
                'id': item.id,
                'slug': item.slug,
                'name': item.name,
                'description': item.description,
            }
            for item in etiquettes.all()  
        ]

    def get_vendeurs(self, obj):
        return [
            {
                'id': boutique.id,
                'slug': boutique.slug,
                'name': boutique.name,
            }
            for boutique in obj.vendeur_id.all()  # <-- Correction appliquée ici
        ]