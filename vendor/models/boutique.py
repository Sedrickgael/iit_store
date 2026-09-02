from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from base.utils.models.standard_model import StandardModel

class Vendeur(StandardModel):

    """
        Modele Vendeur
    """

    class Meta: 
        verbose_name = 'Vendeur'
        verbose_name_plural = "Vendeurs"

    last_name = models.CharField(max_length=150, verbose_name=_("Nom"))
    first_name = models.CharField(max_length=150, verbose_name=_("Prenom"))
    email = models.EmailField(verbose_name=_("Email"), max_length=254)
    password = models.CharField(max_length=128, verbose_name=_("Mot de passe"))
    slug = models.SlugField("Slug", blank=True)

    def __str__(self):
       return f"{self.first_name} {self.last_name}"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.first_name}-{self.last_name}")
        super().save(*args, **kwargs)

