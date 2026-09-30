from rest_framework import serializers

from backend.store.models.mode_paiement import ModePaiementModel


class ModePaiementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModePaiementModel
        fields = ['id', 'libelle', 'description', 'active', 'created_at', 'last_updated_at']
