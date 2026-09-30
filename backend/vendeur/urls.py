from django.urls import path, include
from rest_framework.routers import DefaultRouter
from backend.vendeur.viewsets.produit_viewset import ProduitViewSet
from backend.vendeur.viewsets.categorie_viewset import CategorieViewSet
from backend.vendeur.viewsets.etiquette_viewset import EtiquetteViewSet

router = DefaultRouter()
router.register(r'categories', CategorieViewSet, basename='categorie')
router.register(r'etiquettes', EtiquetteViewSet, basename='etiquette')
router.register(r'produits', ProduitViewSet, basename='produit')
urlpatterns = [
    path('', include(router.urls)),
]