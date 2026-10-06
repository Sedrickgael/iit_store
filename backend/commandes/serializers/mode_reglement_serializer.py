from rest_framework import serializers
from commandes.models.mode_reglement import ModeDeReglement

class ModeReglementSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle ModeReglement.
    """
    class Meta:
        model = ModeDeReglement
        fields = ['id', 'name', 'type']
        read_only_fields = ['id']