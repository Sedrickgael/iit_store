from django.db import models
from django.utils.translation import gettext_lazy as _ # pour la traduction multilanguage
from base.utils.models.standard_model import StandardModel
from cities_light.models import City, Country

class Livraison(StandardModel):

    """
        Modele livraison
    """

    class StatutChoices(models.TextChoices):
        EN_ATTENTE  = "en_attente",  _("En attente")
        EXPEDIE     = "expedie",     _("Expédié")
        EN_TRANSIT  = "en_transit",  _("En transit")
        LIVRE       = "livre",       _("Livré")
        ECHEC       = "echec",       _("Échec de livraison")

    class Meta: # cette class contient les meta donnees
        verbose_name = 'Livraison' # verbose_name reprensente le nom du model
        verbose_name_plural = "Livraisons"

    status = models.CharField(max_length=100, choices=StatutChoices.choices, default = StatutChoices.EN_ATTENTE, verbose_name=_('Statut de la livraison'))
    address = models.TextField(max_length=100, verbose_name=_("Adresse de livraison"))
    # Localisation via cities_light
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_("Pays"))
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, blank=True,)
    tracking_number = models.CharField( max_length=100, blank=True, verbose_name=_("Numéro de suivi"))
    shipped_at = models.DateTimeField(null=True, blank=True, verbose_name=_("Date d'expédition"))
    expected_at = models.DateTimeField(null=True, blank=True, verbose_name=_("Date de livraison prévue"))
    delivered_at = models.DateTimeField(null=True, blank=True,verbose_name=_("Date de livraison effective"))
    order = models.OneToOneField( "store.Commande",on_delete=models.CASCADE,related_name="livraison_commande",verbose_name=_("Commande"))

    def __str__(self):
        return f"Livraison — {self.order}"

