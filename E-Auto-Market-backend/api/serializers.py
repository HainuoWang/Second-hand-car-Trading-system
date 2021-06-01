from django.forms import PasswordInput
from rest_framework import serializers
from api.models import User, Role, TempUser, Car, Order


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'roles', 'status', 'create_date', 'balance')
        extra_kwargs = {'password': {'write_only': True}}
        widgets = {
            'password': PasswordInput(),
        }


class TempUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TempUser
        fields = '__all__'


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    car_picture = serializers.CharField(source='car.picture', allow_null=True, read_only=True)
    car_name = serializers.CharField(source='car.name', allow_null=True, read_only=True)
    car_price = serializers.CharField(source='car.price', allow_null=True, read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'user', 'car', 'seller', 'car_picture', 'car_name', 'car_price', 'create_date', 'status')
