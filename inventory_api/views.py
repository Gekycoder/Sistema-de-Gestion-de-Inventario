from rest_framework import viewsets, mixins
from drf_spectacular.utils import extend_schema, extend_schema_view
from .models import Producto
from .serializers import ProductoSerializer

@extend_schema_view(
    list=extend_schema(description='Permite obtener una lista de productos.')
)
class ProductoListViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()

@extend_schema_view(
    retrieve=extend_schema(description='Permite obtener un producto.')
)
class ProductoRetrieveViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()

@extend_schema_view(
    create=extend_schema(description='Permite crear un producto.')
)
class ProductoCreateViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()

@extend_schema_view(
    update=extend_schema(description='Permite actualizar un producto.')
)
class ProductoUpdateViewSet(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()

@extend_schema_view(
    destroy=extend_schema(description='Permite eliminar un producto.')
)
class ProductoDeleteViewSet(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()
