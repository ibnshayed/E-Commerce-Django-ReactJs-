
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from ..models import Product
from ..serializers import ProductSerializer


@api_view()
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view()
def getProduct(request, pk):

    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)

    # product = None
    # for i in products:
    #     if i['_id'] == pk:
    #         product = i
    #         break

    # product = [product for product in products if product['_id'] == pk] # return a list
    # product = filter(lambda x: x["_id"] == pk , products) # return a list


    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)

    data = request.data
    product.name = data['name']
    product.category = data['category']
    product.price = data['price']
    product.brand = data['brand']
    
    product.save()
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = get_object_or_404(Product, _id=pk)
    product.delete()
    return Response(F'Product {product.name} has been deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    data = request.data

    product = Product.objects.create(
        user = user,
        name = data['name'],
        brand = data['brand'],
        category = data['category'],
        description = data['description'],
        rating = data['rating'],
        numReviews = data['numReviews'],
        price = data['price'],
        countInStock = data['countInStock'],
    )

    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)
