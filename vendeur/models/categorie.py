from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _ 
from base.models.utils.standard_model import StandardModel


class Categorie(StandardModel):

    """
        Modele catégorie
    """

    class Meta: 
        verbose_name = 'Categorie' 
        verbose_name_plural = "Categories"

    name = models.CharField(max_length=20, verbose_name=_("Nom"))
    description = models.TextField(verbose_name=_("Description"))
    slug = models.SlugField("Slug", blank=True)

    def __str__(self):
       return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)  
        super().save(*args, **kwargs)