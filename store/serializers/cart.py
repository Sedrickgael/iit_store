from rest_framework import serializers
from store.models import Cart

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['id', 'user', 'products', 'created_at', 'updated_at']