

from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Product
from ..serializers import (ProductSerializer,)



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