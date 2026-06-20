from base.utils.models.standard_model import StandardModel
from django.db import models
from django.utils.translation import gettext_lazy as _

class SavedPaymentMethod(StandardModel):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='payment_methods')
    method = models.ForeignKey("store.PaymentMethod", on_delete=models.CASCADE, related_name='saved_methods')
    credentials = models.JSONField(_("Payment Credentials"), help_text=_("Store necessary credentials for the payment method, such as card number (masked), expiration date, etc."))
    
    class Meta:
        verbose_name = _("Saved Payment Method")
        verbose_name_plural = _("Saved Payment Methods")
        
    def __str__(self):
        return f"{self.user.username} - {self.method.name}"