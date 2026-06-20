from django.db import models
from base.utils.models import User, ProfilBase


GENRE_CHOICES = [('M', 'Masculin'), ('F', 'Féminin')]
ROLE = [ ('admin', 'Admin'),('utilisateur', 'Utilisateur'),('visiteur', 'Visiteur'),]


def photo_path(instance, filename):
    return f'customers/{instance.user.id}/{filename}'


class Profil(ProfilBase):  # hérite telephone, date_naissance, est_actif
    GENRE_CHOICES = [('M', 'Masculin'), ('F', 'Féminin')]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profil_user')
    genre = models.CharField(max_length=1, choices=GENRE_CHOICES, blank=True)
    role = models.CharField(max_length=100, role=ROLE, blank=True)
    photo = models.ImageField(upload_to=photo_path, null=True, blank=True)

    class Meta:
        verbose_name = 'Profil Client'
        verbose_name_plural = 'Profils Clients'

    def __str__(self):
        return f"Profil de {self.user.username}"