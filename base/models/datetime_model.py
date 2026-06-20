from django.db import models
from django.utils.translation import gettext_lazy


class DateTimeModel(models.Model):

    class Meta:
        abstract =True

    created_at = models.DateTimeField(verbose_name=gettext_lazy("Date de création"), auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name=gettext_lazy("Date de dernière modification"), auto_now=True)