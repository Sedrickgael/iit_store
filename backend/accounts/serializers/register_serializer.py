from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from django.db import transaction
from accounts.models.profil_client import ProfilClient
from accounts.models.client import Client
from commandes.models.panier import Panier

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer pour la création d'un nouveau compte utilisateur.
    """
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')

    def validate_email(self, value):
        # Vérifie qu'aucun autre utilisateur n'utilise déjà cet email
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Un compte existe déjà avec cet email.")
        return value

    def validate_password(self, value):
        # Applique les validateurs de mot de passe configurés dans settings.py
        try:
            validate_password(value)
        except DjangoValidationError as e:
            raise serializers.ValidationError(list(e.messages))
        return value

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Les deux mots de passe ne correspondent pas."})

        # Vérifie que le mot de passe n'est pas trop similaire aux infos du compte
        # (le user n'existe pas encore, on lui passe donc les attributs en cours de création)
        user = User(username=attrs['username'], email=attrs['email'])
        try:
            validate_password(attrs['password'], user=user)
        except DjangoValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        with transaction.atomic():
            # ① Le compte utilisateur (mot de passe hashé par create_user)
            user = User.objects.create_user(**validated_data)
            # ② Le profil client, lié au user (OneToOne)
            profil = ProfilClient.objects.create(user=user)
            # ③ Le client, lié au profil (OneToOne)
            client = Client.objects.create(profil=profil)
            # ④ Le panier, lié au client (OneToOne)
            Panier.objects.create(client=client)
        return user
