from django.urls import path, include

from rest_framework import routers
from . import views


route = routers.DefaultRouter()

route.register(r'user', views.UserViewSet, basename='user')
route.register(r'login', views.UserLoginViewSet, basename='login')
route.register(r'signUp', views.UserEmailValidateSet, basename='signUp')
route.register(r'role', views.RoleViewSet, basename='role')
route.register(r'picture', views.CarPictureViewSet, basename='picture')
route.register(r'car', views.CarViewSet, basename='car')
route.register(r'order', views.OrderViewSet, basename='order')

urlpatterns = [
    path('', include(route.urls)),
]
