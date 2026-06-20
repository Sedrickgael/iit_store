from django.contrib import admin
from django.http import HttpResponse
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static


def home(request):
    html = """
    <h1>iit_store</h1>
    <ul>
        <li><a href="/store/">Store</a></li>
        <li><a href="/customer/">Customer</a></li>
        <li><a href="/vendeur/">Vendeur</a></li>
        <li><a href="/admin/">Admin</a></li>
    </ul>
    """
    return HttpResponse(html)


urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('store/', include('store.urls')),
    path('vendeur/', include('vendeur.urls')),
    path('customer/', include('customer.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
