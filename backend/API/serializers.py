from rest_framework import serializers

from .models import User, Heatmap, StoreProduct, FactoryProduct, Machine, StoreCategories, FactoryCategories, StatStore, \
    StatFactory, StoreShopping


# class PersonSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Person
#         fields = ('id', 'first_name', 'last_name')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'nick', 'password_hash', 'phone_number', 'allergies', 'card_number')


class HeatmapSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Heatmap
        fields = ('id', 'date', 'heat_points')


class StoreProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = StoreProduct
        fields = ('id', 'name', 'category', 'allergens', 'price')


class FactoryProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FactoryProduct
        fields = ('id', 'name', 'category')


class MachineSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Machine
        fields = ('id', 'name', 'start_date', 'end_date', 'service_date')


class StoreCategoriesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = StoreCategories
        fields = ('id', 'name')


class FactoryCategoriesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FactoryCategories
        fields = ('id', 'name')


class StatStoreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = StatStore
        fields = ('id', 'product_count', 'category', 'date')


class StatFactorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = StatFactory
        fields = ('id', 'count', 'machine', 'category', 'serial_num', 'date')


class StoreShoppingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = StoreShopping
        fields = ('id', 'user', 'amount', 'date')
