from django.db import models
from django.utils.translation import gettext_lazy as _
from base.models.utils.standard_model import StandardModel


class Favoris(StandardModel):
    profil = models.ForeignKey('customer.Profil', on_delete=models.CASCADE, related_name='like_user', verbose_name=_("Profil utilisateur"))
    product = models.ForeignKey('store.Product', on_delete=models.CASCADE, related_name='like_produit', verbose_name=_("Produit"))

    class Meta:
        verbose_name = 'Favori'
        verbose_name_plural = 'Favoris'
        unique_together = ('profil', 'product') 

    def __str__(self):
        return f"{self.profil.user.username} - {self.product}"