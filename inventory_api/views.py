from rest_framework import viewsets
from drf_spectacular.utils import extend_schema_view, extend_schema
from .models import Producto
from .forms import ProductoForm
from .serializers import ProductoSerializer
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required




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



def auth_view(request):
    login_form = AuthenticationForm()
    register_form = UserCreationForm()

    if request.method == 'POST':
        if 'login' in request.POST:
            login_form = AuthenticationForm(request, data=request.POST)
            if login_form.is_valid():
                username = login_form.cleaned_data.get('username')
                password = login_form.cleaned_data.get('password')
                user = authenticate(request, username=username, password=password)
                if user is not None:
                    login(request, user)
                    refresh = RefreshToken.for_user(user)
                    access_token = str(refresh.access_token)
                    print("Access Token:", access_token)
                    refresh_token = str(refresh)
                    response = redirect('inventario')
                    # Pasar los tokens al frontend como cookies
                    response.set_cookie('access_token', access_token)
                    response.set_cookie('refresh_token', refresh_token)
                    return response
                else:
                    messages.error(request, 'Nombre de usuario o contraseña incorrectos.')
            else:
                messages.error(request, 'Nombre de usuario o contraseña incorrectos.')

        elif 'register' in request.POST:
            register_form = UserCreationForm(request.POST)
            if register_form.is_valid():
                user = register_form.save()
                login(request, user)
                messages.success(request, 'Usuario creado exitosamente.')
                return redirect('inventario')
            else:
                messages.error(request, 'Error al crear el usuario. Revisa los campos.')

    context = {
        'login_form': login_form,
        'register_form': register_form
    }

    return render(request, 'auth.html', context)





@csrf_exempt
@login_required(login_url='/api/auth/')
def inventario_view(request):
    return render(request, 'inventario.html')



