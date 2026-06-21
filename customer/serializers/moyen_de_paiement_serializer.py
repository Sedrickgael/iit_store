from rest_framework import serializers
from .models import MoyenPaiementModel


class MoyenPaiementSerializer(serializers.ModelSerializer):
    profil_username = serializers.CharField(
        source='profil.user.username',
        read_only=True
    )

    type_name = serializers.CharField(
        source='type.name',
        read_only=True
    )

    class Meta:
        model = MoyenPaiementModel
        fields = [
            'id',
            'profil',
            'profil_username',
            'type',
            'type_name',
            'details',
            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'id',
            'profil_username',
            'type_name',
            'created_at',
            'updated_at',
        ]

    def validate_details(self, value):
        if value and len(value.strip()) < 3:
            raise serializers.ValidationError(
                "Les détails du moyen de paiement sont trop courts."
            )
        return value