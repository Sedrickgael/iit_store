from rest_framework import serializers
from store.models import Delivery

class DeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = ['id', 'order', 'address', 'delivery_date', 'status']