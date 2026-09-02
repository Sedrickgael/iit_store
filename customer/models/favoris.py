from django.db import models
from base.utils.models import StandardModel
from django.utils.translation import gettext_lazy as _


class Favoris(StandardModel):
    profil = models.ForeignKey('customer.Profil', on_delete=models.CASCADE, related_name='like_user', verbose_name=_("Profil utilisateur"))
    product = models.ForeignKey('vendor.Produit', on_delete=models.CASCADE, related_name='like_produit', verbose_name=_("Produit"))

    class Meta:
        verbose_name = 'Favori'
        verbose_name_plural = 'Favoris'
        unique_together = ('profil', 'product') 

    def __str__(self):
        return f"{self.profil.username} - {self.product}"