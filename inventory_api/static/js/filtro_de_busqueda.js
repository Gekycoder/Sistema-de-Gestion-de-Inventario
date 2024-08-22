document.addEventListener("DOMContentLoaded", function() {
    const buscarInput = document.getElementById('buscar-input');

    // Evento de búsqueda en tiempo real
    buscarInput.addEventListener('input', function() {
        const query = buscarInput.value.trim();
        if (query) {
            fetchProductos(query);
        } else {
            fetchProductos();  // Si el campo está vacío, cargar todos los productos
        }
    });

    function fetchWithToken(url, options = {}) {
        const token = localStorage.getItem('access_token');
        if (token) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${token}`
            };
        }
        return fetch(url, options);
    }
    
    function fetchProductos(query = '') {
        let url = '/api/productos/';
        fetchWithToken(url)
            .then(response => response.json())
            .then(data => {
                const tbody = document.querySelector('#productos-table tbody');
                tbody.innerHTML = '';
                
                // Filtrar productos solo si hay una búsqueda
                let filteredData = data;
                if (query) {
                    filteredData = data.filter(producto => 
                        producto.nombre.toLowerCase().includes(query.toLowerCase())
                    );
                }

                // Ordenar los productos alfabéticamente por nombre
                filteredData.sort((a, b) => a.nombre.localeCompare(b.nombre));

                // Renderizar las filas de los productos filtrados
                filteredData.forEach(producto => {
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

    // Cargar todos los productos inicialmente
    fetchProductos();
});