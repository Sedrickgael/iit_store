from django.contrib.auth.models import User
from django.db import models

from base.models.utils.standard_model import StandardModel
from vendeur.models.produit import ProduitModel


class FavorisModel(StandardModel):
    class Meta:
        verbose_name = 'Favori'
        verbose_name_plural = 'Favoris'

    utilisateur = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favoris')
    produit = models.ForeignKey(ProduitModel, on_delete=models.CASCADE, related_name='favoris')

    def __str__(self):
        return f"{self.utilisateur.username} -> {self.produit.nom}"