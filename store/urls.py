from rest_framework.routers import DefaultRouter
from django.urls import path, include
from store.viewsets.commande import CommandeViewSet
from store.viewsets.ligne_de_commande import LigneCommandeViewSet
from store.viewsets.livraison import LivraisonViewSet
from store.viewsets.mode_de_reglement import ModeDeReglementViewSet
from store.viewsets.panier import PanierViewSet
from store.viewsets.ligne_panier import PanierItemViewSet

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