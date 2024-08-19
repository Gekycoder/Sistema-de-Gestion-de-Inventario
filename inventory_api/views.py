from rest_framework import viewsets
from drf_spectacular.utils import extend_schema_view, extend_schema
from .models import Producto
from .serializers import ProductoSerializer

@extend_schema_view(
    list=extend_schema(description="Permite obtener una lista de productos."),
    retrieve=extend_schema(description="Permite obtener un producto por su ID."),
    create=extend_schema(description="Permite crear un nuevo producto."),
    update=extend_schema(description="Permite actualizar un producto existente."),
    destroy=extend_schema(description="Permite eliminar un producto por su ID.")
)
class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
