from rest_framework.routers import DefaultRouter
from django.urls import path, include
from customer.viewsets.profil_viewset import ProfilViewSet
from customer.viewsets.adresse_viewset import AdresseViewSet
from customer.viewsets.avis_viewset import AvisViewSet
from customer.viewsets.favoris_viewset import FavorisViewSet
from customer.viewsets.moyen_paiement_viewset import MoyenPaiementViewSet
from customer.viewsets.paiement_viewset import PaiementViewSet

router = DefaultRouter()
router.register(r"profils", ProfilViewSet)
router.register(r"adresses", AdresseViewSet)
router.register(r"avis", AvisViewSet)
router.register(r"favoris", FavorisViewSet)
router.register(r"moyens-paiement", MoyenPaiementViewSet)
router.register(r"paiements", PaiementViewSet)

urlpatterns = [
    path("", include(router.urls)),
]