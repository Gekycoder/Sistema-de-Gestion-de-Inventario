# config/urls.py

from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView


# Define la vista para redirigir la raíz a /api/auth/
def redirect_to_auth(request):
    return redirect('/api/auth/')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('inventory_api.urls')), 
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('', redirect_to_auth),
]
