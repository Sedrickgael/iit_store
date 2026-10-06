from django.db import models
from django.utils.translation import gettext_lazy as _
from base.models.utils.standard_model import StandardModel
# Create your models here.


class DetailsCommande(StandardModel):
    """
    Modèle Détail Commande lié à sa Commande et à son Produit.
    """
    class Meta:
        verbose_name = _("Détail Commande")
        verbose_name_plural = _("Détails Commandes")

    commande = models.ForeignKey(
        'commandes.Commande', 
        on_delete=models.CASCADE, 
        verbose_name=_("Commande"), 
        related_name="details"
    )
    produit = models.ForeignKey(
        'catalogues.Produit', 
        on_delete=models.CASCADE, 
        verbose_name=_("Produit"), 
        related_name="details"
    )
    quantity = models.PositiveIntegerField(verbose_name=_("Quantité"))
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_("Prix"))

    
    @property
    def montant_total(self):
        return self.price * self.quantity     
    def __str__(self):
        return f"Détail Commande: {self.quantity} x {self.produit} (Commande {self.commande.commande_id})"
