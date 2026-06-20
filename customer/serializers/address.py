from rest_framework import serializers
from customer.models import Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'user', 'city', 'subregion', 'street_address']
        read_only_fields = ['id']