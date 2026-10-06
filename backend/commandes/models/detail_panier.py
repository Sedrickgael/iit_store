from django.db import models
from django.utils.translation import gettext_lazy as _
from base.models.utils.standard_model import StandardModel


class DetailsPanier(StandardModel):
    """
    Modèle Détail Panier lié à son Panier et à son Produit.
    """
    class Meta:
        verbose_name = _("Détail Panier")
        verbose_name_plural = _("Détails Paniers")

    panier = models.ForeignKey(
        'commandes.Panier',
        on_delete=models.CASCADE,
        verbose_name=_("Panier"),
        related_name="details"
    )
    produit = models.ForeignKey(
        'catalogues.Produit',
        on_delete=models.CASCADE,
        verbose_name=_("Produit"),
        related_name="details_panier"
    )
    quantity = models.PositiveIntegerField(verbose_name=_("Quantité"))

    @property
    def montant_total(self):
        return self.produit.prix_effectif * self.quantity

    def __str__(self):
        return f"Détail Panier: {self.quantity} x {self.produit} (Panier {self.panier.id})"