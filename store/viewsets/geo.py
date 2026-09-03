from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from cities_light.models import Country, Region, City


class GeoViewSet(viewsets.ViewSet):
    """
    Expose les données géographiques (pays, régions/départements, villes)
    issues de django-cities-light pour alimenter les formulaires du frontend.
    """
    permission_classes = [AllowAny]

    def list(self, request):
        """Liste tous les pays."""
        countries = Country.objects.all().order_by("name")
        data = [
            {
                "id": c.id,
                "name": c.name,
                "code": c.code2,
            }
            for c in countries
        ]
        return Response(data)

    @action(detail=False, methods=["get"], url_path="regions/(?P<country_id>[^/.]+)")
    def regions(self, request, country_id=None):
        """Liste les régions/départements d'un pays."""
        regions = Region.objects.filter(
            country_id=country_id
        ).order_by("name")
        data = [
            {
                "id": r.id,
                "name": r.name,
            }
            for r in regions
        ]
        return Response(data)

    @action(detail=False, methods=["get"], url_path="cities/(?P<region_id>[^/.]+)")
    def cities(self, request, region_id=None):
        """Liste les villes d'une région/département."""
        cities = City.objects.filter(
            region_id=region_id
        ).order_by("name")
        data = [
            {
                "id": c.id,
                "name": c.name,
            }
            for c in cities
        ]
        return Response(data)
