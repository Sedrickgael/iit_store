from django.contrib import admin

from vendeur.models.categorie import Categorie
from vendeur.models.etiquette import Etiquette
from vendeur.models.produit import ProduitModel


@admin.register(Categorie)
class CategorieAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom', 'slug')
    search_fields = ('nom', 'slug')


@admin.register(Etiquette)
class EtiquetteAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom')
    search_fields = ('nom',)


@admin.register(ProduitModel)
class ProduitAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom', 'prix', 'slug')
    search_fields = ('nom', 'slug')
