from django.urls import include, path
from rest_framework.routers import DefaultRouter
from vendor.viewsets import CategoryViewSet, ProductViewSet, TagViewSet, VendorViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'tags', TagViewSet, basename='tag')
router.register(r'vendors', VendorViewSet, basename='vendor')

urlpatterns = [
    path('', include(router.urls)),
]