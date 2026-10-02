from django.db import models
from django.utils.translation import gettext_lazy as _
from base.models.utils.standard_model import StandardModel
from django.conf import settings
# Create your models here.

class ProfilClient(StandardModel):
    """
    Modèle Profil Client qui hérite de StandardModel pour ajouter des champs supplémentaires. 
    """
    
    class genreChoices(models.TextChoices):
        HOMME = 'H', _('Homme')
        FEMME = 'F', _('Femme')
                
    class Meta:
        verbose_name = _("Profil Client")
        verbose_name_plural = _("Profils Clients")

    
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name=_("Utilisateur"),related_name="profil_id")
    nom = models.CharField(max_length=255, blank=True, null=True, verbose_name=_("Nom"))   
    prenom = models.CharField(max_length=255, blank=True, null=True, verbose_name=_("Prénom"))
    date_naissance = models.DateField(blank=True, null=True, verbose_name=_("Date de naissance"))
    telephone = models.CharField(max_length=20, blank=True, null=True, verbose_name=_("Téléphone"))
    genre = models.CharField(choices=genreChoices.choices, max_length=10, blank=True, null=True, verbose_name=_("Genre"))

    def __str__(self):
       return f"{self.nom} - ({self.user.username})"