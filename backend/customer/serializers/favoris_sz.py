from rest_framework import serializers

from backend.customer.models.favoris import FavorisModel


class FavorisSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavorisModel
        fields = '__all__'
