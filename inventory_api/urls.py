# inventory_api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from .views import (
    ProductoListViewSet,
    ProductoCreateViewSet,
    ProductoRetrieveViewSet,
    ProductoUpdateViewSet,
    ProductoDeleteViewSet,
)

# Crea un router para manejar las rutas de los ViewSets
router = DefaultRouter()
router.register(r'productos', ProductoListViewSet, basename='producto-list')
router.register(r'productos/crear', ProductoCreateViewSet, basename='producto-create')
router.register(r'productos/obtener', ProductoRetrieveViewSet, basename='producto-retrieve')
router.register(r'productos/actualizar', ProductoUpdateViewSet, basename='producto-update')
router.register(r'productos/eliminar', ProductoDeleteViewSet, basename='producto-delete')

urlpatterns = [
      
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Endpoint para obtener token JWT
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Endpoint para refrescar token JWT
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),  # Endpoint para verificar token JWT
    path('', include(router.urls)),  # Incluye todas las rutas registradas en el router anteriormente definidas
]
