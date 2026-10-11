from django.urls import path, include
from rest_framework.routers import DefaultRouter
from paiements.views.paiement_viewset import PaiementViewSet


router = DefaultRouter()
router.register('paiements', PaiementViewSet, basename='paiement')


urlpatterns = [
    path('', include(router.urls)),
]