from django.db import models
from django.utils.translation import gettext_lazy as _
from base.models.utils.standard_model import StandardModel
# Create your models here.

class Produit(StandardModel):
    """
    Modèle Produit lié à son ProfilClient.
    """
    class Meta:
        verbose_name = _("Produit")
        verbose_name_plural = _("Produits")

    nom  = models.CharField(max_length=255, verbose_name=_("Nom du Produit"))
    slug = models.SlugField(max_length=255, unique=True, verbose_name=_("Slug du Produit"))
    description = models.TextField(blank=True, verbose_name=_("Description du Produit"))
    prix = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_("Prix du Produit"))
    prix_promotion = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    quantite_stock = models.PositiveIntegerField(verbose_name=_("Quantité en Stock du Produit"))
    categorie = models.ForeignKey('catalogues.Categorie', on_delete=models.CASCADE, verbose_name=_("Catégorie du Produit"))
    boutique = models.ForeignKey('catalogues.Boutique', on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_("Boutique du Produit"))

    @property
    def in_stock(self):
        return self.quantite_stock > 0
    @property
    def prix_effectif(self):
        """Le prix à payer (promotion si elle existe, sinon le prix normal)."""
        return self.prix_promotion if self.prix_promotion else self.prix

    def __str__(self):
        return f"{self.nom} - {self.description} - {self.prix_effectif} - {self.quantite_stock} - {self.boutique}"