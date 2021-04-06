

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
@permission_classes([IsAuthenticated])
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
