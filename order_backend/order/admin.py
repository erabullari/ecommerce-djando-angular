from django.contrib import admin

from order.models import Order, OrderUnit

# Register your models here.

admin.site.register(Order)
admin.site.register(OrderUnit)
