from rest_framework import serializers
from customer.models.avis import Avis


class AvisSerializer(serializers.ModelSerializer):
    profil_nom = serializers.SerializerMethodField()
    produit_id = serializers.SerializerMethodField()

    class Meta:
        model = Avis
        fields = [
            "id",
            "profil",
            "profil_nom",
            "product",
            "produit_id",
            "note",
            "commentaire",
            "is_approved",
            "created_at",
        ]

    def get_profil_nom(self, obj):
        p = obj.profil
        return f"{p.first_name} {p.last_name}".strip() or p.username

    def get_produit_id(self, obj):
        return obj.product.id