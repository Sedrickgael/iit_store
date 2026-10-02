from rest_framework import serializers,Permissions
from accounts.models.client import Client

class ClientSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle Client."""
    
    class Meta:
        model = Client
        fields = '__all__'
        
    user = UserSerializer(read_only=True)
    profil = ProfilClientSerializer(read_only=True)
    adresses = AdresseSerializer(many=True, read_only=True)
