from django.db import models
from django.utils import timezone

from phonenumber_field.modelfields import PhoneNumberField


class User(models.Model):
    nick = models.CharField(max_length=30)
    password_hash = models.CharField(max_length=30, null=True)
    phone_number = PhoneNumberField(null=False, blank=False)
    allergies = models.JSONField(null=True)
    card_number = models.IntegerField(null=True)  # 12


class Heatmap(models.Model):
    date = models.DateTimeField(default=timezone.localtime)
    heat_points = models.JSONField(null=True)


class Machine(models.Model):
    name = models.CharField(max_length=30)
    start_date = models.DateTimeField(default=timezone.localtime)
    end_date = models.DateTimeField(default=timezone.localtime)
    service_date = models.DateTimeField(default=timezone.localtime)


class StoreCategories(models.Model):
    name = models.CharField(max_length=30)


class StoreProduct(models.Model):
    name = models.CharField(max_length=30)
    category = models.ForeignKey(StoreCategories, on_delete=models.SET_NULL, null=True)
    allergens = models.JSONField(null=True)
    price = models.FloatField()


class FactoryCategories(models.Model):
    name = models.CharField(max_length=30)


class FactoryProduct(models.Model):
    name = models.CharField(max_length=30)
    category = models.ForeignKey(FactoryCategories, on_delete=models.SET_NULL, null=True)


class StatStore(models.Model):
    product_count = models.IntegerField()
    product = models.ForeignKey(StoreProduct, on_delete=models.SET_NULL, null=True)
    category = models.ForeignKey(StoreCategories, on_delete=models.SET_NULL, null=True)
    date = models.DateTimeField(default=timezone.localtime)


class StatFactory(models.Model):
    count = models.IntegerField()
    machine = models.ForeignKey(Machine, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(FactoryProduct, on_delete=models.SET_NULL, null=True)
    category = models.ForeignKey(FactoryCategories, on_delete=models.SET_NULL, null=True)
    serial_num = models.IntegerField()
    date = models.DateTimeField(default=timezone.localtime)


class StoreShopping(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    amount = models.IntegerField()
    date = models.DateTimeField(default=timezone.localtime)
