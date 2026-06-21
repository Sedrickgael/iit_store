from rest_framework import serializers
from .models import PaiementModel


class PaiementSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source='profil.username',
        read_only=True
    )

    commande_number = serializers.CharField(
        source='commande.number',
        read_only=True
    )

    class Meta:
        model = PaiementModel
        fields = [
            'id',
            'profil',
            'username',
            'commande',
            'commande_number',
            'montant',
            'statut',
            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'id',
            'username',
            'commande_number',
            'created_at',
            'updated_at',
        ]

    def validate_montant(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Le montant du paiement doit être supérieur à 0."
            )
        return value

    def validate_statut(self, value):
        statuts_valides = [
            'en_attente',
            'valide',
            'echoue',
            'annule',
            'rembourse',
        ]

        if value not in statuts_valides:
            raise serializers.ValidationError(
                "Statut de paiement invalide."
            )

        return value