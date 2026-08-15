from rest_framework import serializers
from customer.models.paiement import PaiementModel


class PaiementSerializer(serializers.ModelSerializer):

    profil = serializers.SerializerMethodField()
    commande = serializers.SerializerMethodField()

    class Meta:
        model = PaiementModel
        fields = [
            "id",
            "profil",
            "commande",
            "montant",
            "statut",
        ]

    def get_profil(self, obj):
        return {
            "id": obj.profil.id,
            "username": obj.profil.username,
        }

    def get_commande(self, obj):
        return {
            "id": obj.commande.id,
            "number": obj.commande.number,
        }