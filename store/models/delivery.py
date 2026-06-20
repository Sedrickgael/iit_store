from base.utils.models.standard_model import StandardModel
from django.db import models
from django.utils.translation import gettext_lazy as _

class Delivery(StandardModel):
    id = models.AutoField(primary_key=True)
    order = models.OneToOneField('Order', on_delete=models.CASCADE, related_name='delivery')
    address = models.CharField(_("Address"), max_length=255)
    delivery_date = models.DateField(_("Delivery Date"))
    status = models.CharField(_("Status"), max_length=50, default='Pending')
    
    class Meta:
        verbose_name = _("Delivery")
        verbose_name_plural = _("Deliveries")
        
    def __str__(self):
        return f"Delivery for Order {self.order.id} to {self.address}"