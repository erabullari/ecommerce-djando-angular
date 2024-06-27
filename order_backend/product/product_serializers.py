from rest_framework import serializers
from rest_framework.relations import StringRelatedField

from product.models import Product, ProductCategory


class ProductSerializer(serializers.ModelSerializer):
    categories = StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'default_price', 'categories', 'description']


class ProductWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'default_price', 'categories', 'description']

    def update(self, instance, validated_data):
        categories_data = validated_data.pop('categories', None)

        instance.name = validated_data.get('name', instance.name)
        instance.default_price = validated_data.get('default_price', instance.default_price)
        instance.description = validated_data.get('description', instance.description)

        instance.save()

        if categories_data is not None:
            instance.categories.clear()

            for category_data in categories_data:
                category, created = ProductCategory.objects.get_or_create(name=category_data)
                instance.categories.add(category)

        return instance


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'name']
