from django.urls import path
from . import views
from .order_api_views import OrderListCreateAPIView, OrderRetrieveUpdateDestroyAPIView


urlpatterns = [
    path('orders/', OrderListCreateAPIView.as_view(), name='orders'),
    path('orders/<int:pk>/', OrderRetrieveUpdateDestroyAPIView.as_view(), name='order'),
]
