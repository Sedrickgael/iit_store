from rest_framework import serializers

from customer.models.avis import AvisModel


class AvisSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvisModel
        fields = '__all__'
    
