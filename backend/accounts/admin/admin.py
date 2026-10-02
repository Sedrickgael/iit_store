from django.contrib import admin

from accounts.models.user import Utilisateur
from accounts.models.client import Client
from accounts.models.profil_client import Profil
from accounts.models.adress import Adresse


@admin.register(Utilisateur)
class UtilisateurAdmin(admin.ModelAdmin):
    list_display = (
        'email',
        'username',
        'is_active',
        'is_staff',
        'is_superuser',
    )
    search_fields = ('email', 'username')
    list_filter = ('is_active', 'is_staff', 'is_superuser')

    fieldsets = (
        (None, {
            'fields': ('email', 'username', 'password')
        }),
        ('Permissions', {
            'fields': (
                'is_active',
                'is_staff',
                'is_superuser',
            )
        }),
    )


@admin.register(Profil)
class ProfilAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'genre',
        'telephone',
        'date_naissance',
    )
    search_fields = (
        'user__email',
        'user__username',
        'telephone',
    )
    list_filter = ('genre',)


@admin.register(Adresse)
class AdresseAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'street',
        'city',
        'region',
        'country',
        'is_default',
    )

    search_fields = (
        'user__email',
        'user__username',
        'street',
        'city__name',
        'region__name',
        'country__name',
    )

    list_filter = ('is_default',)


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = (
        'email',
        'telephone',
    )

    search_fields = (
        'email',
        'telephone',
    )