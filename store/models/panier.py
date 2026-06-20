
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify
from base.utils.models.standard_model import StandardModel
import uuid


class Panier(StandardModel):
    """
    Modele panier
    """

    class Meta:
        verbose_name  = "Article du panier"
        verbose_name_plural = "Articles du panier"
        unique_together = ("session_key", "product_id")

    session_key = models.CharField(
        max_length=100,
        verbose_name=_("Clé de session"),
        blank = True,
    )
    product_id = models.ForeignKey(
        "vendor.Produit",
        on_delete=models.CASCADE,
        related_name="articles_panier",
        verbose_name=_("Produit")
    )
    quantity = models.PositiveIntegerField(default=1, verbose_name=_("Quantité"))

    @property
    def sub_total(self):
        return self.quantity * self.product.price

    def __str__(self):
        return f"{self.quantity}x {self.product_id} — {self.session_key}"

    def save(self, *args, **kwargs):
        if not self.session_key:
            self.session_key = uuid.uuid4().hex
        if not self.slug:
            self.slug = slugify(f"panier-{self.session_key[:8]}")
        super().save(*args, **kwargs)
