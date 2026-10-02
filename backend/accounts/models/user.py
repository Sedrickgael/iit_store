from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class Utilisateur(AbstractUser):
    """
    Modèle utilisateur personnalisé avec connexion par Email.
    
    """
    class Meta:
            verbose_name = _("Utilisateur")
            verbose_name_plural = _("Utilisateurs")
    
    email = models.EmailField(
        _("Adresse email"),
        unique=True,
    )

    # Identifiant de connexion principal
    USERNAME_FIELD = "email"
    # Username est demandé lors du createsuperuser pour le manager natif
    REQUIRED_FIELDS = ["username"]


    def __str__(self):
       return f"{self.email} ({self.username})"