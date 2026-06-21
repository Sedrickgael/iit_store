from rest_framework import serializers
from .models import Etiquette


class EtiquetteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etiquette
        fields = [
            'id',
            'name',
            'description',
            'slug',
            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'id',
            'slug',
            'created_at',
            'updated_at',
        ]

    def validate_name(self, value):
        if not value or len(value.strip()) < 2:
            raise serializers.ValidationError(
                "Le nom de l'étiquette est trop court."
            )
        return value

    def validate_description(self, value):
        if not value or len(value.strip()) < 5:
            raise serializers.ValidationError(
                "La description est trop courte."
            )
        return value