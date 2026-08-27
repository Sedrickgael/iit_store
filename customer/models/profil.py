from django.conf import settings # <-- NOUVEL IMPORT
from django.db import models
from base.utils.models.standard_model import StandardModel
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

GENRE_CHOICES = [('m', 'Masculin'), ('f', 'Féminin')]
ROLE = [ ('admin', 'Admin'),('client', 'Client'), ('moderateur', 'Moderateur'), ('visiteur', 'Visiteur'),]

def photo_path(instance, filename):
    return f'customers/{instance.user.id}/{filename}'

class Profil(StandardModel):
    GENRE_CHOICES = [('M', 'Masculin'), ('F', 'Féminin')]

    # Remplacement par settings.AUTH_USER_MODEL
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profil_user', verbose_name=_("Profil utilisateur"))
    genre = models.CharField(max_length=1, choices=GENRE_CHOICES, blank=True, verbose_name=_("Genre"))
    role = models.CharField(max_length=100, choices=ROLE, blank=True, verbose_name=_("Rôle"))
    photo = models.ImageField(upload_to=photo_path, null=True, blank=True, verbose_name=_("Photo"))
    
    telephone = models.CharField(max_length=20, blank=True, verbose_name=_("Téléphone"))
    date_naissance = models.DateField(null=True, blank=True, verbose_name=_("Date de naissance"))
    est_actif = models.BooleanField(default=True, verbose_name=_("Actif"))

    class Meta:
        verbose_name = 'Profil Client'
        verbose_name_plural = 'Profils Clients'

    def __str__(self):
        return f"Profil de {self.user.email}"
    

User = get_user_model()

@receiver(post_save, sender=User)
def create_user_profil(sender, instance, created, **kwargs):
    if created:
        Profil.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profil(sender, instance, created, **kwargs):
    if hasattr(instance, 'profil_user'):
        instance.profil_user.save()