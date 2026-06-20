from django.urls import include, path
from rest_framework.routers import DefaultRouter
from customer.viewsets import AddressViewSet, FavoriteViewSet, PaymentViewSet, ReviewViewSet, SavedPaymentMethodViewSet

router = DefaultRouter()
router.register(r'addresses', AddressViewSet, basename='address')
router.register(r'favorites', FavoriteViewSet, basename='favorite')
router.register(r'payments', PaymentViewSet, basename='payment')
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'saved-payment-methods', SavedPaymentMethodViewSet, basename='saved-payment-method')

urlpatterns = [
    path('', include(router.urls)),
]