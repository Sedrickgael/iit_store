from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _



class Profil(AbstractUser):
    """
    Modèle utilisateur personnalisé (AUTH_USER_MODEL = "customer.Profil").
    Hérite d'AbstractUser : username, password, first_name, last_name, is_active…
    """

    class Meta:
        verbose_name = "Profil Client"
        verbose_name_plural = "Profils Clients"

    
    def __str__(self):
        return f"{self.email} - {self.first_name}"
    