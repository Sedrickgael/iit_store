from django.db import models
from django.utils.translation import gettext_lazy as _
from base.models.utils.standard_model import StandardModel

# Create your models here.

class Categorie(StandardModel):
    """
    Modèle Categorie lié à son ProfilClient.
    """
    class Meta:
        verbose_name = _("Categorie")
        verbose_name_plural = _("Categories")

    nom  = models.CharField(max_length=255, verbose_name=_("Nom de la Categorie"))
    slug = models.SlugField(max_length=255, unique=True, verbose_name=_("Slug de la Categorie"))
    description = models.TextField(blank=True, verbose_name=_("Description de la Categorie"))

    def __str__(self):
        return f"Categorie: {self.nom} - Slug: {self.slug}"