from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Producto
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class ProductoAPITestCase(APITestCase):
    
    def setUp(self):
        # Creamos un usuario de prueba para la autenticación
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.producto = Producto.objects.create(
            nombre="Producto de prueba",
            categoria="Categoría de prueba",
            descripcion="Descripción del producto de prueba",
            precio=100.00,
            cantidad_disponible=10
        )
        self.client.login(username='testuser', password='testpassword')

        # Obtenemos un token de acceso para usarlo en las pruebas
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

    def test_list_productos(self):
        url = reverse('producto-list')  # Usamos 'producto-list' para listar productos
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_producto(self):
        url = reverse('producto-list')  # Usamos 'producto-list' para crear con POST
        data = {
            "nombre": "Nuevo Producto",
            "categoria": "Nueva Categoría",
            "descripcion": "Nueva descripción",
            "precio": 200.00,
            "cantidad_disponible": 5
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve_producto(self):
        url = reverse('producto-detail', args=[self.producto.id])  # Usamos 'producto-detail' para obtener un producto
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_producto(self):
        url = reverse('producto-detail', args=[self.producto.id])  # Usamos 'producto-detail' para actualizar con PUT
        data = {
            "nombre": "Producto Actualizado",
            "categoria": "Categoría Actualizada",
            "descripcion": "Descripción Actualizada",
            "precio": 150.00,
            "cantidad_disponible": 8
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_producto(self):
        url = reverse('producto-detail', args=[self.producto.id])  # Usamos 'producto-detail' para eliminar con DELETE
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
