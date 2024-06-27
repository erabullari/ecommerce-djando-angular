from django.db import transaction
from django.db.models import Count
from django.utils import timezone
from rest_framework import serializers

from .models import Order, OrderUnit


class OrderUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderUnit
        fields = ['amount', 'price', 'product', 'order']
        extra_kwargs = {'order': {'required': False}}


class OrderUpdateSerializer(serializers.ModelSerializer):
    order_units = OrderUnitSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'code', 'code_year', 'date_registered', 'customer', 'creator', 'deleted', 'order_units']
        extra_kwargs = {'code': {'required': False}, 'code_year': {'required': False},'date_registered': {'required': False}}

    def create(self, validated_data):

        order_units = validated_data.pop('order_units')

        if 'date_registered' not in validated_data:
            validated_data['date_registered'] = timezone.now().date()

        order = Order.objects.create(**validated_data)

        for ou in order_units:
            OrderUnit.objects.create(order=order, product=ou['product'], amount=ou['amount'], price=ou['price'])

        return order

    def update(self, instance, validated_data):
        order_units_data = validated_data.pop('order_units')

        with transaction.atomic():
            # Update order fields
            instance.customer = validated_data.get('customer', instance.customer)
            instance.creator = validated_data.get('creator', instance.creator)
            instance.deleted = validated_data.get('deleted', instance.deleted)
            instance.save()

            # Track which order units were provided in the update data
            order_unit_ids = [ou['id'] for ou in order_units_data if 'id' in ou]

            # Delete order units not in the update data
            for order_unit in instance.order_units.all():
                if order_unit.id not in order_unit_ids:
                    order_unit.delete()

            # Create or update order units
            for ou in order_units_data:
                if 'id' in ou:
                    order_unit = OrderUnit.objects.get(id=ou['id'], order=instance)
                    order_unit.product = ou.get('product', order_unit.product)
                    order_unit.amount = ou.get('amount', order_unit.amount)
                    order_unit.price = ou.get('price', order_unit.price)
                    order_unit.save()
                else:
                    OrderUnit.objects.create(order=instance, product=ou['product'], amount=ou['amount'],
                                             price=ou['price'])

        return instance


class CounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Count
        fields = ['id', 'name', 'value']
