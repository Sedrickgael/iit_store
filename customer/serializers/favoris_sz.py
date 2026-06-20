from rest_framework import serializers

from customer.models.favoris import FavorisModel


class FavorisSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavorisModel
        fields = '__all__'
