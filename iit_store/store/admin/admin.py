from django.contrib import admin

from store.models.commande import CommandeModel
from store.models.mode_paiement import ModePaiementModel
from store.models.panier import PanierModel


@admin.register(CommandeModel)
class CommandeAdmin(admin.ModelAdmin):
    list_display = ('id', 'utilisateur', 'reference', 'produit', 'quantite', 'statut')
    list_filter = ('statut', 'date_de_commande')
    search_fields = ('reference', 'utilisateur__username', 'produit__nom')


@admin.register(PanierModel)
class PanierAdmin(admin.ModelAdmin):
    list_display = ('id', 'utilisateur', 'reference', 'produit', 'quantite')
    search_fields = ('reference', 'utilisateur__username', 'produit__nom')


@admin.register(ModePaiementModel)
class ModePaiementAdmin(admin.ModelAdmin):
    list_display = ('id', 'libelle')
    search_fields = ('libelle', 'description')
