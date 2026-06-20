from rest_framework import serializers
from customer.models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'order', 'amount', 'method', 'status', 'created_at']
        read_only_fields = ['id', 'created_at']