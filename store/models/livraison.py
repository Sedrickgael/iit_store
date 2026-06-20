from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from base.utils.models.standard_model import StandardModel
from cities_light.models import City, Region, Country


class Livraison(StandardModel):
    """
    Modele livraison
    """

    class StatutChoices(models.TextChoices):
        EN_ATTENTE  = "en_attente", _("En attente")
        EXPEDIE = "expedie", _("Expédié")
        EN_TRANSIT = "en_transit", _("En transit")
        LIVRE = "livre", _("Livré")
        ECHEC = "echec", _("Échec de livraison")

    class Meta:
        verbose_name  = "Livraison"
        verbose_name_plural = "Livraisons"

    order_id = models.OneToOneField(
        "store.Commande",
        on_delete=models.CASCADE,
        related_name="livraison_commande",
        verbose_name=_("Commande")
    )
    status = models.CharField(
        max_length=20,
        choices=StatutChoices.choices,
        default=StatutChoices.EN_ATTENTE,
        verbose_name=_("Statut de la livraison")
    )
    country = models.ForeignKey(
        Country,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        verbose_name=_("Pays")
    )
    city = models.ForeignKey(
        City,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        verbose_name=_("Ville")
    )
    address = models.TextField(verbose_name=_("Adresse précise"))
    tracking_number = models.CharField(
        max_length=100,
        blank=True,
        verbose_name=_("Numéro de suivi")
    )
    shipped_at = models.DateTimeField(
        null=True, blank=True,
        verbose_name=_("Date d'expédition")
    )
    expected_at = models.DateTimeField(
        null=True, blank=True,
        verbose_name=_("Date de livraison prévue")
    )
    delivered_at = models.DateTimeField(
        null=True, blank=True,
        verbose_name=_("Date de livraison effective")
    )
    slug = models.SlugField("Slug", blank=True)

    def __str__(self):
        return f"Livraison — {self.order_id}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"delivery-{self.order_id}")
        super().save(*args, **kwargs)