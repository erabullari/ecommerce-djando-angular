# Generated by Django 5.0.6 on 2024-05-21 09:35

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('agent', '0001_initial'),
        ('product', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Counter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10)),
                ('value', models.IntegerField()),
            ],
            options={
                'verbose_name': 'counter',
                'verbose_name_plural': 'counters',
                'db_table': 'itw_counter',
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.IntegerField()),
                ('code_year', models.IntegerField()),
                ('date_registered', models.DateField()),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to=settings.AUTH_USER_MODEL)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='agent.customer')),
            ],
            options={
                'verbose_name': 'order',
                'verbose_name_plural': 'orders',
                'db_table': 'itw_order',
            },
        ),
        migrations.CreateModel(
            name='OrderUnit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField()),
                ('price', models.FloatField()),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_units', to='order.order')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_units', to='product.product')),
            ],
            options={
                'verbose_name': 'order unit',
                'verbose_name_plural': 'order units',
                'db_table': 'itw_order_unit',
            },
        ),
    ]