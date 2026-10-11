from django.db import models
from django.utils.translation import gettext_lazy as _
from commandes.models.commande import Commande
from base.models.utils.standard_model import StandardModel
# Create your models here.


class StatutChoices(models.TextChoices):
    EN_ATTENTE = 'en_attente', _("En attente")
    REUSSI = 'reussi', _("Réussi")
    ECHOUE = 'echoue', _("Échoué")
    REMBOURSE = 'rembourse', _("Remboursé")

class Paiement(StandardModel):
    commande = models.OneToOneField(
        'commandes.Commande',
        on_delete=models.CASCADE,
        verbose_name=_("Commande"),
        related_name="paiement"
    )
    montant = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_("Montant"))
    mode_reglement = models.ForeignKey(
        'commandes.ModeDeReglement',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name=_("Mode de règlement"),
        related_name="paiements"
    )
    reference = models.CharField(max_length=255, blank=True, verbose_name=_("Référence"))
    statut = models.CharField(max_length=20, choices=StatutChoices.choices, default=StatutChoices.EN_ATTENTE, verbose_name=_("Statut"))