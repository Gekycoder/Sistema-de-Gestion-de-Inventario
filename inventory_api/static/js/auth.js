document.addEventListener("DOMContentLoaded", function() {
    const authForm = document.getElementById("auth-form");

    if (authForm) {
        authForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            
            fetch('/api/auth/', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.access_token && data.refresh_token) {
                    deleteAllCookies();
                    storeTokens(data.access_token, data.refresh_token);
                    startSessionTimer(5 * 60); // Inicia el temporizador con 5 minutos
                    window.location.href = '/api/inventario/';
                } else {
                    console.error('Error en la autenticación:', data);
                    alert('Error al autenticar. Por favor, intenta de nuevo.');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud de autenticación:', error);
                alert('Error al autenticar. Por favor, intenta de nuevo.');
            });
        });
    }

    // Función para almacenar los tokens
    function storeTokens(access_token, refresh_token) {
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        document.cookie = `access_token=${access_token}; path=/;`;
        document.cookie = `refresh_token=${refresh_token}; path=/;`;
        console.log('Tokens almacenados:', { access_token, refresh_token });
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
});
 