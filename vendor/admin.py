from django.contrib import admin
from vendor.models import Vendeur, Categorie, Etiquette, Produit


@admin.register(Vendeur)
class VendeurAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "email")
    search_fields = ("first_name", "last_name", "email")


@admin.register(Categorie)
class CategorieAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "slug")
    search_fields = ("name",)


@admin.register(Etiquette)
class EtiquetteAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "slug")
    search_fields = ("name",)


@admin.register(Produit)
class ProduitAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "categorie", "vendeur")
    list_filter = ("categorie", "etiquette")
    search_fields = ("name",)
    filter_horizontal = ("etiquette",)
