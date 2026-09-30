from rest_framework import serializers

from customer.models.adresse import AdresseModel


class AdresseSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdresseModel
        fields = '__all__'
