from django.contrib import admin
from store.models import Commande, LigneCommande, Livraison, ModeDeReglement, Panier, PanierItem


class LigneCommandeInline(admin.TabularInline):
    model = LigneCommande
    extra = 0


@admin.register(Commande)
class CommandeAdmin(admin.ModelAdmin):
    list_display = ("number", "profil", "statut", "destination", "created_at")
    list_filter = ("statut",)
    search_fields = ("number", "profil__username")
    readonly_fields = ("number",)
    inlines = [LigneCommandeInline]


@admin.register(LigneCommande)
class LigneCommandeAdmin(admin.ModelAdmin):
    list_display = ("order", "product", "quantity", "unit_price")
    search_fields = ("order__number", "product__name")


@admin.register(Livraison)
class LivraisonAdmin(admin.ModelAdmin):
    list_display = ("order", "status", "city", "tracking_number", "shipped_at")
    list_filter = ("status",)
    search_fields = ("order__number", "tracking_number")


@admin.register(ModeDeReglement)
class ModeDeReglementAdmin(admin.ModelAdmin):
    list_display = ("name", "type", "is_active")
    list_filter = ("type", "is_active")


@admin.register(Panier)
class PanierAdmin(admin.ModelAdmin):
    list_display = ("id", "profil", "session_key", "total")
    search_fields = ("profil__username", "session_key")


@admin.register(PanierItem)
class PanierItemAdmin(admin.ModelAdmin):
    list_display = ("cart", "product", "quantity", "sub_total")
    search_fields = ("cart__id", "product__name")
