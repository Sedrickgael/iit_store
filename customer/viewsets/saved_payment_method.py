from rest_framework import viewsets
from customer.models import SavedPaymentMethod
from customer.serializers import SavedPaymentMethodSerializer

class SavedPaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = SavedPaymentMethod.objects.all()
    serializer_class = SavedPaymentMethodSerializer