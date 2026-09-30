from django.contrib.auth.models import User
from django.db import models
from base.models.utils.standard_model import StandardModel
from vendeur.models.produit import ProduitModel
from django.core.validators import MinValueValidator, MaxValueValidator



class AvisModel(StandardModel):
    class Meta:
        verbose_name = 'Avis'
        verbose_name_plural = 'Avis'

    utilisateur = models.ForeignKey(User, on_delete=models.CASCADE, related_name='avis')
    produit = models.ForeignKey(ProduitModel, on_delete=models.CASCADE, related_name='avis')
    note = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    commentaire = models.TextField(blank=True)

    def __str__(self):
        return f"{self.utilisateur.username} - {self.produit.nom} ({self.note})"
