from django.db import models
from django.utils.translation import gettext_lazy as _
from cities_light.models import City, Country, Region
from base.models.utils.standard_model import StandardModel
from django.conf import settings 
class Adresse(StandardModel):
    """
    Modèle représentant une adresse.
    """
    class Meta:
        verbose_name = _("Adresse")
        verbose_name_plural = _("Adresses")
        
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='adresses', verbose_name=_("Utilisateur"))
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_("Pays"))
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_("Département / Région"))
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_("Ville"))
    street = models.CharField(max_length=255, verbose_name=_("Rue"))
    is_default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.street}, {self.city}, {self.region}, {self.country}"