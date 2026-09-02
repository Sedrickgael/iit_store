from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from customer.models import Profil, Adresse, Avis, Favoris, MoyenPaiementModel, PaiementModel


@admin.register(Profil)
class ProfilAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ("Informations du profil", {
            "fields": ("genre", "role", "photo", "telephone", "date_naissance", "est_actif")
        }),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Informations du profil", {
            "fields": ("genre", "role", "photo", "telephone", "date_naissance", "est_actif")
        }),
    )
    list_display = ("username", "email", "role", "est_actif", "is_staff")
    ordering = ("username",)


@admin.register(Adresse)
class AdresseAdmin(admin.ModelAdmin):
    list_display = ("profil", "type", "street", "city", "country", "is_default")
    list_filter = ("type", "is_default", "country")
    search_fields = ("street", "profil__username")


@admin.register(Avis)
class AvisAdmin(admin.ModelAdmin):
    list_display = ("profil", "product", "note", "is_approved")
    list_filter = ("is_approved", "note")
    search_fields = ("profil__username", "product__name")


@admin.register(Favoris)
class FavorisAdmin(admin.ModelAdmin):
    list_display = ("profil", "product")
    search_fields = ("profil__username", "product__name")


@admin.register(MoyenPaiementModel)
class MoyenPaiementAdmin(admin.ModelAdmin):
    list_display = ("profil", "type", "details")
    search_fields = ("profil__username", "type__name")


@admin.register(PaiementModel)
class PaiementAdmin(admin.ModelAdmin):
    list_display = ("profil", "commande", "montant", "statut")
    list_filter = ("statut",)
    search_fields = ("profil__username", "commande__number")
