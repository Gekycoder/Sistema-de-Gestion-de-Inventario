import threading, sys, time
from rest_framework import viewsets
from drf_spectacular.utils import extend_schema_view, extend_schema
from .models import Producto
from .serializers import ProductoSerializer
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated



@extend_schema_view(
    list=extend_schema(description="Permite obtener una lista de productos."),
    retrieve=extend_schema(description="Permite obtener un producto por su ID."),
    create=extend_schema(description="Permite crear un nuevo producto."),
    update=extend_schema(description="Permite actualizar un producto existente."),
    destroy=extend_schema(description="Permite eliminar un producto por su ID.")
)
class ProductoViewSet(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        usuario = self.request.user
        productos = Producto.objects.filter(usuario=usuario)
        print(f"Usuario autenticado: {usuario.username}, ID: {usuario.id}, Productos encontrados: {productos.count()}")
        return productos


    def perform_create(self, serializer):
        # Asigna el usuario autenticado al crear un nuevo producto
        serializer.save(usuario=self.request.user)


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
                    print(f"Usuario autenticado: {user.username}, ID: {user.id}")
                    login(request, user)
                    refresh = RefreshToken.for_user(user)
                    access_token = str(refresh.access_token)
                    print("Access Token:", access_token)
                    start_token_timer(3 * 60)  # Temporizador de 3 minutos que es el tiempo definido en SIMPLE JWT para no hacer tan larga la sesion
                    refresh_token = str(refresh)
                    response = redirect('inventario') # Redirige a inventario
                    # Pasan los tokens al frontend como cookies
                    response.set_cookie('access_token', access_token)
                    response.set_cookie('refresh_token', refresh_token)
                    return response
                else:
                    messages.error(request, 'Nombre de usuario o contraseña incorrectos.') # En caso de tener credenciales incorrectas muestra el error
            else:
                messages.error(request, 'Nombre de usuario o contraseña incorrectos.')

        elif 'register' in request.POST:    # Registro de usuario 
            register_form = UserCreationForm(request.POST)
            if register_form.is_valid():
                user = register_form.save()
                login(request, user)
                messages.success(request, 'Usuario creado exitosamente.') # Si el registro es exitoso redirige al login que es auth como ruta
                return redirect('auth')
            else:
                messages.error(request, 'Error al crear el usuario. Revisa los campos.')

    context = {
        'login_form': login_form,
        'register_form': register_form
    }

    return render(request, 'auth.html', context)




@csrf_exempt
@login_required(login_url='/api/auth/')
def inventario_view(request):   # Vista protegida donde solo se puede acceder si el usuario esta autenticado
    return render(request, 'inventario.html')


# Variable global para controlar el temporizador que controla los 3 min donde se refresca en una misma linea para evitar saturar la terminal
timer_should_run = True

def start_token_timer(duration):
    global timer_should_run
    timer_should_run = True

    def countdown():
        global timer_should_run
        timer = duration
        while timer > 0 and timer_should_run:
            minutes, seconds = divmod(timer, 60)
            time_format = f"{minutes:02d}:{seconds:02d}"
            sys.stdout.write(f"\rTiempo restante del token: {time_format}")
            sys.stdout.flush()
            time.sleep(1)
            timer -= 1
        
        if not timer_should_run:
            sys.stdout.write("\rTemporizador detenido.            \n")
        else:
            sys.stdout.write("\rEl token ha expirado.            \n")

    threading.Thread(target=countdown).start()

