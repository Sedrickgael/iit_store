from rest_framework import serializers
from accounts.models.adresse import Adresse


class AdresseSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle Adresse.
    """
    class Meta:
        model = Adresse
        fields = ['id', 'street', 'city', 'state', 'country', 'region', 'profil']
        read_only_fields = ['id', 'profil']
