from django.urls import path

from product.product_api_views import ProductListCreateAPIView, ProductRetrieveUpdateDestroyAPIView, \
    CategoryListCreateAPIView

urlpatterns = [

    path('products/', ProductListCreateAPIView.as_view(), name='products'),
    path('products/<int:pk>/', ProductRetrieveUpdateDestroyAPIView.as_view(), name='product'),
    path('categories/', CategoryListCreateAPIView.as_view(), name='category'),
 ]
