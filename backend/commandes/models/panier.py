from django.db import models
from django.utils.translation import gettext_lazy as _
from base.models.utils.standard_model import StandardModel


class Panier(StandardModel):
    """
    Modèle Panier lié à son Client.
    """
    class Meta:
        verbose_name = _("Panier")
        verbose_name_plural = _("Paniers")

    client = models.OneToOneField(
        'accounts.Client',
        on_delete=models.CASCADE,
        verbose_name=_("Client"),
        related_name="panier"
    )

    def __str__(self):
        return f"Panier de {self.client.profil.user.username}"