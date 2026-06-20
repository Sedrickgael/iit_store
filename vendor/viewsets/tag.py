from rest_framework import viewsets
from vendor.models import Tag
from vendor.serializers import TagSerializer

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer