
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from ..models import Product, Review
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
    product.brand = data['brand']
    product.category = data['category']
    product.description = data['description']
    product.rating = data['rating']
    product.numReviews = data['numReviews']
    product.price = data['price']
    product.countInStock = data['countInStock']
    
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


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    productId = data['product_id']
    product = get_object_or_404(Product, _id=productId)

    product.image = request.FILES.get('image')
    product.save()

    # print(product.image)
    # print(product.image.name)
    # print(product.image.path)
    # print(product.image.url)

    return Response(product.image.url)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = get_object_or_404(Product, _id=pk)
    data = request.data

    # Review already exist
    alreadyExist = product.review_set.filter(user=user).exists()

    if alreadyExist:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # No rating or 0]
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
            )
    
    reviews = product.review_set.all()
    product.numReviews = len(reviews)

    total = 0
    for i in reviews:
        total += i.rating

    # total = sum([i['rating'] for i in reviews]) short cut

    product.rating = total / len(reviews)
    product.save()
    
    return Response("Review Added Successfully")
