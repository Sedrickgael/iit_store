"""
URL configuration for iit_store project.

The ⁠ urlpatterns ⁠ list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include
from rest_framework import routers,viewsets
from store.viewsets.commande import CommandeViewSet
from store.viewsets.favori import FavoriViewSet
from store.viewsets.geo import GeoViewSet
from store.viewsets.livraison import LivraisonViewSet
from store.viewsets.mode_de_reglement import ModeDeReglementViewSet
from store.viewsets.panier import PanierViewSet



router = routers.DefaultRouter()
router.register(r"commande", CommandeViewSet)
router.register(r"favori", FavoriViewSet, basename="favori")
router.register(r"livraison", LivraisonViewSet)
router.register(r"modeReglement", ModeDeReglementViewSet)
router.register(r"panier", PanierViewSet)
router.register(r"geo", GeoViewSet, basename="geo")



urlpatterns = [
    path("api/", include(router.urls)),
]