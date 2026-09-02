from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


def photo_path(instance, filename):
    return f'customers/{instance.pk}/{filename}'


class Profil(AbstractUser):
    """
    Modèle utilisateur personnalisé (AUTH_USER_MODEL = "customer.Profil").
    Hérite d'AbstractUser : username, password, first_name, last_name, is_active…
    """

    email = models.EmailField(unique=True, verbose_name=_("Email"))
    genre = models.CharField(max_length=1, choices=[('M', 'Masculin'), ('F', 'Féminin')], blank=True, verbose_name=_("Genre"))
    role = models.CharField(
        max_length=100,
        choices=[
            ('admin', 'Admin'),
            ('client', 'Client'),
            ('moderateur', 'Moderateur'),
            ('visiteur', 'Visiteur'),
        ],
        blank=True,
        verbose_name=_("Rôle"),
    )
    photo = models.ImageField(upload_to=photo_path, null=True, blank=True, verbose_name=_("Photo"))

    telephone = models.CharField(max_length=20, blank=True, verbose_name=_("Téléphone"))
    date_naissance = models.DateField(null=True, blank=True, verbose_name=_("Date de naissance"))
    est_actif = models.BooleanField(default=True, verbose_name=_("Actif"))

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = 'Profil Client'
        verbose_name_plural = 'Profils Clients'

    def __str__(self):
        return f"Profil de {self.username}"