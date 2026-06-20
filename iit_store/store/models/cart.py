from base.utils.models.standard_model import StandardModel
from django.db import models
from django.utils.translation import gettext_lazy as _

class Cart(StandardModel):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='carts')
    products = models.ManyToManyField('vendor.Product', through='CartItem', related_name='carts')
    
    class Meta:
        verbose_name = _("Cart")
        verbose_name_plural = _("Carts")
        
    def __str__(self):
        return f"Cart {self.id} for {self.user.username}"