from django.urls import path, include
from rest_framework.routers import DefaultRouter
from vendeur.viewsets.produit_viewset import ProduitViewSet
from vendeur.viewsets.categorie_viewset import CategorieViewSet
from vendeur.viewsets.etiquette_viewset import EtiquetteViewSet

router = DefaultRouter()
router.register(r'categories', CategorieViewSet, basename='categorie')
router.register(r'etiquettes', EtiquetteViewSet, basename='etiquette')
router.register(r'produits', ProduitViewSet, basename='produit')
urlpatterns = [
    path('', include(router.urls)),
]