from django.db import models


# Create your models here.
class Role(models.Model):
    name = models.CharField(max_length=30)


class TempUser(models.Model):
    email = models.CharField(max_length=30)
    password = models.CharField(max_length=200)
    token = models.CharField(max_length=100)


class User(models.Model):
    email = models.CharField(max_length=30)
    password = models.CharField(max_length=200)
    roles = models.ForeignKey(Role, on_delete=models.CASCADE, related_name='roles')
    status = models.IntegerField(null=True, blank=True)
    create_date = models.DateField('create date', null=True, blank=True)
    balance = models.FloatField(null=True, blank=True)


class Car(models.Model):
    picture = models.CharField(max_length=100)
    sub_pictures = models.CharField(max_length=200)
    brand = models.CharField(max_length=20)
    name = models.CharField(max_length=200)
    year = models.IntegerField(null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    mileage = models.IntegerField(null=True, blank=True)
    displacement = models.CharField(max_length=20)
    amt = models.CharField(max_length=20)
    status = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='car_user')


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='users')
    car = models.ForeignKey(Car, on_delete=models.DO_NOTHING, related_name='cars')
    seller = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='sellers')
    create_date = models.DateField('create date', null=True, blank=True)
