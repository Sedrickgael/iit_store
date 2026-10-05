from rest_framework import serializers
from catalogues.models.produit import Produit
from catalogues.serializers.categorie_serializer import CategorieSerializer
from catalogues.serializers.boutique_serializer import BoutiqueSerializer


class ProduitSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle Produit.
    """
    categorie = CategorieSerializer(read_only=True)
    boutique = BoutiqueSerializer(read_only=True)

    class Meta:
        model = Produit
        fields = ['id', 'nom', 'slug', 'description', 'prix', 'prix_promotion', 'prix_effectif', 'in_stock', 'quantite_stock', 'categorie', 'boutique', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, attrs):
        prix = attrs.get('prix')
        prix_promo = attrs.get('prix_promotion')

        if prix_promo is not None:
            if prix_promo <= 0:
                raise serializers.ValidationError({
                    "prix_promotion": "Le prix promotionnel doit être supérieur à 0."
                })

            if prix is not None and prix_promo >= prix:
                raise serializers.ValidationError({
                    "prix_promotion": "Le prix promotionnel doit être inférieur au prix normal."
                })

        return attrs
