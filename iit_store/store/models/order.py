from base.utils.models.standard_model import StandardModel
from django.db import models
from django.utils.translation import gettext_lazy as _

class Order(StandardModel):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='orders')
    cart = models.OneToOneField('Cart', on_delete=models.CASCADE, related_name='order')
    total_price = models.DecimalField(_("Total Price"), max_digits=10, decimal_places=2)
    payment_method = models.OneToOneField('PaymentMethod', on_delete=models.CASCADE, related_name='order')
    
    class Meta:
        verbose_name = _("Order")
        verbose_name_plural = _("Orders")
        
    def __str__(self):
        return f"Order {self.id} for {self.user.username}"