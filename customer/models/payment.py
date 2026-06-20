from base.utils.models.standard_model import StandardModel
from django.db import models
from django.utils.translation import gettext_lazy as _

class Payment(StandardModel):
    order = models.OneToOneField("store.Order", on_delete=models.CASCADE, related_name='payment')
    amount = models.DecimalField(_("Amount"), max_digits=10, decimal_places=2)
    method = models.ForeignKey("store.PaymentMethod", on_delete=models.SET_NULL, null=True, related_name='payments')
    status = models.CharField(_("Status"), max_length=20, choices=[('pending', 'Pending'), ('completed', 'Completed'), ('failed', 'Failed')], default='pending')
    
    class Meta:
        verbose_name = _("Payment")
        verbose_name_plural = _("Payments")
        
    def __str__(self):
        return f"Payment for Order #{self.order.id} - {self.status.capitalize()}"