from rest_framework import serializers
from customer.models import Favorite

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ['id', 'user', 'product']
        read_only_fields = ['id']