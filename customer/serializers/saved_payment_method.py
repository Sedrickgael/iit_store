from rest_framework import serializers
from customer.models import SavedPaymentMethod

class SavedPaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedPaymentMethod
        fields = ['id', 'user', 'method', 'credentials']
        read_only_fields = ['id']