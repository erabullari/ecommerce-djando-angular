from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from agent.models import Customer
from product.models import Product, ProductCategory
from product.product_serializers import ProductSerializer, ProductWriteSerializer, ProductCategorySerializer


class ProductListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.filter(deleted=False)
    serializer_class = ProductSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ProductSerializer
        else:
            return ProductWriteSerializer


class ProductRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.filter(deleted=False)
    serializer_class = ProductSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ProductSerializer
        else:
            return ProductWriteSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.deleted = True
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CategoryListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductCategorySerializer
    queryset = ProductCategory.objects.all()