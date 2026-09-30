from rest_framework import serializers

from backend.customer.models.moyen_paiement import MoyenPaiementModel


class MoyenPaiementSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoyenPaiementModel
        fields = '__all__'
