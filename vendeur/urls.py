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
from vendor.viewsets.categorie import CategorieViewSet
from vendor.viewsets.etiquette import EtiquetteViewSet
from vendor.viewsets.produit import ProduitViewSet
from vendor.viewsets.boutique import BoutiqueViewSet


router = routers.DefaultRouter()
router.register(r"categories", CategorieViewSet)
router.register(r"etiquettes", EtiquetteViewSet)
router.register(r"produts", ProduitViewSet)
router.register(r"boutiques", BoutiqueViewSet)



urlpatterns = [
    path("api/", include(router.urls)),
]