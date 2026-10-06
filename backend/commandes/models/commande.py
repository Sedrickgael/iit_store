from django.db import models
from django.utils.translation import gettext_lazy as _
from base.models.utils.standard_model import StandardModel
import uuid
# Create your models here.


class Commande(StandardModel):
    """
    Modèle Commande lié à son Client.
    """
    class Meta:
        verbose_name = _("Commande")
        verbose_name_plural = _("Commandes")

    client = models.ForeignKey(
        'accounts.Client',
        on_delete=models.CASCADE,
        verbose_name=_("Client"),
        related_name="commandes"
    )

    class StatusChoices(models.TextChoices):
        PENDING = 'pending', _("Pending")
        CONFIRMED = 'confirmed', _("Confirmed")
        CANCELLED = 'cancelled', _("Cancelled")

    commande_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    status = models.CharField(max_length=20, choices=StatusChoices.choices, default=StatusChoices.PENDING, verbose_name=_("Status"))
    mode_reglement = models.ForeignKey(
        'commandes.ModeDeReglement',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name=_("Mode de règlement"),
        related_name="commandes"
    )
    produit = models.ManyToManyField('catalogues.Produit', through='DetailsCommande', related_name='commandes', verbose_name=_("Produits"))

    def __str__(self):
        return f"Commande: {self.commande_id} - Client: {self.client.profil.user.username} - Status: {self.status}"
