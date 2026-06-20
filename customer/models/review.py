from base.utils.models.standard_model import StandardModel
from django.db import models
from django.utils.translation import gettext_lazy as _

class Review(StandardModel):
    product = models.ForeignKey('vendor.Product', on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveIntegerField(_("Rating"), choices=[(i, str(i)) for i in range(1, 6)])
    comment = models.TextField(_("Comment"), blank=True)
    
    class Meta:
        verbose_name = _("Review")
        verbose_name_plural = _("Reviews")
        unique_together = ('product', 'user')  # Ensure a user can only review a product once
        
    def __str__(self):
        return f"{self.user.username} - {self.product.name} ({self.rating} stars)"