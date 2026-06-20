from django.db import models
from django.utils.translation import gettext_lazy as _
from base.models.helper_standard import StandardModel


class Categorie(StandardModel):
    """Model definition for Catégorie."""

    # TODO: Define fields here
    name = models.CharField(_("Nom"), max_length=50)
    description = models.TextField(_("Description"))
    slug = models.SlugField(_("Slug"))

    class Meta:
        """Meta definition for Catégorie."""

        verbose_name = 'Catégorie'
        verbose_name_plural = 'Catégories'

    def __str__(self):
        """Unicode representation of Catégorie."""
        return self.name

    def save(self):
        """Save method for Catégorie."""
        pass

    def get_absolute_url(self):
        """Return absolute url for Catégorie."""
        return ('')

    # TODO: Define custom methods here
