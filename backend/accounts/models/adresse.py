from django.db import models
from django.utils.translation import gettext_lazy as _
from base.models.utils.standard_model import StandardModel
# Create your models here.

class Adresse(StandardModel):
    """
    Modèle Adresse qui hérite de StandardModel pour ajouter des champs supplémentaires.
    """
    class Meta:
        verbose_name = _("Adresse")
        verbose_name_plural = _("Adresses")

    profil = models.ForeignKey('accounts.ProfilClient', on_delete=models.CASCADE, verbose_name=_("Profil Client"), related_name="adresses")
    street = models.CharField(max_length=255, blank=True, null=True, verbose_name=_("Rue"))
    city = models.ForeignKey('cities_light.City', on_delete=models.CASCADE, verbose_name=_("Ville"), related_name="adresses_city")
    region = models.ForeignKey('cities_light.Region', on_delete=models.CASCADE, verbose_name=_("Région"), related_name="adresses_region")
    country = models.ForeignKey('cities_light.Country', on_delete=models.CASCADE, verbose_name=_("Pays"), related_name="adresses_country")

    def __str__(self):
        return f"{self.street}, {self.city}"
