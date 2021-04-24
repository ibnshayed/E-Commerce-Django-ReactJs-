from base.views import order_views as views
from base.views import pdf
from django.urls import path
from django.views.generic import TemplateView

app_name = 'orders'

urlpatterns = [
  path('', views.getAllOrders, name='orders'),

  path('add/', views.addOrderItems, name='orders-add'),

  path('myorders/', views.getMyOrders, name='myorders'),

  path('invoice/', TemplateView.as_view(template_name='order_invoice.html')),

	path('admin/order/<int:pk>/pdf/',pdf.admin_order_pdf,name='admin_order_pdf'),

  path('<str:pk>/', views.getOrderById, name='user-order'),

  path('<str:pk>/pay/', views.updateOrderToPay, name='pay'),

  path('<str:pk>/deliver/', views.updateOrderToDeliver, name='deliver'),



]
