document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector(".card-front form");
    const registerForm = document.querySelector(".card-back form");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        loginForm.submit();  // Enviar el formulario sin AJAX por ahora
    });

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        registerForm.submit();  // Enviar el formulario sin AJAX por ahora
    });

    const showRegisterLink = document.getElementById("show-register");
    const showLoginLink = document.getElementById("show-login");

    showRegisterLink.addEventListener("click", function() {
        clearErrors();
    });

    showLoginLink.addEventListener("click", function() {
        clearErrors();
    });

    function clearErrors() {
        const errorMessages = document.querySelectorAll(".messages");
        errorMessages.forEach(container => container.innerHTML = "");
    }
});
