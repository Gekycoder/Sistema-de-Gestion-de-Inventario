from django.db import models
from django.contrib.auth.models import User


class Producto(models.Model):
    nombre = models.CharField(max_length=255)
    categoria = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad_disponible = models.IntegerField()
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='productos')   # Clave foranea para asignarle usuario (user determinado de django)
                                                                                            # al usuairo que este autenticado

    def __str__(self):
        return self.nombre

    class Meta:
        ordering = ['-creado_en'] 
