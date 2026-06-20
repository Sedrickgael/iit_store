from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _ # pour la traduction multilanguage
from base.utils.models.standard_model import StandardModel
import uuid


class Commande(StandardModel):

    """
        Modele commande
    """

    class StatutChoices(models.TextChoices):
        EN_COURS = "en_cours",   _("En cours de livraison")
        EN_ATTENTE = "en_attente", _("En attente")
        CONFIRMEE = "confirmee",  _("Confirmée")
        ANNULEE = "annulee",    _("Annulée")
        LIVREE = "livree",     _("Livrée")

    class Meta: # cette class contient les meta donnees
        verbose_name = 'Commande' # verbose_name reprensente le nom du model
        verbose_name_plural = "Commandes"

    number = models.CharField(max_length=20, unique=True, blank=True, verbose_name=_("Numéro de commande"))
    destination = models.CharField(verbose_name=_("Adresse de livraison"))
    statut = models.CharField(max_length=100, choices=StatutChoices.choices, default=StatutChoices.EN_ATTENTE, verbose_name=_('Statut de la commande'))
    mode_reglement = models.ForeignKey("store.ModeDeReglement", on_delete=models.SET_NULL, null=True, blank=True, related_name="commandes", verbose_name=_("Mode de règlement"))
    slug = models.SlugField("Slug", blank=True)

    def __str__(self):
        return f"Commande {self.number}"

    def save(self, *args, **kwargs):
        if not self.number:
            self.number = f"CMD-{uuid.uuid4().hex[:8].upper()}"
        if not self.slug:
            self.slug = slugify(self.number)
        super().save(*args, **kwargs)


class LigneCommande(StandardModel):
    """
    Produits liés à une commande (quantité + prix)
    """

    class Meta:
        verbose_name = "Ligne de commande"
        verbose_name_plural = "Lignes de commande"

    order_id = models.ForeignKey(Commande, on_delete=models.CASCADE, related_name="lignes", verbose_name=_("Commande"))

    product_id = models.ForeignKey("vendor.Produit", on_delete=models.PROTECT, related_name="lignes_commande", verbose_name=_("Produit"))

    quantity = models.PositiveIntegerField(default=1, verbose_name=_("Quantité"))

    unit_price = models.DecimalField(max_digits=10,decimal_places=2,verbose_name=_("Prix unitaire"))

    slug = models.SlugField("Slug", blank=True)

    @property
    def sub_total(self):
        return self.quantity * self.unit_price

    def __str__(self):
        return f"{self.quantity}x {self.product} — {self.order}"