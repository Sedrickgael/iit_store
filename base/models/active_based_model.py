from django.db import models
from django.utils.translation import gettext_lazy


class ActiveModel(models.Model):

    class Meta:
        abstract =True

    active = models.BooleanField(verbose_name=gettext_lazy("Statut"), default=True)
