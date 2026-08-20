from django.db import models
from base.models.utils.standard_model import StandardModel
from django.utils.translation import gettext_lazy as _

class Avis(StandardModel):
    profil = models.ForeignKey('customer.Profil', on_delete=models.CASCADE, related_name='avis_user', verbose_name=_("Profil utilisateur"))
    product = models.ForeignKey('vendeur.Produit', on_delete=models.CASCADE, related_name='avis_produit', verbose_name=_("produit"))
    note = models.PositiveSmallIntegerField(verbose_name=_("Note du produit"))  
    commentaire = models.TextField(blank=True, verbose_name=_("Commentaire utilisateur"))
    is_approved = models.BooleanField(default=False, verbose_name=_("Approbation"))

    class Meta:
        verbose_name = 'Avis'
        verbose_name_plural = 'Avis'
        unique_together = ('profil', 'product')  # un seul avis par client par produit

    def __str__(self):
        return f"Avis de {self.profil.user.username} - {self.note}/5"