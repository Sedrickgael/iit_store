from rest_framework import serializers
from catalogues.models.boutique import Boutique
from cities_light.models import Country, Region, City


class BoutiqueSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle Boutique.
    """
    pays = serializers.SlugRelatedField(slug_field='name', queryset=Country.objects.all())
    region = serializers.SlugRelatedField(slug_field='name', queryset=Region.objects.all())
    ville = serializers.SlugRelatedField(slug_field='name', queryset=City.objects.all())

    class Meta:
        model = Boutique
        fields = ['id', 'uuid', 'nom', 'slug', 'email', 'contact', 'pays', 'region', 'ville', 'quartier', 'secteur_activite', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'uuid', 'created_at', 'updated_at']

    def validate_nom(self, value):
        # Vérifie qu'aucune autre boutique n'utilise déjà ce nom
        if Boutique.objects.filter(nom__iexact=value).exists():
            raise serializers.ValidationError("Une boutique avec ce nom existe déjà.")
        return value

    def validate_email(self, value):
        # Vérifie qu'aucune autre boutique n'utilise déjà cet email
        if Boutique.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Une boutique avec cet email existe déjà.")
        return value
