from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from base.utils.models.standard_model import StandardModel


class Produit(StandardModel):

    """
        Modele Produit
    """

    class Meta: 
        verbose_name = 'Produit'
        verbose_name_plural = "Produits"

    name = models.CharField(max_length=100, verbose_name=_("Nom"))
    description = models.TextField(verbose_name=_("Description"))
    price = models.DecimalField(max_digits=10, decimal_places=2,null=True, blank=True ,verbose_name=_("Prix du produit"))
    image = models.URLField(blank=True, verbose_name=_("Image du produit"))
    slug = models.SlugField("Slug", blank=True)
    vendeur = models.ForeignKey("vendor.Vendeur", on_delete=models.RESTRICT, verbose_name=_("Vendeur"), related_name="vendeur_produits")
    categorie = models.ForeignKey("vendor.Categorie", on_delete=models.CASCADE, related_name="produit_ids", verbose_name=_("Catégorie"))
    etiquette = models.ManyToManyField("vendor.Etiquette", related_name="etiquette_produits_ids", verbose_name=_("Etiquette"))


    def __str__(self):
       return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)  
        super().save(*args, **kwargs)
