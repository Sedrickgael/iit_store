from django.db import models
from base.utils.models import StandardModel
from .profil import Profil


class Avis(StandardModel):
    profil_id = models.ForeignKey(Profil, on_delete=models.CASCADE, related_name='avis_user')
    product_id = models.ForeignKey('vendor.Produit', on_delete=models.CASCADE, related_name='avis_produit')
    note = models.PositiveSmallIntegerField()  # 1 à 5
    commentaire = models.TextField(blank=True)
    is_approved = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Avis'
        verbose_name_plural = 'Avis'
        unique_together = ('profil_id', 'product_id')  # un seul avis par client par produit

    def __str__(self):
        return f"Avis de {self.profil_id.user.username} - {self.note}/5"