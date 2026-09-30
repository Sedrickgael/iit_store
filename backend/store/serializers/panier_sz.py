from rest_framework import serializers
from backend.store.models.panier import PanierModel

class PanierSerializer(serializers.ModelSerializer):
    class Meta:
        model = PanierModel
        fields = '__all__'