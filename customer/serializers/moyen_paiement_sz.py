from rest_framework import serializers
from customer.models.moyen_de_paiement import MoyenPaiementModel


class MoyenPaiementSerializer(serializers.ModelSerializer):

    profil = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    class Meta:
        model = MoyenPaiementModel
        fields = [
            "id",
            "profil",
            "type",
            "details",
        ]

    def get_profil(self, obj):
        return {
            "id": obj.profil.id,
            "username": obj.profil.user.username,
        }

    def get_type(self, obj):
        return {
            "id": obj.type.id,
            "name": str(obj.type),
        }