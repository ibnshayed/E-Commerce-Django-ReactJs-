from django.urls import path
from . import views

app_name = 'base'

urlpatterns = [
    path("products/", views.getProducts, name='products'),
    path("products/<str:pk>/", views.getProduct, name='product'),

    path("", views.getRoutes, name='routes'),
]
