# favori.py
from django.db import models
from django.utils.translation import gettext_lazy as _
from base.utils.models.standard_model import StandardModel


class Favori(StandardModel):
    """
    Produit mis en favori par un utilisateur.
    """

    class Meta:
        verbose_name = "Favori"
        verbose_name_plural = "Favoris"
        unique_together = ("profil", "produit")

    profil = models.ForeignKey(
        "customer.Profil",
        on_delete=models.CASCADE,
        related_name="favoris",
        verbose_name=_("Profil"),
    )
    produit = models.ForeignKey(
        "vendor.Produit",
        on_delete=models.CASCADE,
        related_name="favoris",
        verbose_name=_("Produit"),
    )

    def __str__(self):
        return f"{self.profil} — {self.produit}"