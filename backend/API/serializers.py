from rest_framework import serializers

from .models import User, Heatmap, StoreProduct, FactoryProduct, Machine


# class PersonSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Person
#         fields = ('id', 'first_name', 'last_name')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'nick', 'phone_number', 'allergies')


class HeatmapSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Heatmap
        fields = ('id', 'date')


class StoreProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = StoreProduct
        fields = ('name', 'category')


class FactoryProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FactoryProduct
        fields = ('name', 'category')


class MachineSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Machine
        fields = 'name'
