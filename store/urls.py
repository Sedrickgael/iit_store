from rest_framework.routers import DefaultRouter
from django.urls import path, include
from store.viewsets.commande_viewset import CommandeViewSet
from store.viewsets.ligne_commande_viewset import LigneCommandeViewSet
from store.viewsets.livraison_viewset import LivraisonViewSet
from store.viewsets.mode_reglement_viewset import ModeDeReglementViewSet
from store.viewsets.panier_viewset import PanierViewSet
from store.viewsets.ligne_panier_viewset import PanierItemViewSet

router = DefaultRouter()
router.register(r"commandes", CommandeViewSet)
router.register(r"lignes-commande", LigneCommandeViewSet)
router.register(r"livraisons", LivraisonViewSet)
router.register(r"modes-reglement", ModeDeReglementViewSet)
router.register(r"paniers", PanierViewSet)
router.register(r"lignes-panier", PanierItemViewSet)

urlpatterns = [
    path("", include(router.urls)),
]