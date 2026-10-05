from django.db import models
from django.utils.translation import gettext_lazy as _
from base.models.utils.standard_model import StandardModel

import uuid
# Create your models here.


class Boutique(StandardModel):
    """
    Modèle Boutique lié à son ProfilClient.
    """
    
    class secteur_activite(models.TextChoices):
        ELECTRONIQUE = 'Électronique', _('Électronique')
        MODE = 'Mode', _('Mode')
        ALIMENTAIRE = 'Alimentaire', _('Alimentaire')
        SANTE_BEAUTE = 'Santé et Beauté', _('Santé et Beauté')
        SPORT_LOISIRS = 'Sport et Loisirs', _('Sport et Loisirs')
        AUTRES = 'Autres', _('Autres')
        
    class Meta:
        verbose_name = _("Boutique")
        verbose_name_plural = _("Boutiques")

    uuid = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        editable=False,
        db_index=True,
    )
    nom  = models.CharField(max_length=255, verbose_name=_("Nom de la Boutique"))
    slug = models.SlugField(max_length=255, unique=True, verbose_name=_("Slug de la Boutique"))
    email = models.EmailField(verbose_name=_("Email de la Boutique"))
    contact = models.CharField(max_length=20, blank=True, verbose_name=_("Contact de la Boutique"))
    pays = models.ForeignKey('cities_light.Country', on_delete=models.CASCADE, verbose_name=_("Pays de la Boutique"))
    region = models.ForeignKey('cities_light.Region', on_delete=models.CASCADE, verbose_name=_("Région de la Boutique"))
    ville = models.ForeignKey('cities_light.City', on_delete=models.CASCADE, verbose_name=_("Ville de la Boutique"))
    quartier = models.CharField(max_length=255, verbose_name=_("Quartier de la Boutique"))
    secteur_activite = models.CharField(
        max_length=255,
        blank=True,
        verbose_name=_("Secteur d'activité de la Boutique"),
        choices=secteur_activite.choices
    )

    def __str__(self):
        return f"Boutique: {self.nom} - Slug: {self.slug}"