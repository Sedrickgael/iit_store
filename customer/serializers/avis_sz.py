from rest_framework import serializers
from customer.models.avis import Avis
from customer.models.profil import Profil

class AvisSerializer(serializers.ModelSerializer):

    profil = serializers.SerializerMethodField()
    product = serializers.SerializerMethodField()

    profil_id = serializers.PrimaryKeyRelatedField(
        queryset=Profil.objects.all(),  
        source='profil'
    )

    class Meta:
        model = Avis
        fields = [
            "id",
            "profil_id",
            "profil",
            "product",
            "note",
            "commentaire",
            "is_approved",
        ]

    def get_profil(self, obj):
        return {
            "id": obj.profil.id,
            "username": obj.profil.user.username,
        }

    def get_product(self, obj):
        return {
            "id": obj.product.id,
            "name": str(obj.product),
        }