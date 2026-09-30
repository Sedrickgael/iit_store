from rest_framework import serializers

from backend.customer.models.avis import AvisModel


class AvisSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvisModel
        fields = '__all__'
    
