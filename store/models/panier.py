# panier.py
from django.db import models
from django.utils.translation import gettext_lazy as _
from base.utils.models.standard_model import StandardModel


class Panier(StandardModel):
    """
    Panier d'un utilisateur (ou d'une session anonyme).
    """
    class Meta:
        verbose_name = "Panier"
        verbose_name_plural = "Paniers"

    profil = models.ForeignKey(
        'customer.Profil',
        on_delete=models.CASCADE,
        related_name='paniers',
        verbose_name=_("Profil Utilisateur"),
        null=True,
        blank=True,
    )
    session_key = models.CharField(
        max_length=100,
        verbose_name=_("Clé de session"),
        blank=True,
        null=True,
    )

    @property
    def total(self):
        return sum(item.sub_total for item in self.items.all()) 

 
    