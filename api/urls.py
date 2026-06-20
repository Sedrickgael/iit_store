from django.urls import path, include

urlpatterns = [
    path('vendeur/', include('vendeur.urls')),
    path('store/', include('store.urls')),
    path('customer/', include('customer.urls')),  # ← ajoute

]