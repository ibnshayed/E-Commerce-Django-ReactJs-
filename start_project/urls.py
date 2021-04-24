

from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from django.views.static import serve
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
   openapi.Info(
      title="E-Commerce app",
      default_version='v1',
      description="A simple eCommerce website by Emran Ibn Shayed",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="ibnshayed@gmail.com"),
      license=openapi.License(name="MIT License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', TemplateView.as_view(template_name='index.html')),

    path('api/products/', include('base.urls.product_urls')),

    path('api/users/', include('base.urls.user_urls')),

    path('api/orders/', include('base.urls.order_urls', namespace='orders')),

    re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}), 
    re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
    
    # re_path(r'^static/(?P<path>.*)$', views.serve),
    # re_path(r'^media/(?P<path>.*)$', views.serve,),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    
]

# urlpatterns += staticfiles_urlpatterns()

# urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL,
#     document_root=settings.MEDIA_ROOT)

