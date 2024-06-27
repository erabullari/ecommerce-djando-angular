from django.db import models


class Customer(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    company_name = models.CharField(max_length=50)
    deleted = models.BooleanField(default=False)

    class Meta:
        db_table = 'itw_customer'
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'

    def __str__(self):
        return f"{self.first_name} {self.last_name} {f'{self.company_name}'}"
