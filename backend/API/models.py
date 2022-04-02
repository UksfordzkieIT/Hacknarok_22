from django.db import models
from django.utils import timezone

from phonenumber_field.modelfields import PhoneNumberField
import datetime


class User(models.Model):
    nick = models.CharField(max_length=30)
    phone_number = PhoneNumberField(null=False, blank=False, unique=True)
    allergies = models.JSONField(null=True)


class Heatmap(models.Model):
    date: datetime.datetime = models.DateTimeField(default=timezone.localtime)
    heat_points = models.JSONField()


class StoreProduct(models.Model):
    name = models.CharField(max_length=30)
    category = models.CharField(max_length=30)


class FactoryProduct(models.Model):
    name = models.CharField(max_length=30)
    category = models.CharField(max_length=30)


class Machine(models.Model):
    name = models.CharField(max_length=30)


class StoreCategories(models.Model):
    name = models.CharField(max_length=30)


class FactoryCategory(models.Model):
    name = models.CharField(max_length=30)

