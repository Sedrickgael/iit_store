from rest_framework import viewsets
from vendor.models import Vendor
from vendor.serializers import VendorSerializer

class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer