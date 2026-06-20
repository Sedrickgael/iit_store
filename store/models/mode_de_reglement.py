# mode_de_reglement.py
from django.db import models
from django.utils.translation import gettext_lazy as _
from base.utils.models.standard_model import StandardModel
from django.utils.text import slugify

class ModeDeReglement(StandardModel):
    """
    Modele mode de reglement
    """

    class TypeChoices(models.TextChoices):
        CARTE = "carte", _("Carte bancaire")
        MOBILE_MONEY = "mobile_money", _("Mobile Money")
        ESPECES = "especes", _("Espèces")
        VIREMENT = "virement", _("Virement bancaire")

    class Meta:
        verbose_name = "Mode de règlement"
        verbose_name_plural = "Modes de règlement"

    name = models.CharField(max_length=100, verbose_name=_("Nom"))
    type_paiement = models.CharField(max_length=20,choices=TypeChoices.choices,verbose_name=_("Type de paiement")
    )
    is_active = models.BooleanField(default=True, verbose_name=_("Actif"))
    slug = models.SlugField("Slug", blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)