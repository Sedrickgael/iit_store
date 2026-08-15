from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from base.utils.models.standard_model import StandardModel
from cities_light.models import City, Country

class Boutique(StandardModel):

    """
        Modele Boutique
    """

    class Meta: 
        verbose_name = 'Boutique'
        verbose_name_plural = "Boutiques"

    profil = models.ForeignKey('customer.Profil', on_delete=models.CASCADE, related_name='user_boutique',verbose_name=_("Propriétaire"))
    name = models.CharField(max_length=150, verbose_name=_("Nom de la boutique"))
    address = models.CharField(max_length=150, verbose_name=_("Adresse"))
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_("Pays"))
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, blank=True,)
    email = models.EmailField(verbose_name=_("Email"), max_length=254)
    slug = models.SlugField("Slug", blank=True)

    produit_id = models.ManyToManyField("vendor.Produit", related_name=_("vendeur_id"), verbose_name=_("Produit"))

    def __str__(self):
       return f"{self.name}"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.name}") 
        super().save(*args, **kwargs)
