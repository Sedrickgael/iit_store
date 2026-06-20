from django.db import models
from django.contrib.auth.models import User
from base.models.utils.standard_model import StandardModel
from vendeur.models.produit import ProduitModel
from django.utils.translation import gettext_lazy as _


class CommandeModel(StandardModel):
    """Modèle représentant une commande passée par un utilisateur pour un produit spécifique."""
    class Meta:
        verbose_name = "Commande"
        verbose_name_plural = "Commandes"
        
    class Statut(models.TextChoices):
        EN_COURS = 'EN_COURS', _('En cours')
        TERMINEE = 'TERMINEE', _('Terminée')
        ANNULEE = 'ANNULEE', _('Annulée')

    utilisateur = models.ForeignKey(User, on_delete=models.CASCADE, related_name='commandes')
    reference = models.CharField(max_length=254, verbose_name="Référence")
    date_de_commande = models.DateTimeField(auto_now_add=True)
    produit = models.ForeignKey(ProduitModel, on_delete=models.CASCADE, related_name='commandes')
    quantite = models.PositiveIntegerField()
    statut = models.CharField(max_length=20, choices=Statut.choices, default=Statut.EN_COURS)

    def __str__(self):
        return f"Commande {self.id} - {self.utilisateur.username} - {self.produit.nom} - {self.statut}"