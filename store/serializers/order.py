from rest_framework import serializers
from store.models import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user', 'cart', 'total_price', 'payment_method', 'created_at', 'updated_at']