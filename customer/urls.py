from rest_framework.routers import DefaultRouter
from django.urls import path, include
from customer.viewsets.profil import ProfilViewSet
from customer.viewsets.adresse import AdresseViewSet
from customer.viewsets.avis import AvisViewSet
from customer.viewsets.favoris import FavorisViewSet
from customer.viewsets.moyen_de_paiement import MoyenPaiementViewSet
from customer.viewsets.paiement import PaiementViewSet

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