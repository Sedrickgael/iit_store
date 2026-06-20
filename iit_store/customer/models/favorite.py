from base.utils.models.standard_model import StandardModel
from django.db import models
from django.utils.translation import gettext_lazy as _

class Favorite(StandardModel):
    product = models.ForeignKey('vendor.Product', on_delete=models.CASCADE, related_name='favorites')
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='favorites')
    
    class Meta:
        verbose_name = _("Favorite")
        verbose_name_plural = _("Favorites")
        unique_together = ('product', 'user')  # Ensure a user can only favorite a product once
        
    def __str__(self):
        return f"{self.user.username} - {self.product.name}"