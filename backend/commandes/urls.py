from django.urls import path, include
from rest_framework.routers import DefaultRouter
from commandes.views.commande_viewset import CommandeViewSet
from commandes.views.panier_viewset import PanierViewSet
from commandes.views.mode_reglement_viewset import ModeReglementViewSet
from commandes.views.details_panier_viewset import DetailsPanierViewSet


router = DefaultRouter()
router.register('commandes', CommandeViewSet, basename='commande')
router.register('paniers', PanierViewSet, basename='panier')
router.register('details-paniers', DetailsPanierViewSet, basename='detailspanier')
router.register('modes-reglement', ModeReglementViewSet, basename='modereglement')


urlpatterns = [
    path('', include(router.urls)),
]
