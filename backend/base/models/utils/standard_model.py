from django.db import models
from django.utils.translation import gettext_lazy as _


class StandardModel(models.Model):
    """
    Abstract base model that provides common fields for all models.
    """
    class Meta:
            abstract = True

    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Created At"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Updated At"))
    is_active = models.BooleanField(default=True, verbose_name=_("Is Active"))
    

   