from rest_framework import serializers
from store.models.mode_de_reglement import ModeDeReglement


class ModeDeReglementSerializer(serializers.ModelSerializer):

    class Meta:
        model = ModeDeReglement
        fields = [
            "id",
            "name",
            "type",
            "is_active",
        ]