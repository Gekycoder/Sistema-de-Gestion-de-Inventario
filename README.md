# Sistema de Gestión de Inventario

Este es un sistema de gestión de inventario desarrollado en Django, utilizando PostgreSQL como base de datos.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu entorno de desarrollo (de preferencia un entorno virtual):

- **Python 3.12.1**
- **Django 5.1**
- **PostgreSQL** (cualquier versión compatible)

## Configuración del Proyecto

### 1. Clonar el Repositorio

Primero, clona el repositorio en tu máquina local:


git clone https://github.com/Gekycoder/Sistema-de-Gestion-de-Inventario.git
cd Sistema-de-Gestion-de-Inventario


### 2. Configurar el Entorno Virtual

Crea y activa un entorno virtual para el proyecto:

python -m venv env
.\env\Scripts\activate

### 3. Instalar las Dependencias

Actualiza de ser necesario pip:

python.exe -m pip install --upgrade pip

Luego instala todas las dependencias necesarias utilizando:

pip install -r requirements.txt


### 4. Configurar el Archivo .env.example

El proyecto utiliza un archivo .env para la configuración de variables de entorno, como las credenciales de la base de datos. Sigue estos pasos:

###     4.1 Renombra el archivo .env.example a .env:

###     4.2 Remplaza la contraseña dentro del archivo .env y renombra DB_NAME si decides colocarle otro nombre a la base de datos:
            DB_NAME=inventario_db
            DB_USER=postgres # Utilice postgres en este caso
            DB_PASSWORD=tu_contraseña_aqui  # Cambia este valor por la contraseña de tu usuario de PostgreSQL
            DB_HOST=localhost
            DB_PORT=5432

### 5. Crea la Base de Datos

Crea la base de datos en PostgreSQL llamada:

inventario_db 

###     5.1 Aplica las migraciones de Django:

            Una vez que la base de datos esté configurada y el archivo .env esté listo, aplica las migraciones para configurar la estructura de 
            la base de datos:

            python manage.py makemigrations
            python manage.py migrate

### 6. Ejecuta el servidor de desarrollo

python manage.py runserver


## 7. Para acceder al panel de Administrador de Django puedes crear un superusuario con el siguiente codigo en la terminal:
python manage.py createsuperuser

## 8. Puedes iniciar sesion si lo deseas con el super usuario de django en /api/auth pero es ideal que puedas registrar un usuario en la seccion que dice:

"¿No tienes cuenta? Regístrate"

##      8.1 Una vez te registres se te redirigira al inicio de sesion donde podras colocar las credenciales que utilizaste

## 9. Una vez en autenticado el **token JWT tiene un tiempo de vida de 3 min** asi que si expira el token puedes iniciar sesion con ese mismo usuario u otro si lo deseas, luego en /api/inventario tendras una lista sin productos donde puedes volver a la seccion principal y crear un producto luego listarlo y filtrar las busquedas en el boton situalo al lado izq del buscador donde puedes utilizar la busqueda por nombre o categoria segun selecciones, posteriormente puedes editar o eliminar  productos si lo deseas.

Puedes comprobar con la base de datos para verificar que efectivamente se estan realizando las acciones que estan definidas en inventario_apis/urls.py y inventario_apis/views.py, ademas recomiendo chequear la estructura completa del proyecto para mayor comprension del sistema.

##      9.1 En caso de ingresar a /api/inventario y ver el mensaje **error al listar productos** dale aceptar, y presiona el boton Listar productos se te mostrara un mensaje donde dira que el token a expirado y al aceptar podras reiniciar sesion nuevamente

## 10. Estas acciones ademas de la interfaz principal llamada /api/inventario pueden ser comprobadas desde el boton swaager ui donde al entrar alli tendras un botón al lado superior derecho llamado "Authorize" que al clickear te pedira un token, ese token esta en la terminal apenas inicies sesion como "Token Access: (token de ejemplo)" o en el navegadoro al presionar F12 puedes observar en la consola del mismo 2 variables siempre copia Copia y pega en "Authorize" el Token Access arrojado alli o en la terminal.

## 11. Una vez te loguees en swagger con el boton Authorize cierra esa pequeña ventana en "Cerrar" y puedes probar por ejemplo:

##      11.1 GET api/productos tiene como funcion  obtener una lista de productos al desplegarlo clickea el boton Try Out y luego execute para observar debajo los productos que hayas creado con ese usuario autenticado en ese tiempo (3min) si dice Unauthorized codigo 401 quiere decir que expiro el token de acceso, iras al boton Authorize en la parte superior derecha y luego en logout (Al ser swagger ui una interfaz dependiente no cierra sesion automaticamente).

##      11.2 Puedes reloguearte y copiar y pegar el token de acceso o si lo prefieres utilizar el endpoint POST api/token le daras Try out y veras lo siguiente:

            {
            "username": "string",
            "password": "string"
            }

##        Reemplazaras los campos por un usuario que hayas creado, luego presionaras execute, esto te dara una variable llamada Acces Token que podras usar para loguearte de nuevo en el boton superior derecho "Authorize" para seguir probando los endpoints en swagger

##     11.3 POST api/productos servira para la creacion de productos, una vez logueado presiona Try out reemplaza los campos que digan string (conserva las comillas) y presiona execute para visualizar el producto creado con codigo 200 exitoso, y puedes chequearlo nuevamente en GET api/productos.

##     11.4 GET api/productos/{id} permite obtener productos por su id

##     11.5 PUT api/productos/{id} permite la edicion o actualizacion de un producto existente por su id

##     11.6 PATCH api/productos/{id} permite la edicion o actualizacion de un campo o campos perteneciente producto existente por su id, es decir debes borrar los campos que no desees actualizar de lo contrario no te dejara realizar la accion ya que asi funciona el metodo PATCH.

##     11.7 DELETE api/productos/{id} Permite eliminar un producto por su ID.


## 12. En la estructura del proyecto django en el explorador la carpeta inventory_api hay un modulo llamado tests.py donde se utiliza como tests unitarios con datos de prueba para verificar el correcto funcionamiento de la API.

##     12.1 Se puede ejecutar en una terminal typeando: 

            python manage.py test

##


## Información Adicional

**Este proyecto fue desarrollado como parte de un reto técnico para una aplicación de empleo**. No incluye una licencia de distribución,
ya que su propósito es exclusivamente demostrar habilidades técnicas.

Este proyecto fue desarrollado y probado en un entorno Windows.

Para conocer más detalles sobre las versiones específicas de los paquetes utilizados, revisa el archivo requirements.txt.


## Autor
Desarrollado por **Nathan León**, Ingeniero en Sistemas.