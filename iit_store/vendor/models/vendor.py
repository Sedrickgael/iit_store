from base.utils.models.standard_model import StandardModel
from django.db import models
from django.utils.translation import gettext_lazy as _

class Vendor(StandardModel):
    name = models.CharField(_("Name"), max_length=255)
    description = models.TextField(_("Description"), blank=True)
    website = models.URLField(_("Website"), blank=True)
    
    class Meta:
        verbose_name = _("Vendor")
        verbose_name_plural = _("Vendors")
        
    def __str__(self):
        return self.name