from rest_framework import serializers

from .models import Admin, Cart, ProdLog, Products, User


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class ProdLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProdLog
        fields = '__all__'
