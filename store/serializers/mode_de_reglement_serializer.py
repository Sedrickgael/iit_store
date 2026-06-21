from rest_framework import serializers
from .models import ModeDeReglement


class ModeDeReglementSerializer(serializers.ModelSerializer):
    type_display = serializers.CharField(
        source='get_type_display',
        read_only=True
    )

    class Meta:
        model = ModeDeReglement
        fields = [
            'id',
            'name',
            'type',
            'type_display',
            'is_active',
            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'id',
            'type_display',
            'created_at',
            'updated_at',
        ]

    def validate_name(self, value):
        if not value or len(value.strip()) < 2:
            raise serializers.ValidationError(
                "Le nom du mode de règlement est trop court."
            )
        return value

    def validate_type(self, value):
        types_valides = [
            ModeDeReglement.TypeChoices.CARTE,
            ModeDeReglement.TypeChoices.MOBILE_MONEY,
            ModeDeReglement.TypeChoices.ESPECES,
            ModeDeReglement.TypeChoices.VIREMENT,
        ]

        if value not in types_valides:
            raise serializers.ValidationError(
                "Type de paiement invalide."
            )

        return value