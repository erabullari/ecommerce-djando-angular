# Generated by Django 5.0.6 on 2024-05-21 12:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0002_orderunit_deleted'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
    ]
