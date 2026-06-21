from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Profil


User = get_user_model()


class UserShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
        ]


class ProfilSerializer(serializers.ModelSerializer):
    user_detail = UserShortSerializer(
        source='user',
        read_only=True
    )

    username = serializers.CharField(
        source='user.username',
        read_only=True
    )

    email = serializers.EmailField(
        source='user.email',
        read_only=True
    )

    nom_complet = serializers.SerializerMethodField()

    class Meta:
        model = Profil
        fields = [
            'id',
            'user',
            'user_detail',
            'username',
            'email',
            'nom_complet',
            'genre',
            'role',
            'photo',
            'telephone',
            'date_naissance',
            'est_actif',
            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'id',
            'user',
            'user_detail',
            'username',
            'email',
            'nom_complet',
            'role',
            'created_at',
            'updated_at',
        ]

    def get_nom_complet(self, obj):
        first_name = obj.user.first_name or ""
        last_name = obj.user.last_name or ""

        nom_complet = f"{first_name} {last_name}".strip()

        if nom_complet:
            return nom_complet

        return obj.user.username

    def validate_telephone(self, value):
        if value and len(value.strip()) < 8:
            raise serializers.ValidationError(
                "Le numéro de téléphone est trop court."
            )

        return value

    def validate_photo(self, value):
        if value:
            max_size = 2 * 1024 * 1024

            if value.size > max_size:
                raise serializers.ValidationError(
                    "La photo ne doit pas dépasser 2 Mo."
                )

        return value