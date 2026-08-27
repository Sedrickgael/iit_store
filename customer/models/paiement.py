
from django.db import models
from base.utils.models.standard_model import StandardModel
from django.utils.translation import gettext_lazy as _

 
class PaiementModel(StandardModel):
    class Meta:
        verbose_name = 'Paiement'
        verbose_name_plural = 'Paiements'
 
    profil = models.ForeignKey("customer.Profil", on_delete=models.CASCADE, related_name='paiements', verbose_name=_("Profil utilisateur"))
    commande = models.ForeignKey('store.Commande', on_delete=models.CASCADE, related_name='paiements', verbose_name=_("Commande"))
    montant = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name=_("montant"))
    statut = models.CharField(max_length=50, default='en_attente', verbose_name=_("Statut"))
 
    def __str__(self):
        return f"{self.profil.username} - {self.commande.number} - {self.statut}"
 