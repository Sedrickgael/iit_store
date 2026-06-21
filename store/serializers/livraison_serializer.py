from rest_framework import serializers
from .models import Livraison


class LivraisonSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(
        source='get_status_display',
        read_only=True
    )

    country_name = serializers.CharField(
        source='country.name',
        read_only=True
    )

    city_name = serializers.CharField(
        source='city.name',
        read_only=True
    )

    order_number = serializers.CharField(
        source='order.number',
        read_only=True
    )

    class Meta:
        model = Livraison
        fields = [
            'id',
            'order',
            'order_number',
            'status',
            'status_display',
            'address',
            'country',
            'country_name',
            'city',
            'city_name',
            'tracking_number',
            'shipped_at',
            'expected_at',
            'delivered_at',
            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'id',
            'order_number',
            'status_display',
            'country_name',
            'city_name',
            'created_at',
            'updated_at',
        ]

    def validate_address(self, value):
        if not value or len(value.strip()) < 5:
            raise serializers.ValidationError(
                "L'adresse de livraison est trop courte."
            )
        return value

    def validate(self, attrs):
        country = attrs.get('country')
        city = attrs.get('city')
        shipped_at = attrs.get('shipped_at')
        expected_at = attrs.get('expected_at')
        delivered_at = attrs.get('delivered_at')

        if city and country and city.country != country:
            raise serializers.ValidationError({
                "city": "Cette ville n'appartient pas au pays sélectionné."
            })

        if shipped_at and expected_at and expected_at < shipped_at:
            raise serializers.ValidationError({
                "expected_at": "La date prévue ne peut pas être avant la date d'expédition."
            })

        if shipped_at and delivered_at and delivered_at < shipped_at:
            raise serializers.ValidationError({
                "delivered_at": "La date de livraison ne peut pas être avant la date d'expédition."
            })

        return attrs