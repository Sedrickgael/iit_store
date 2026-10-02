from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    """
    Modèle utilisateur 
    """
    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
        
    email = models.EmailField(
        _("Adresse email"),
        unique=True,
    )
    
    # Identifiant de connexion principal
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]


    def __str__(self):
       return f"{self.email} ({self.username})"
    