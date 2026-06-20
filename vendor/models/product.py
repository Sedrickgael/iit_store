from base.utils.models.standard_model import StandardModel
from django.db import models
from django.utils.translation import gettext_lazy as _

class Product(StandardModel):
    id = models.AutoField(_("ID"), primary_key=True)
    name = models.CharField(_("Name"), max_length=255)
    description = models.TextField(_("Description"))
    price = models.DecimalField(_("Price"), max_digits=10, decimal_places=2)
    vendor = models.ForeignKey('Vendor', verbose_name=_("Vendor"), on_delete=models.CASCADE)
    category = models.ForeignKey('Category', verbose_name=_("Category"), on_delete=models.CASCADE)
    tags = models.ManyToManyField('Tag', verbose_name=_("Tags"), blank=True)
    
    class Meta:
        verbose_name = _("Product")
        verbose_name_plural = _("Products")
        
    def __str__(self):
        return self.name