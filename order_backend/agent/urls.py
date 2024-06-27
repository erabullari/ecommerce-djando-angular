from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from .customer_api_views import CustomerListCreateAPIView, CustomerRetrieveUpdateDestroyAPIView
from .user_api_views import UserListCreateAPIView, UserRetrieveUpdateDestroyAPIView

urlpatterns = [

    path('users/', UserListCreateAPIView.as_view(), name='users'),
    path('users/<int:pk>/', UserRetrieveUpdateDestroyAPIView.as_view(), name='user'),
    path('customers/', CustomerListCreateAPIView.as_view(), name='customers'),
    path('customers/<int:pk>/', CustomerRetrieveUpdateDestroyAPIView.as_view(), name='customer'),



]
