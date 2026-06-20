from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = 'Utilisateur'
        verbose_name_plural = 'Utilisateurs'


class ProfilBase(models.Model):
    """Modèle ProfilBase"""
    telephone = models.CharField(max_length=20, blank=True)
    date_naissance = models.DateField(null=True, blank=True)
    est_actif = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True 

    def __str__(self):
        return f"Profil {self.pk}"