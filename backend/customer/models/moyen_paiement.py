from django.contrib.auth.models import User
from django.db import models

from base.models.utils.standard_model import StandardModel


MP_CHOICES = [
    ('mobile', 'Mobile Money'),
    ('visa', 'Visa'),
    ('wave', 'Wave'),
    ('paypal', 'Paypal'),
]


class MoyenPaiementModel(StandardModel):
    class Meta:
        verbose_name = 'Moyen de paiement'
        verbose_name_plural = 'Moyens de paiement'

    utilisateur = models.ForeignKey(User, on_delete=models.CASCADE, related_name='moyens_paiement')
    type_paiement = models.CharField(max_length=20, choices=MP_CHOICES, default='mobile')
    details = models.TextField(blank=True)

    def __str__(self):
        return f"{self.utilisateur.username} - {dict(MP_CHOICES).get(self.type_paiement, self.type_paiement)}"