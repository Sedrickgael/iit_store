from django.urls import path, include 
from rest_framework.routers import DefaultRouter
from accounts.views.register_viewsets import RegisterView
from accounts.views.profil_client_viewset import ProfilClientViewSet
from accounts.views.adresse_viewset import AdresseViewSet
from accounts.views.client_viewset import ClientViewSet


router = DefaultRouter()
router.register('profils', ProfilClientViewSet, basename='profil')
router.register('adresses', AdresseViewSet, basename='adresse')
router.register('clients', ClientViewSet, basename='client')


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('', include(router.urls)),
]