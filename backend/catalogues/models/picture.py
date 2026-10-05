from django.db import models
from django.utils.translation import gettext_lazy as _
from base.models.utils.standard_model import StandardModel


class ImageProduit(StandardModel):
    """
    Modèle ImageProduit : un produit peut avoir plusieurs images.
    """
    class Meta:
        verbose_name = _("Image Produit")
        verbose_name_plural = _("Images Produits")

    produit = models.ForeignKey(
        'catalogues.Produit',
        on_delete=models.CASCADE,
        verbose_name=_("Produit"),
        related_name="images"
    )
    image = models.ImageField(upload_to='produits/', verbose_name=_("Image"))
    est_principale = models.BooleanField(default=False, verbose_name=_("Image principale"))

    def __str__(self):
        return f"Image de {self.produit.nom}"