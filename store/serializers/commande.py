from rest_framework import serializers
from store.models.commande import Commande
from store.serializers.ligne_de_commande import LigneCommandeSerializer


class CommandeSerializer(serializers.ModelSerializer):
    lignes = LigneCommandeSerializer(many=True, read_only=True)
    total = serializers.ReadOnlyField()  

    class Meta:
        model = Commande
        fields = [
            "id",
            "profil",
            "number",
            "destination",
            "statut",
            "mode_reglement",
            "lignes",
            "total",
        ]
