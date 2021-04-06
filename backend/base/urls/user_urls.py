from django.urls import path

from base.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('register/', views.registerUser, name='register'),

    path('profile/', views.getUserProfile, name='user_profile'),

    path('profile/update/', views.updateUserProfile, name='user_profile_update'),

    path('<str:pk>/', views.getUserById, name='user'),
    path('update/<str:pk>/', views.updateUser, name='update_user'),
    path('delete/<str:pk>/', views.deleteUser, name='delete_user'),
    
    path('', views.getUsers, name='users'),

]
