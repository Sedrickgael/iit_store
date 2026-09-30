from rest_framework import serializers

from customer.models.paiement import PaiementModel


class PaiementSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaiementModel
        fields = '__all__'
