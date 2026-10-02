from django.db import models
from django.utils.translation import gettext_lazy as _
from base.models.utils.standard_model import StandardModel

class Client(StandardModel):
    """
    Modèle Client lié à son ProfilClient.
    """
    class Meta:
        verbose_name = _("Client")
        verbose_name_plural = _("Clients")

    profil = models.OneToOneField(
        'accounts.ProfilClient', 
        on_delete=models.CASCADE, 
        verbose_name=_("Profil Client"), 
        related_name="client"
    )

    def __str__(self):
        return f"Client: {self.profil}"