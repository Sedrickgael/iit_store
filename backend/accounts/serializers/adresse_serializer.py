from rest_framework import serializers
from accounts.models.adresse import Adresse

class AdresseSerializer(serializers.ModelSerializer):
    
    """"Serializer pour le modèle Adresse."""
    
    class Meta:
        
        model = Adresse
        fields = ['id', 'street', 'city', 'state', 'country', 'region', 'profil ']
        
    def validate(self, data):
        country = data.get('country', getattr(self.instance, 'country', None))
        region = data.get('region', getattr(self.instance, 'region', None))
        city = data.get('city', getattr(self.instance, 'city', None))

        if region and country and region.country_id != country.id:
            raise serializers.ValidationError({"region": "Cette région n'appartient pas à ce pays."})
        if city and region and city.region_id and city.region_id != region.id:
            raise serializers.ValidationError({"city": "Cette ville n'appartient pas à cette région."})
        return data