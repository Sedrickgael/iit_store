from django.db import models
from django.contrib.auth.models import User
from base.models.utils.standard_model import StandardModel
from vendeur.models.produit import ProduitModel
from django.utils.translation import gettext_lazy as _


class PanierModel(StandardModel):
    """Modèle représentant un panier d'achat pour un utilisateur, contenant des produits et leurs quantités."""
    class Meta:
        verbose_name = "Panier"
        verbose_name_plural = "Paniers"

    utilisateur = models.ForeignKey(User, on_delete=models.CASCADE, related_name='paniers')
    reference = models.CharField(max_length=254, verbose_name="Référence")
    produit = models.ForeignKey(ProduitModel, on_delete=models.CASCADE, related_name='paniers')
    quantite = models.PositiveIntegerField(default=1)