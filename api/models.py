from django.db import models

# Create your models here.


class Admin(models.Model):
    name = models.CharField(max_length=50, null=False, default="")
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=8, null=False)


class User(models.Model):
    name = models.CharField(max_length=50, null=False, default="")
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=8, null=False)
    contact = models.CharField(max_length=10)


class Products(models.Model):
    img = models.ImageField(upload_to="images/", null=False)
    title = models.CharField(max_length=20, null=False, unique=True)
    description = models.CharField(max_length=100, null=False)
    active = models.BooleanField(default=False)


class Cart(models.Model):
    uemail = models.ForeignKey(
        User, to_field="email", on_delete=models.CASCADE)
    prod = models.ForeignKey(Products, to_field="id", on_delete=models.CASCADE)
    sold = models.BooleanField(default=False)


class ProdLog(models.Model):
    uemail = models.ForeignKey(
        User, to_field="email", on_delete=models.CASCADE)
    productsbought = models.CharField(max_length=100, null=False)
    totalorders = models.IntegerField(null=False)
