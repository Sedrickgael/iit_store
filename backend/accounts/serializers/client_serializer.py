from rest_framework import serializers
from accounts.models.client import Client
from accounts.serializers.user_serializer import UserSerializer
from accounts.serializers.profil_client_serializer import ProfilClientSerializer
from accounts.serializers.adresse_serializer import AdresseSerializer


class ClientSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle Client.
    """
    user = UserSerializer(read_only=True, source='profil.user')
    profil = ProfilClientSerializer(read_only=True)
    adresses = AdresseSerializer(many=True, read_only=True, source='profil.adresses')

    class Meta:
        model = Client
        fields = ['id', 'user', 'profil', 'adresses', 'is_active', 'created_at', 'updated_at']
