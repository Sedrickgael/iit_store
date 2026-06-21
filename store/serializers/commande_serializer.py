from rest_framework import serializers
from .models import Commande


class CommandeSerializer(serializers.ModelSerializer):
    profil_username = serializers.CharField(
        source='profil.user.username',
        read_only=True
    )

    statut_display = serializers.CharField(
        source='get_statut_display',
        read_only=True
    )

    mode_reglement_name = serializers.CharField(
        source='mode_reglement.name',
        read_only=True
    )

    total = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    class Meta:
        model = Commande
        fields = [
            'id',
            'profil',
            'profil_username',
            'number',
            'destination',
            'statut',
            'statut_display',
            'mode_reglement',
            'mode_reglement_name',
            'total',
            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'id',
            'profil',
            'profil_username',
            'number',
            'statut',
            'statut_display',
            'mode_reglement_name',
            'total',
            'created_at',
            'updated_at',
        ]

    def validate_destination(self, value):
        if not value or len(value.strip()) < 5:
            raise serializers.ValidationError(
                "L'adresse de livraison est trop courte."
            )

        return value

    def validate(self, attrs):
        request = self.context.get('request')

        if not request or not request.user.is_authenticated:
            raise serializers.ValidationError(
                "Vous devez être connecté pour passer une commande."
            )

        profil = getattr(request.user, 'profil', None)

        if not profil:
            raise serializers.ValidationError(
                "Aucun profil client n'est associé à cet utilisateur."
            )

        return attrs

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['profil'] = request.user.profil
        validated_data['statut'] = Commande.StatutChoices.EN_ATTENTE

        return super().create(validated_data)