# Generated by Django 5.0.6 on 2024-05-21 12:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0003_order_deleted'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderunit',
            name='deleted',
        ),
    ]
