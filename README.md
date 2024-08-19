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

###     4.2 Remplaza la contraseña dentro del archivo .env:
            DB_NAME=inventario_db
            DB_USER=postgres
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


#  #


## Información Adicional

**Este proyecto fue desarrollado como parte de un reto técnico para una aplicación de empleo**. No incluye una licencia de distribución,
ya que su propósito es exclusivamente demostrar habilidades técnicas.

Este proyecto fue desarrollado y probado en un entorno Windows.

Para conocer más detalles sobre las versiones específicas de los paquetes utilizados, revisa el archivo requirements.txt.


## Autor
Desarrollado por **Nathan León**, Ingeniero en Sistemas.