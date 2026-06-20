from django.db import models
from django.utils.translation import gettext_lazy as _
from base.utils.models.standard_model import StandardModel
from django.utils.text import slugify


class Produit(StandardModel):

    """
        Modele Produit
    """

    class Meta:
        verbose_name = "Produit"
        verbose_name_plural = "Produits"

    name = models.CharField(max_length=200, verbose_name=_("Nom"))
    description = models.TextField(verbose_name=_("Description"))
    categorie_id = models.ForeignKey("vendor.Categorie", on_delete=models.CASCADE, related_name="produit_ids", verbose_name=_("Catégorie"))
    etiquette_id = models.ManyToManyField("vendor.Etiquette" , related_name="etiquette_produit_ids" , verbose_name="Etiquette")
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name=_("Prix du produit"))
    slug = models.SlugField("slug" , blank=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)  
        super().save(*args, **kwargs)