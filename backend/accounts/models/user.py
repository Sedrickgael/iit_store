from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from base.models.utils.standard_model import StandardModel

class Utilisateur(StandardModel, AbstractUser):
    """
    Class Utilisateur qui hérite de AbstractUser pour ajouter des champs supplémentaires.
    """
    class Meta:
        verbose_name = _("Utilisateur")
        verbose_name_plural = _("Utilisateurs")

        email = models.EmailField(
        _("Adresse email"),
        unique=True,
        )
        username = None
        USERNAME_FIELD = "email"
        REQUIRED_FIELDS = []

        def __str__(self):
            return f"{self.email} - {self.first_name} - {self.last_name}"
