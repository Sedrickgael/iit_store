from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings 
from base.models.utils.standard_model import StandardModel

class Profil(StandardModel):
    """
    Modèle d'extension du profil utilisateur (OneToOne).
    """

    class Meta:
        verbose_name = _("Profil Client")
        verbose_name_plural = _("Profils Clients")
    
    # 1. Relation unique OneToOne avec un related_name cohérent
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='profil', 
        verbose_name=_("Utilisateur")
    )
    
    # 2. Champs spécifiques au profil (pas d'email dupliqué)
    genre = models.CharField(
        max_length=1, 
        choices=[('M', _('Masculin')), ('F', _('Féminin'))], 
        blank=True, 
        verbose_name=_("Genre")
    )
    telephone = models.CharField(max_length=20, blank=True, verbose_name=_("Téléphone"))
    date_naissance = models.DateField(null=True, blank=True, verbose_name=_("Date de naissance"))

    def __str__(self):
        # On accède au prénom de l'utilisateur relié de manière sécurisée
        return f"Profil de {self.user.get_full_name() or self.user.username}"