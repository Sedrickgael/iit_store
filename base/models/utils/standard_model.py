from django.db import models
from django.utils.translation import gettext_lazy as _


class StandardModel(models.Model):

    class Meta:
     
        abstract = True

    active = models.BooleanField(default=True)
    last_updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)  # ← déjà là !
