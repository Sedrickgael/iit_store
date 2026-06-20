from django.contrib import admin
from customer.models import Address, Favorite, Payment, Review, SavedPaymentMethod

# Register your models here.

admin.site.register(Address)
admin.site.register(Favorite)
admin.site.register(Payment)
admin.site.register(Review)
admin.site.register(SavedPaymentMethod)