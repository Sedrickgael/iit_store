
from django.db import models
from django.utils.translation import gettext_lazy as _
from base.models.utils.standard_model import StandardModel


class Etiquette(StandardModel):
    """"""
    
    class Meta:
        verbose_name = "Etiquette"          # singulier dans l'admin
        verbose_name_plural = "Etiquettes"  # pluriel dans l'admin

    name = models.CharField(max_length=20, verbose_name=_("Nom"))

    # Champ texte long — la description de l'étiquette
    description = models.TextField(verbose_name=_("Description"))

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)