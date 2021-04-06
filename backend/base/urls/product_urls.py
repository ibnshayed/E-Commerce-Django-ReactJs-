from base.views import product_views as views
from django.urls import path

urlpatterns = [
    path("", views.getProducts, name='products'),

    path("<str:pk>/", views.getProduct, name='product'),

    path("update/<str:pk>/", views.updateProduct, name='product_update'),
    

]
