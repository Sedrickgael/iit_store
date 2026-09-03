from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from customer.models.profil import Profil


class InscriptionSerializer(serializers.ModelSerializer):
    """
    Sérialiseur d'inscription d'un nouveau client.
    Le mot de passe est hashé via set_password() (jamais stocké en clair).
    """

    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={"input_type": "password"},
    )
    password_confirmation = serializers.CharField(
        write_only=True,
        required=True,
        style={"input_type": "password"},
    )

    class Meta:
        model = Profil
        fields = [
            "username",
            "email",
            "password",
            "password_confirmation",
            "first_name",
            "last_name",
            "telephone",
            "role",
        ]
        extra_kwargs = {
            "role": {"required": False, "allow_blank": True},
        }

    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirmation"]:
            raise serializers.ValidationError(
                {"password_confirmation": "Les deux mots de passe ne correspondent pas."}
            )
        # Rôle par défaut : client si non fourni
        if not attrs.get("role"):
            attrs["role"] = "client"
        return attrs

    def create(self, validated_data):
        validated_data.pop("password_confirmation")
        password = validated_data.pop("password")
        profil = Profil(**validated_data)
        profil.set_password(password)
        profil.save()
        return profil


class ProfilSerializer(serializers.ModelSerializer):
    """
    Sérialiseur de lecture/détail du profil de l'utilisateur connecté.
    """

    class Meta:
        model = Profil
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "role",
            "telephone",
            "photo",
        ]
        read_only_fields = ["id", "role"]