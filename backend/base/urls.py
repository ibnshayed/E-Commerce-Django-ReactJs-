from django.urls import path
from . import views

app_name = 'base'

urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/', views.getUserProfile, name='user_profile'),


    path("products/", views.getProducts, name='products'),
    path("products/<str:pk>/", views.getProduct, name='product'),

    path("", views.getRoutes, name='routes'),
]
