from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class ClientSerializer(serializers.ModelSerializer):
    """
    Serializer pour la création d'un nouveau client.
    """
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')
        
