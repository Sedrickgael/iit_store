from django.db import models
from base.utils.models import ProfilBase
from cities_light.models import City, Country
from django.utils.translation import gettext_lazy as _


class Adresse(ProfilBase):
    TYPE_CHOICES = [
        ('domicile', 'Domicile'),
        ('bureau', 'Bureau'),
        ('autre', 'Autre'),
    ]

    profil = models.ForeignKey('customer.Profil', on_delete=models.CASCADE, related_name='adress_user',verbose_name=_("Profil Utilisateur"))
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='domicile', verbose_name=_("Type d'adresse"))
    street = models.CharField(max_length=255, verbose_name=_("Rue"))
    country = models.ForeignKey( Country, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_("Pays"), default='Côte d\'Ivoire',max_length=100)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_("Ville"), max_length=100)
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