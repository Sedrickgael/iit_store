# panier.py
from django.db import models
from django.utils.translation import gettext_lazy as _
from base.utils.models.standard_model import StandardModel
import uuid


class PanierItem(StandardModel):
    """
    Produit dans un panier
    """
 
    class Meta:
        verbose_name = "Article du panier"
        verbose_name_plural = "Articles du panier"
        unique_together = ("cart", "product")
 
    cart = models.ForeignKey(
        "store.Panier",
        on_delete=models.CASCADE,
        related_name="items",
        verbose_name=_("Panier")
    )
    product = models.ForeignKey(
        "vendor.Produit",
        on_delete=models.CASCADE,
        related_name="cart_items",
        verbose_name=_("Produit")
    )
    quantity = models.PositiveIntegerField(default=1, verbose_name=_("Quantité"))
    
    @property
    def sub_total(self):
        return self.quantity * self.product.price
 
    def _str_(self):
        return f"{self.quantity}x {self.product} — {self.cart}"
    