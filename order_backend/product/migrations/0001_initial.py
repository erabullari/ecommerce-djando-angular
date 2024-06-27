# Generated by Django 5.0.6 on 2024-05-21 09:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ProductCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': 'product category',
                'verbose_name_plural': 'product categories',
                'db_table': 'itw_product_category',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('default_price', models.FloatField()),
                ('description', models.CharField(max_length=50)),
                ('deleted', models.BooleanField(default=False)),
                ('categories', models.ManyToManyField(blank=True, related_name='categories', to='product.productcategory')),
            ],
            options={
                'verbose_name': 'product',
                'verbose_name_plural': 'products',
                'db_table': 'itw_product',
            },
        ),
    ]
