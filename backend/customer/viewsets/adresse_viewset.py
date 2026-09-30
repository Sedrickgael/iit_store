from rest_framework import viewsets

from backend.customer.models.adresse import AdresseModel
from backend.customer.serializers.adresse_sz import AdresseSerializer


class AdresseViewSet(viewsets.ModelViewSet):
    queryset = AdresseModel.objects.all()
    serializer_class = AdresseSerializer
