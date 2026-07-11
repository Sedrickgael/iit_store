from rest_framework import serializers
from customer.models.profil import Profil


class ProfilSerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField()

    class Meta:
        model = Profil
        fields = [
            "id",
            "user",
            "genre",
            "role",
            "photo",
            "telephone",
            "date_naissance",
            "est_actif",
        ]

    def get_user(self, obj):
        return {
            "id": obj.user.id,
            "username": obj.user.username,
            "email": obj.user.email,
            "first_name": obj.user.first_name,
            "last_name": obj.user.last_name,
        }
