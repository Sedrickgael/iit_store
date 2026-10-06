from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include 
from django.conf import settings 

urlpatterns = [
    
    # Administration Django
    path("admin/", admin.site.urls),

    # API Accounts
    path('api/accounts/', include('accounts.urls')),
    # API Catalogues
    path('api/catalogues/', include('catalogues.urls')),
    # API Commandes
    path('api/commandes/', include('commandes.urls')),
    
    # API (JWT, etc.)
    path('api/', include('api.urls')),

    ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)