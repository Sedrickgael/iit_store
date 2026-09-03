from rest_framework import serializers
from vendor.models.produit import Produit
from vendor.models.categorie import Categorie
from customer.models.avis import Avis


class ProduitSerializer(serializers.ModelSerializer):

    categorie = serializers.SerializerMethodField()
    categorie_id = serializers.PrimaryKeyRelatedField(
        source="categorie",
        queryset=Categorie.objects.all(),
        write_only=True,
        required=False,
    )
    etiquettes = serializers.SerializerMethodField()
    vendeur_nom = serializers.SerializerMethodField()
    note_moyenne = serializers.SerializerMethodField()
    nombre_avis = serializers.SerializerMethodField()
    avis = serializers.SerializerMethodField()

    class Meta :
        model = Produit
        fields = [
            "id",
            "slug",
            "name", 
            "price",
            "stock",
            "description", 
            "image",
            "vendeur",
            "vendeur_nom",
            "categorie",
            "categorie_id",
            "etiquettes",
            "note_moyenne",
            "nombre_avis",
            "avis",
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

    def get_note_moyenne(self, obj):
        avis = obj.avis_produit.filter(active=True, is_approved=True)
        if not avis.exists():
            return None
        return round(sum(a.note for a in avis) / avis.count(), 1)

    def get_nombre_avis(self, obj):
        return obj.avis_produit.filter(active=True, is_approved=True).count()

    def get_avis(self, obj):
        avis = obj.avis_produit.filter(active=True, is_approved=True).order_by("-created_at")[:5]
        return [
            {
                "id": a.id,
                "note": a.note,
                "commentaire": a.commentaire,
                "profil_nom": f"{a.profil.first_name} {a.profil.last_name}".strip() or a.profil.username,
                "created_at": a.created_at,
            }
            for a in avis
        ]