from django.db import models
from base.utils.models import ProfilBase
from .profil import Profil


class Adresse(ProfilBase):
    TYPE_CHOICES = [
        ('domicile', 'Domicile'),
        ('bureau', 'Bureau'),
        ('autre', 'Autre'),
    ]

    profil = models.ForeignKey(Profil, on_delete=models.CASCADE, related_name='adress_user')
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='domicile')
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100, default='Côte d\'Ivoire')
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