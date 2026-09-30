from django.urls import include, path
from rest_framework.routers import DefaultRouter

from backend.store.viewsets.commande_viewset import CommandeViewSet
from backend.store.viewsets.mode_paiement_viewset import ModePaiementViewSet
from backend.store.viewsets.panier_viewset import PanierViewSet

router = DefaultRouter()
router.register(r'commandes', CommandeViewSet, basename='commande')
router.register(r'modes-paiement', ModePaiementViewSet, basename='mode-paiement')
router.register(r'paniers', PanierViewSet, basename='panier')

urlpatterns = [
    path('', include(router.urls)),
]
