from rest_framework import serializers
from vendeur.models.etiquette import Etiquette

class EtiquetteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etiquette
        fields = ['id', 'name', 'description']