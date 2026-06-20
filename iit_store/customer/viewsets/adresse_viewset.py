from rest_framework import viewsets

from customer.models.adresse import AdresseModel
from customer.serializers.adresse_sz import AdresseSerializer


class AdresseViewSet(viewsets.ModelViewSet):
    queryset = AdresseModel.objects.all()
    serializer_class = AdresseSerializer
