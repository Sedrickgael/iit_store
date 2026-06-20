from django.db import models
from django.utils.translation import gettext_lazy as _
from base.models.utils.standard_model import StandardModel
# Create your models here.

class Categorie(StandardModel):
    """Model definition for a category."""
    
    class Meta:
        verbose_name = "Categorie"
        verbose_name_plural = "Categories"
        
    name = models.CharField(_("Nom"), max_length=50)
    description = models.TextField(_("Description"))
    slug = models.SlugField(_("Slug")) 
        
    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)