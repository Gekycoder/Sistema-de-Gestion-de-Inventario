document.addEventListener("DOMContentLoaded", function() {
    // Primero, selecciono el formulario de inicio de sesión (card-front) y el formulario de registro (card-back).
    const loginForm = document.querySelector(".card-front form");
    const registerForm = document.querySelector(".card-back form");

    // Cuando el formulario de inicio de sesión se envía, detengo el envío normal del formulario y lo envío manualmente.
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();  // Evito que el formulario se envíe de forma predeterminada.
        loginForm.submit();  // Envío el formulario sin utilizar AJAX por ahora.
    });

    // Hago lo mismo para el formulario de registro.
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();  // Evito el envío predeterminado del formulario.
        registerForm.submit();  // Envío el formulario manualmente sin AJAX.
    });

    // Selecciono los enlaces que alternan entre el formulario de registro y el de inicio de sesión.
    const showRegisterLink = document.getElementById("show-register");
    const showLoginLink = document.getElementById("show-login");

    // Cuando hago clic en el enlace para mostrar el formulario de registro, limpio los mensajes de error.
    showRegisterLink.addEventListener("click", function() {
        clearErrors();  // Limpio los mensajes de error si hay alguno.
    });

    // Lo mismo ocurre cuando hago clic en el enlace para mostrar el formulario de inicio de sesión.
    showLoginLink.addEventListener("click", function() {
        clearErrors();  // Limpio cualquier mensaje de error que pueda estar presente.
    });

    // Esta función recorre todos los contenedores de mensajes de error y los limpia.
    function clearErrors() {
        const errorMessages = document.querySelectorAll(".messages");
        errorMessages.forEach(container => container.innerHTML = "");  // Limpio el contenido HTML de los contenedores de mensajes.
    }
});
