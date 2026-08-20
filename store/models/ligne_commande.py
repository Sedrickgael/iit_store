from django.db import models
from django.utils.translation import gettext_lazy as _ # pour la traduction multilanguage
from base.models.utils.standard_model import StandardModel


class LigneCommande(StandardModel):
    """
    Produits liés à une commande (quantité + prix)
    """

    class Meta:
        verbose_name = "Ligne de commande"
        verbose_name_plural = "Lignes de commande"

    order = models.ForeignKey("store.Commande", on_delete=models.CASCADE, related_name="lignes", verbose_name=_("Commande"))

    product = models.ForeignKey("vendeur.Produit", on_delete=models.PROTECT, related_name="lignes_commande", verbose_name=_("Produit"))

    quantity = models.PositiveIntegerField(default=1, verbose_name=_("Quantité"))

    unit_price = models.DecimalField(max_digits=10,decimal_places=2,verbose_name=_("Prix unitaire"))

    @property
    def sub_total(self):
        return self.quantity * self.unit_price

    def __str__(self):
        return f"{self.quantity}x {self.product} — {self.order}"