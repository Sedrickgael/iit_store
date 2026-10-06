from django.urls import path, include 
from rest_framework.routers import DefaultRouter
# from commandes.views.categorie_viewset import CategorieViewSet
# from commandes.views.produit_viewset import ProduitViewSet
# from commandes.views.boutique_viewset import BoutiqueViewSet


router = DefaultRouter()
router.register('commandes', CategorieViewSet, basename='commande')
router.register('panier', ProduitViewSet, basename='panier')
router.register('detailscommandes', BoutiqueViewSet, basename='detailscommande')
router.register('detailspaniers', BoutiqueViewSet, basename='detailspanier')
router.register('modereglements', BoutiqueViewSet, basename='modereglement')


urlpatterns = [
    path('', include(router.urls)),
]