from django.contrib.auth.models import User
from django.db import models

from base.models.utils.standard_model import StandardModel
from store.models.commande import CommandeModel


class PaiementModel(StandardModel):
    class Meta:
        verbose_name = 'Paiement'
        verbose_name_plural = 'Paiements'

    utilisateur = models.ForeignKey(User, on_delete=models.CASCADE, related_name='paiements')
    commande = models.ForeignKey(CommandeModel, on_delete=models.CASCADE, related_name='paiements')
    montant = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    statut = models.CharField(max_length=50, default='en_attente')

    def __str__(self):
        return f"{self.utilisateur.username} - {self.commande.reference} - {self.statut}"