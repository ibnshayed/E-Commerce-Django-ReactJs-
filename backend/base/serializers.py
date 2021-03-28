from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        # fields = ('rating','price',)
        extra_kwargs = {
            'rating': {'coerce_to_string': False},
            'price': {'coerce_to_string': False},
        }