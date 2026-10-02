from rest_framework import serializers
from accounts.models.profil_client import ProfilClient
from datetime import date


class ProfilClientSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle ProfilClient.
    """
    class Meta:
        model = ProfilClient
        fields = ['id', 'nom', 'prenom', 'date_naissance', 'telephone', 'genre']
        read_only_fields = ['id']

    def validate_date_naissance(self, value):
        # Une date de naissance ne peut pas être dans le futur
        if value > date.today():
            raise serializers.ValidationError("La date de naissance ne peut pas être dans le futur.")
        return value

    def validate_telephone(self, value):
        # Un numéro de téléphone doit contenir uniquement des chiffres (et éventuellement +, espaces, tirets)
        cleaned = value.replace(' ', '').replace('-', '').replace('+', '')
        if not cleaned.isdigit():
            raise serializers.ValidationError("Le numéro de téléphone ne doit contenir que des chiffres.")
        if len(cleaned) < 8:
            raise serializers.ValidationError("Le numéro de téléphone est trop court.")
        return value