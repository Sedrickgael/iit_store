from django.contrib import admin

from customer.models.adresse import AdresseModel
from customer.models.avis import AvisModel
from customer.models.favoris import FavorisModel
from customer.models.moyen_paiement import MoyenPaiementModel
from customer.models.paiement import PaiementModel


@admin.register(AdresseModel)
class AdresseAdmin(admin.ModelAdmin):
    list_display = ('id', 'utilisateur', 'ville', 'pays')


@admin.register(AvisModel)
class AvisAdmin(admin.ModelAdmin):
    list_display = ('id', 'utilisateur', 'produit', 'note')


@admin.register(FavorisModel)
class FavorisAdmin(admin.ModelAdmin):
    list_display = ('id', 'utilisateur', 'produit')


@admin.register(MoyenPaiementModel)
class MoyenPaiementAdmin(admin.ModelAdmin):
    list_display = ('id', 'utilisateur', 'type_paiement')


@admin.register(PaiementModel)
class PaiementAdmin(admin.ModelAdmin):
    list_display = ('id', 'utilisateur', 'commande', 'montant', 'statut')
