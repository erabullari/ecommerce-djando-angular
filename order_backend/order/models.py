from django.utils import timezone

from django.db.models import F
from django.contrib.auth.models import User
from django.db import models
from django.db.models import Sum

from agent.models import Customer
from product.models import Product


# Create your models here.

class Order(models.Model):
    class Meta:
        db_table = 'itw_order'
        verbose_name = 'order'
        verbose_name_plural = 'orders'

    code = models.IntegerField()
    code_year = models.IntegerField()
    date_registered = models.DateField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='orders')
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    deleted = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.pk:  # If it's a new order
            #  update the code based on the counter
            current_year = timezone.now().year
            counter, created = Counter.objects.get_or_create(name=f'order_code_counter_{current_year}',defaults={'value': 1})

            if created:  # kont nese counter esht krijuar , nese po ath jemi ne vit tjr dhe fillojnnga  1
                counter.value = 1

            self.code = counter.value
            self.code_year = current_year
            counter.value += 1
            counter.save()

        super().save(*args, **kwargs)

    def get_order_code(self):
        return f"P-{self.code}-{self.code_year}"

    def _str_(self):
        customer_name = f"{self.customer.first_name} {self.customer.last_name}" if self.customer else "Unknown Customer"
        return f"Order {self.code} - Customer: {customer_name}"


class OrderUnit(models.Model):
    class Meta:
        db_table = 'itw_order_unit'
        verbose_name = 'order unit'
        verbose_name_plural = 'order units'

    amount = models.FloatField()
    price = models.FloatField()
    order = models.ForeignKey(Order, related_name="order_units", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name="order_units", on_delete=models.CASCADE)


class Counter(models.Model):
    class Meta:
        db_table = 'itw_counter'
        verbose_name = 'counter'
        verbose_name_plural = 'counters'

    name = models.CharField(max_length=50)
    value = models.IntegerField()




