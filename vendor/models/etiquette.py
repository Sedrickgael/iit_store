from django.db import models
from django.utils.translation import gettext_lazy as _
from base.utils.models.standard_model import StandardModel
from django.utils.text import slugify


class Etiquette(StandardModel):

    """
        Modele Etiquette
    """

    class Meta:
        verbose_name = "Etiquette"
        verbose_name_plural = "Etiquettes"

    name = models.CharField(max_length=20, verbose_name=_("Nom"))
    description = models.TextField(verbose_name=_("Description"))
    slug = models.SlugField("slug" , blank=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)  
        super().save(*args, **kwargs)