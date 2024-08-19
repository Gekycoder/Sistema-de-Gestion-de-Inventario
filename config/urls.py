# config/urls.py 

from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(('inventory_api.urls', 'inventory_api'), namespace='inventory_api')),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),  # Genera el esquema OpenAPI
    path('schema/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),  # Documentación en Swagger UI

]

