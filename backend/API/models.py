from platform import machine
from django.db import models
from django.utils import timezone

from phonenumber_field.modelfields import PhoneNumberField
import datetime


class User(models.Model):
    nick = models.CharField(max_length=30)
    phone_number = PhoneNumberField(null=False, blank=False, unique=True)
    allergies = models.JSONField(null=True)
    user_cat = models.IntegerField()


class Heatmap(models.Model):
    date: datetime.datetime = models.DateTimeField(default=timezone.localtime)
    heat_points = models.JSONField()


class StoreProduct(models.Model):
    name = models.CharField(max_length=30)
    category = models.CharField(max_length=30)
    allergies = models.JSONField(null=True)
    price = models.FloatField()


class FactoryProduct(models.Model):
    name = models.CharField(max_length=30)
    category = models.CharField(max_length=30)
    serial_num = models.IntegerField()


class Machine(models.Model):
    name = models.CharField(max_length=30)
    id = models.ForeignKey(machine, on_delete= models.SET_NULL, NULL = True)
    workingtime: datetime.datetime = models.DateTimeField(default=timezone.localtime)
    end_date = models.DateField()
    service_date = models.DateField()
    

class StoreCategories(models.Model):
    name = models.CharField(max_length=30)
    demand = models.IntegerField()



class FactoryCategory(models.Model):
    name = models.CharField(max_length=30)


class StatStore(models.Model):
    product_count = models.IntegerField()
    date = models.DateField()

class StatFactory(models.Model):
    num_of_errors = models.IntegerField()
    date = models.DateField()