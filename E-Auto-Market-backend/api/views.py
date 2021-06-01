import os
import random
import uuid
from datetime import date

from django.contrib.auth.hashers import make_password, check_password

# Create your views here.
from django.core.mail import send_mail
from django.db.models import Q
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from api.models import User, Role, TempUser, Car, Order
from api.serializers import UserSerializer, RoleSerializer, LoginSerializer, TempUserSerializer, CarSerializer, \
    OrderSerializer
from backend.settings import EMAIL_HOST_USER, EMAIL_VALIDATE_HOST


class UserViewSet(ViewSet):

    def retrieve(self, request, pk=None):
        user = User.objects.all().get(id=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def create(self, request):
        user = request.data
        token = user.get('token')
        if token is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # check temp user
        temp_user = TempUser.objects.all().get(token=token)
        if temp_user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user["password"] = make_password(user["password"], None, 'pbkdf2_sha256')
        user["status"] = 1
        user["balance"] = 0.0
        user["create_date"] = date.today()
        user.pop("token")
        serializer = UserSerializer(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        temp_user.delete()
        return Response(status=status.HTTP_201_CREATED)

    def partial_update(self, request, pk=None):
        user = User.objects.all().get(id=pk)
        if "password" in request.data:
            request.data["password"] = make_password(request.data["password"], None, 'pbkdf2_sha256')
        serializer = UserSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        user = User.objects.all().get(id=pk)
        serializer = UserSerializer(user)
        user.delete()
        return Response(serializer.data)


class RoleViewSet(ViewSet):

    def list(self, request):
        roles = Role.objects.all()
        serializer = RoleSerializer(roles, many=True)
        return Response(serializer.data)

    def create(self, request):
        role = request.data
        serializer = RoleSerializer(data=role)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UserEmailValidateSet(ViewSet):
    def retrieve(self, request, pk=None):
        user = TempUser.objects.all().get(id=pk)
        serializer = TempUserSerializer(user)
        return Response(serializer.data)

    def create(self, request):
        temp_user = request.data
        token = ''
        for i in range(6):
            token += str(random.randint(0, 9))
        temp_user["token"] = token
        serializer = TempUserSerializer(data=temp_user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # send email
        send_mail(
            subject='Please verify your code',
            message='Welcome to register the E-Auto-Market, your verification code is: ' + token,
            from_email=EMAIL_HOST_USER,
            recipient_list=[temp_user["email"]],
            fail_silently=False
        )

        return Response(serializer.data)


class UserLoginViewSet(ViewSet):

    def create(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            find_user = User.objects.filter(email=email)
            if not find_user:
                return Response(status=status.HTTP_404_NOT_FOUND)
            else:
                serializer = LoginSerializer(find_user.first())
                match_pwd = check_password(password, serializer.data.get('password'))
                if match_pwd and serializer.data.get('status') != 0:
                    return Response(UserSerializer(find_user.first()).data)
                else:
                    return Response(status=status.HTTP_404_NOT_FOUND)


class CarPictureViewSet(ViewSet):

    def create(self, request):
        file = request.FILES.get("file", None)
        if not file:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        file_uuid = str(uuid.uuid4())
        destination = open(os.path.join(os.path.abspath(os.path.join(os.getcwd(), 'pictures')), file_uuid), 'wb+')
        for chunk in file.chunks():
            destination.write(chunk)
        destination.close()
        return Response(file_uuid)

    def retrieve(self, request, pk=None):
        image_path = os.path.join(os.path.join(os.path.abspath(os.path.join(os.getcwd(), 'pictures')), pk))
        with open(image_path, 'rb') as f:
            image_data = f.read()
        return HttpResponse(image_data, content_type="image/png")


class CarViewSet(ViewSet):

    def create(self, request):
        car = request.data
        serializer = CarSerializer(data=car)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        car = Car.objects.all().get(id=pk)
        serializer = CarSerializer(car)
        return Response(serializer.data)

    def list(self, request):
        brand = request.GET.get("brand")
        start_price = request.GET.get("startPrice")
        end_price = request.GET.get("endPrice")
        keyword = request.GET.get("keyword")

        cars = Car.objects.all()
        cars = cars.filter(status=0)

        if brand:
            cars = cars.filter(brand=brand)
        if start_price:
            cars = cars.filter(price__gte=start_price)
        if end_price:
            cars = cars.filter(price__lte=end_price)
        if keyword:
            cars = cars.filter(Q(name__contains=keyword) | Q(price__contains=keyword)
                                       | Q(brand__contains=keyword) | Q(brand__contains=keyword))

        serializer = CarSerializer(cars, many=True)
        return Response(serializer.data)


class OrderViewSet(ViewSet):

    def create(self, request):
        order = request.data
        order["create_date"] = date.today()
        car_id = order["car"]
        user_id = order["user"]
        seller_id = order["seller"]

        if user_id is None or car_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # update car
        car = Car.objects.all().get(id=car_id)
        if car is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if car.status == 1:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # update user
        user = User.objects.all().get(id=user_id)
        if user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if user.balance < car.price:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

        car.status = 1
        serializer_car = CarSerializer(car, data={}, partial=True)
        serializer_car.is_valid(raise_exception=True)
        serializer_car.save()

        user.balance = user.balance - car.price
        serializer_user = UserSerializer(user, data={}, partial=True)
        serializer_user.is_valid(raise_exception=True)
        serializer_user.save()

        serializer = OrderSerializer(data=order)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)

    def list(self, request):
        user_id = request.GET.get("userId")
        seller_id = request.GET.get("sellerId")

        orders = Order.objects.all()
        if user_id:
            orders = orders.filter(user_id=user_id)
        if seller_id:
            orders = orders.filter(seller=seller_id)

        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        order = Order.objects.all().get(id=pk)
        serializer = OrderSerializer(order)
        order.delete()
        return Response(serializer.data)
