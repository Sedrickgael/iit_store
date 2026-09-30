from django.db import models
from django.utils.translation import gettext_lazy as _
from base.models.utils.standard_model import StandardModel


class ModePaiementModel(StandardModel):
    """Mode de paiement disponible pour une commande."""

    class Meta:
        verbose_name = "Mode de paiement"
        verbose_name_plural = "Modes de paiement"

    libelle = models.CharField(max_length=100, verbose_name=_("Libellé"))
    description = models.TextField(blank=True, verbose_name=_("Description"))

    def __str__(self):
        return self.libelle
