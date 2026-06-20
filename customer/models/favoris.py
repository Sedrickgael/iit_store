from django.db import models
from base.utils.models import StandardModel
from .profil import Profil


class Favoris(StandardModel):
    profil_id = models.ForeignKey(Profil, on_delete=models.CASCADE, related_name='like_user')
    product_id = models.ForeignKey('store.Product', on_delete=models.CASCADE, related_name='like_produit')

    class Meta:
        verbose_name = 'Favori'
        verbose_name_plural = 'Favoris'
        unique_together = ('profil_id', 'product_id') 

    def __str__(self):
        return f"{self.profil_id.user.username} - {self.product_id}"