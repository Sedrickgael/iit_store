from rest_framework import serializers
from vendor.models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'vendor', 'category', 'tags']