from django.contrib.auth.models import User
from django.db import models
from base.models.utils.standard_model import StandardModel
from django.utils.translation import gettext_lazy as _


class MoyenPaiementModel(StandardModel):
    class Meta:
        verbose_name = 'Moyen de paiement'
        verbose_name_plural = 'Moyens de paiement'
 
    profil = models.ForeignKey("customer.Profil", on_delete=models.CASCADE, related_name ='moyens_paiement', verbose_name=_("Profil utilisateur"))
    type = models.ForeignKey("store.ModeDeReglement", on_delete=models.CASCADE, verbose_name=_("Type"), related_name="moyen_paiements")
    details = models.TextField(blank=True)
 
    def __str__(self):
        return f"{self.profil.username} - {self.type.name}"
 