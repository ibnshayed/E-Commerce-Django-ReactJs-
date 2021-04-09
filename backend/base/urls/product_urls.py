from base.views import product_views as views
from django.urls import path

urlpatterns = [

    
    path("create/", views.createProduct, name='product_create'),

    path("upload/", views.uploadImage, name='upload_image'),

    path("update/<str:pk>/", views.updateProduct, name='product_update'),
    
    path("delete/<str:pk>/", views.deleteProduct, name='product_delete'),

    path("reviews/<str:pk>/", views.createProductReview, name='create_review'),

    path("<str:pk>/", views.getProduct, name='product'),

    path("", views.getProducts, name='products'),


]
