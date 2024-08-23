# inventory_api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import inventario_view, auth_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .views import ProductoViewSet

router = DefaultRouter() # crea un router que maneja las rutas para el ViewSet.
router.register(r'productos', ProductoViewSet, basename='producto') # registra el ViewSet para los productos en el router, asignándole la ruta base productos.

urlpatterns = [

    path('auth/', auth_view, name='auth'),
    path('inventario/', inventario_view, name='inventario'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('', include(router.urls)),  # Incluye todas las rutas registradas en el router
]


