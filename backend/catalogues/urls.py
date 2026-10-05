from django.urls import path, include 
from rest_framework.routers import DefaultRouter
from catalogues.views.categorie_viewset import CategorieViewSet
from catalogues.views.produit_viewset import ProduitViewSet
from catalogues.views.boutique_viewset import BoutiqueViewSet


router = DefaultRouter()
router.register('categories', CategorieViewSet, basename='categorie')
router.register('produits', ProduitViewSet, basename='produit')
router.register('boutiques', BoutiqueViewSet, basename='boutique')


urlpatterns = [
    path('', include(router.urls)),
]