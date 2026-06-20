from django.contrib.auth.models import User
from django.db import models

from base.models.utils.standard_model import StandardModel


class AdresseModel(StandardModel):
    class Meta:
        verbose_name = 'Adresse'
        verbose_name_plural = 'Adresses'

    utilisateur = models.ForeignKey(User, on_delete=models.CASCADE, related_name='adresses')
    rue = models.CharField(max_length=255, blank=True)
    ville = models.CharField(max_length=100, blank=True)
    code_postal = models.CharField(max_length=20, blank=True)
    pays = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.utilisateur.username} - {self.ville}"