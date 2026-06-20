from django.db import models
from django.utils.translation import gettext_lazy as _ # pour la traduction multilanguage
from base.utils.models.standard_model import StandardModel
from store.models.ligne_de_commande import LigneCommande
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

    profil = models.ForeignKey('customer.Profil', on_delete=models.CASCADE, related_name='adress_user',verbose_name=_("Profil Utilisateur"))
    number = models.CharField(max_length=20, unique=True, blank=True, verbose_name=_("Numéro de commande"))
    destination = models.CharField(verbose_name=_("Adresse de livraison"))
    statut = models.CharField(max_length=100, choices=StatutChoices.choices, default=StatutChoices.EN_ATTENTE, verbose_name=_('Statut de la commande'))
    mode_reglement = models.ForeignKey("store.ModeDeReglement", on_delete=models.SET_NULL, null=True, blank=True, related_name="commandes", verbose_name=_("Mode de règlement"))
   

    def __str__(self):
        return f"Commande {self.number}"

    def save(self, *args, **kwargs):
        if not self.number:
            self.number = f"CMD-{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)

    @property
    def total(self):
        items = LigneCommande.objects.filter(order=self.id)
        total = 0
        for item in items:
            total += item.sub_total()
        return total 