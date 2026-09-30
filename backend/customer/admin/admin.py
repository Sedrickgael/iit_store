from django.contrib import admin

from backend.customer.models.adresse import AdresseModel
from backend.customer.models.avis import AvisModel
from backend.customer.models.favoris import FavorisModel
from backend.customer.models.moyen_paiement import MoyenPaiementModel
from backend.customer.models.paiement import PaiementModel


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
