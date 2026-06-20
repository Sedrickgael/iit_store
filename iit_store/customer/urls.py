from django.urls import include, path
from rest_framework.routers import DefaultRouter

from customer.viewsets.adresse_viewset import AdresseViewSet
from customer.viewsets.avis_viewset import AvisViewSet
from customer.viewsets.favoris_viewset import FavorisViewSet
from customer.viewsets.moyen_paiement_viewset import MoyenPaiementViewSet
from customer.viewsets.paiement_viewset import PaiementViewSet

router = DefaultRouter()
router.register(r'adresses', AdresseViewSet, basename='adresse')
router.register(r'avis', AvisViewSet, basename='avi')
router.register(r'favoris', FavorisViewSet, basename='favori')
router.register(r'moyens-paiement', MoyenPaiementViewSet, basename='moyen-paiement')
router.register(r'paiements', PaiementViewSet, basename='paiement')

urlpatterns = [
    path('', include(router.urls)),
]
