from django.urls import include, path
from rest_framework.routers import DefaultRouter
from store.viewsets import CartViewSet, CartItemViewSet, DeliveryViewSet, OrderViewSet, PaymentMethodViewSet

router = DefaultRouter()
router.register(r'carts', CartViewSet, basename='cart')
router.register(r'cart-items', CartItemViewSet, basename='cart-item')
router.register(r'deliveries', DeliveryViewSet, basename='delivery')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'payment-methods', PaymentMethodViewSet, basename='payment-method')

urlpatterns = [
    path('', include(router.urls)),
]