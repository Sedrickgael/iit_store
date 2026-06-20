from base.utils.models.standard_model import StandardModel
from django.db import models
from django.utils.translation import gettext_lazy as _

class Address(StandardModel):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='addresses')
    # django-cities-light package provides a City model that we can use to link to our Address model
    city = models.OneToOneField('cities_light.City', on_delete=models.SET_NULL, null=True, blank=True, related_name='address')
    subregion = models.OneToOneField('cities_light.SubRegion', on_delete=models.SET_NULL, null=True, blank=True, related_name='address')
    street_address = models.CharField(_("Street Address"), max_length=255)
    
    class Meta:
        verbose_name = _("Address")
        verbose_name_plural = _("Addresses")
        
    def __str__(self):
        return f"{self.street_address}, {self.city}, {self.subregion}"