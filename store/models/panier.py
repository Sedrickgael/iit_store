# panier.py

from django.db import models
from django.utils.translation import gettext_lazy as _
from base.models.utils.standard_model import StandardModel
from django.contrib.sessions.models import Session
from store.models.ligne_panier import PanierItem


class Panier(StandardModel):
    """
    Modèle panier
    """

    class Meta:
        verbose_name = "Article du panier"
        verbose_name_plural = "Articles du panier"
        unique_together = ("session_key",)

    profil = models.ForeignKey(
        "customer.Profil",
        on_delete=models.CASCADE,
        related_name="paniers",
        verbose_name=_("Profil Utilisateur"),
        null=True,
        blank=True
    )

    session_key = models.ForeignKey(
        Session,
        verbose_name=_("Clé de session"),
        blank=True,
        null=True,
        on_delete=models.CASCADE
    )

    @property
    def total(self):
        items = PanierItem.objects.filter(cart=self.id)
        total = 0

        for item in items:
            total += item.sub_total()

        return total
