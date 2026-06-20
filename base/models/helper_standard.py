from base.models.datetime_model import DateTimeModel
from base.models.active_based_model import ActiveModel


class StandardModel(DateTimeModel, ActiveModel):

    class Meta:
        abstract = True
