from django.contrib import admin
from django.urls import reverse
from django.utils.safestring import mark_safe

from .models import *

# Register your models here.

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
		list_display = [field.name for field in Product._meta.fields]

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
		list_display = [field.name for field in Review._meta.fields]


def order_pdf(obj):
	url = reverse('orders:admin_order_pdf', args=[obj._id])
	return mark_safe(f'<a href="{url}">PDF</a>')
	order_pdf.short_description = 'Invoice'

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
		list_display = [field.name for field in Order._meta.fields]
		list_display.append(order_pdf)

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
		list_display = [field.name for field in OrderItem._meta.fields]

# admin.site.register(OrderItem)

@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
		list_display = [field.name for field in ShippingAddress._meta.fields]




# class OrderAdmin(admin.ModelAdmin):
# 	list_display = ['id',order_pdf]
