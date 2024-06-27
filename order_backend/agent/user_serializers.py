from django.contrib.auth.models import Group, User
from rest_framework import serializers
from rest_framework.fields import CharField


class UserReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'id')


class UserWriteSerializer(serializers.ModelSerializer):
    password = CharField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name','id')

    def create(self, validated_data):
        # Krijo user (shitesin)
        password = validated_data.get('password', None)
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        # Fute ne grupin shites
        seller_group = Group.objects.get(name='Shites')
        seller_group.user_set.add(user)
        return user

    def update(self, instance, validated_data):
        password = validated_data.get('password', None)
        if password:
            validated_data.pop('password')

        user = instance
        if password:
            user.set_password(password)
            user.save()

        return super(UserWriteSerializer, self).update(instance, validated_data)
