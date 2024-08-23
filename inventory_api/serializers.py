from .models import Producto
from rest_framework import serializers

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'
        read_only_fields = ['usuario']


        ## Todos los campos de models.py, el usuario es pasado como campo de lectura
