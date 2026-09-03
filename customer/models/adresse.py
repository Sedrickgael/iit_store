from django.db import models
from base.utils.models.standard_model import StandardModel
from cities_light.models import City, Country, Region
from django.utils.translation import gettext_lazy as _


class Adresse(StandardModel):
    TYPE_CHOICES = [
        ('domicile', 'Domicile'),
        ('bureau', 'Bureau'),
        ('autre', 'Autre'),
    ]

    profil = models.ForeignKey('customer.Profil', on_delete=models.CASCADE, related_name='adress_user',verbose_name=_("Profil Utilisateur"))
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='domicile', verbose_name=_("Type d'adresse"))
    street = models.CharField(max_length=255, verbose_name=_("Rue"))
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_("Pays"))
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_("Département / Région"))
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_("Ville"))
    is_default = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Adresse'
        verbose_name_plural = 'Adresses'

    def __str__(self):
        return f"{self.type} - {self.street}, {self.city}"
    
    def save(self, *args, **kwargs):
        if self.is_default:
            # On remet toutes les autres adresses du profil à False
            Adresse.objects.filter(profil=self.profil).update(is_default=False)
        super().save(*args, **kwargs)