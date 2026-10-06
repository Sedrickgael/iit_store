from django.urls import path, include
from rest_framework.routers import DefaultRouter
from commandes.views.commande_viewset import CommandeViewSet
from commandes.views.panier_viewset import PanierViewSet
from commandes.views.mode_reglement_viewset import ModeReglementViewSet


router = DefaultRouter()
router.register('commandes', CommandeViewSet, basename='commande')
router.register('paniers', PanierViewSet, basename='panier')
router.register('modes-reglement', ModeReglementViewSet, basename='modereglement')


urlpatterns = [
    path('', include(router.urls)),
]
