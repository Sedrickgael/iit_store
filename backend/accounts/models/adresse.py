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

    
    profil = models.ForeignKey('accounts.ProfilClient', on_delete=models.CASCADE, verbose_name=_("Profil Client"),related_name="adresse_id")    
    street = models.CharField(max_length=255, blank=True, null=True, verbose_name=_("Rue"))
    city = models.CharField(max_length=255, blank=True, null=True, verbose_name=_("Ville"))
    state = models.CharField(max_length=255, blank=True, null=True, verbose_name=_("État"))
    country = models.CharField(max_length=255, blank=True, null=True, verbose_name=_("Pays"))
    region = models.CharField(max_length=255, blank=True, null=True, verbose_name=_("Région"))
    
    def __str__(self):
        return f"{self.type} - {self.street}, {self.city}"