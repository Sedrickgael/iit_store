from django.db import models
from django.utils.translation import gettext_lazy as _
from base.utils.models.standard_model import StandardModel
from django.utils.text import slugify


class Vendeur(StandardModel):

    """
        Modele Vendeur
    """

    class Meta:
        verbose_name = "Vendeur"
        verbose_name_plural = "Vendeurs"

    first_name = models.CharField(_("Prénom"), max_length=150)
    last_name = models.CharField(_("Nom"), max_length=150)
    email= models.EmailField(_("Email"), max_length=254)
    password = models.CharField(verbose_name=_("mot de passe"), max_length=100)
    slug = models.SlugField("slug" , blank=True)
    produit_id = models.ManyToManyField("vendor.Produit", related_name="vendeur_id", verbose_name="Produit")

    def __str__(self):
        return f"{self.last_name} {self.first_name}"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.first_name}-{self.last_name}") 
        super().save(*args, **kwargs)