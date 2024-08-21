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
                    storeTokens(data.access_token, data.refresh_token);
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
    } else {
        console.error('Formulario de autenticación no encontrado');
    }

    // Función para almacenar los tokens
    function storeTokens(access_token, refresh_token) {
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        console.log('Tokens almacenados:', { access_token, refresh_token });
    }
});
