document.addEventListener("DOMContentLoaded", function() {
    const contentSections = document.querySelectorAll('.content-section');
    const listarBtn = document.getElementById('listar-btn');
    const crearBtn = document.getElementById('crear-btn');
    const eliminarBtn = document.getElementById('eliminar-btn');
    const buscarBtn = document.getElementById('buscar-btn');
    const buscarInput = document.getElementById('buscar-input');

    let accessToken = localStorage.getItem('access_token');
    let refreshToken = localStorage.getItem('refresh_token');
    
    if (!accessToken || !refreshToken) {
        // Si no está en localStorage, intenta obtenerlo de las cookies
        accessToken = getCookie('access_token');
        refreshToken = getCookie('refresh_token');
        // Si se encuentran en cookies, guárdalos en localStorage
        if (accessToken && refreshToken) {
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
        }
    }

    console.log('Access Token en localStorage:', accessToken);
    console.log('Refresh Token en localStorage:', refreshToken);

    function showSection(sectionId) {
        contentSections.forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(sectionId).style.display = 'block';
    }

    listarBtn.addEventListener('click', function() {
        showSection('listar-productos');
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'block';
        const listarModal = document.getElementById('listar-productos');
        listarModal.style.display = 'block';
        fetchProductos();
    });

    crearBtn.addEventListener('click', function() {
        showSection('crear-producto');
    });

    eliminarBtn.addEventListener('click', function() {
        showSection('eliminar-producto');
    });

    buscarBtn.addEventListener('click', function() {
        const query = buscarInput.value.trim();
        if (query) {
            fetchProductos(query);
        } else {
            alert("Por favor ingrese un término de búsqueda.");
        }
    });

    function fetchProductos(query = '') {
        let url = '/api/productos/';
        if (query) {
            url += `?search=${query}`;
        }
        console.log('URL de la solicitud:', url);

        fetchWithToken(url)
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta de la API:', data);
                const tbody = document.querySelector('#productos-table tbody');
                tbody.innerHTML = '';
                data.forEach(producto => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${producto.id}</td>
                        <td>${producto.nombre}</td>
                        <td>${producto.categoria}</td>
                        <td>${producto.descripcion}</td>
                        <td>${producto.precio}</td>
                        <td>${producto.cantidad_disponible}</td>
                        <td>
                            <button onclick="loadEditarProducto(${producto.id})">Editar</button>
                            <button onclick="loadEliminarProducto(${producto.id})">Eliminar</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
            })
            .catch(error => {
                console.error('Error al listar productos:', error);
                alert('Error al listar productos. Por favor, intenta de nuevo.');
            });
    }

    document.getElementById('crear-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
        const formData = new FormData(this);
    
        fetchWithToken('/api/productos/', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            alert('Producto creado exitosamente');
            this.reset(); // Limpiar todos los campos del formulario
            listarBtn.click();  // Vuelve a la lista de productos
        })
        .catch(error => {
            console.error('Error al crear producto:', error);
            alert('Error al crear producto. Por favor, intenta de nuevo.');
        });
    });
    
    document.getElementById('editar-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        fetchWithToken(`/api/productos/${formData.get('id')}/`, {
            method: 'PUT',
            body: formData,
        })
        .then(response => {
            // Verifica si la respuesta es JSON
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            return response.json();
        })
        .then(data => {
            alert('Producto actualizado exitosamente');
            listarBtn.click();  // Vuelve a la lista de productos
        })
        .catch(error => {
            console.error('Error al actualizar producto:', error);
            alert('Error al actualizar producto. Por favor, intenta de nuevo.');
        });
    });    

    document.getElementById('eliminar-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        fetchWithToken(`/api/productos/${formData.get('id')}/`, {
            method: 'DELETE',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            alert('Producto eliminado exitosamente');
            listarBtn.click();  // Vuelve a la lista de productos
        })
        .catch(error => {
            console.error('Error al eliminar producto:', error);
            alert('Error al eliminar producto. Por favor, intenta de nuevo.');
        });
    });

    // Función para cargar y mostrar el modal de edición
    window.loadEditarProducto = function(id) {
        fetchWithToken(`/api/productos/${id}/`)
            .then(response => response.json())
            .then(data => {
                const form = document.getElementById('editar-form');
                form.querySelector('input[name="id"]').value = data.id;  // Aquí se asegura que el ID esté presente
                form.querySelector('input[name="nombre"]').value = data.nombre;
                form.querySelector('input[name="categoria"]').value = data.categoria;
                form.querySelector('textarea[name="descripcion"]').value = data.descripcion;
                form.querySelector('input[name="precio"]').value = data.precio;
                form.querySelector('input[name="cantidad_disponible"]').value = data.cantidad_disponible;
    
                // Mostrar el modal de edición
                const overlay = document.getElementById('overlay');
                const editarModal = document.getElementById('editar-producto');
                overlay.style.display = 'block';
                editarModal.style.display = 'block';
            })
            .catch(error => {
                console.error('Error al cargar datos del producto:', error);
                alert('Error al cargar datos del producto. Por favor, intenta de nuevo.');
            });
    }
    
    document.getElementById('editar-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const id = formData.get('id');  // Obtén el ID desde el formulario
        fetchWithToken(`/api/productos/${id}/`, {
            method: 'PUT',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            return response.json();
        })
        .then(data => {
            alert('Producto actualizado exitosamente');
            listarBtn.click();  // Vuelve a la lista de productos
        })
        .catch(error => {
            console.error('Error al actualizar producto:', error);
            alert('Error al actualizar producto. Por favor, intenta de nuevo.');
        });
    });
    

    // Función para manejar la autenticación y los tokens
    function fetchWithToken(url, options = {}) {
        const token = localStorage.getItem('access_token');
        console.log('Token utilizado para la solicitud:', token);
        if (token) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${token}`
            };
        }
        return fetch(url, options).then(response => {
            if (response.status === 401) {
                console.error('Token expirado, redirigiendo a la autenticación.');
                alert('La sesión ha expirado. Por favor, inicie sesión nuevamente.');
                clearStorageAndCookies(); // Limpiar cualquier token almacenado
                window.location.href = '/api/auth/';
            }
            return response;
        });
    }

    // Función para obtener cookies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Función para eliminar todas las cookies
    function deleteAllCookies() {
        document.cookie.split(";").forEach(function(c) {
            document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        });
    }

    // Función para limpiar `localStorage` y cookies
    function clearStorageAndCookies() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        deleteAllCookies();
    }

    // Llama a esta función cuando el usuario cierre sesión
    document.getElementById('logout-btn').addEventListener('click', function() {
        clearStorageAndCookies();
        window.location.href = '/login';  // Redirigir a la página de inicio de sesión
    });

   // Cerrar modal al hacer clic en el overlay
    overlay.addEventListener('click', function() {
        overlay.style.display = 'none';
        listarModal.style.display = 'none'; 
        editarModal.style.display = 'none';
    });

    // Cerrar modal al presionar "Escape"
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            overlay.style.display = 'none';
            listarModal.style.display = 'none';
            editarModal.style.display = 'none';
        }
    });
});