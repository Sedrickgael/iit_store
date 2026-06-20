from django.db import models
from django.utils.translation import gettext_lazy as _
from base.models.utils.standard_model import StandardModel

#create your models here.
class ProduitModel(StandardModel):
    """
    """
    
    class Meta:
        verbose_name = "Produit"
        verbose_name_plural = "Produits"

    nom = models.CharField(max_length=254, verbose_name="Nom")
    slug = models.SlugField(max_length=254, unique=True, verbose_name="Slug")
    description = models.TextField()
    prix = models.FloatField()
    image = models.ImageField(upload_to='produits/', blank=True, null=True, verbose_name="Image du produit")

    def __str__(self):
        return self.nom

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)


Produit = ProduitModel