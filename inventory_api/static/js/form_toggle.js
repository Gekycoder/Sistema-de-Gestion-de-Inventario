document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('show-register').addEventListener('click', function() {
        document.querySelector('.card').classList.add('flipped');
    });

    document.getElementById('show-login').addEventListener('click', function() {
        document.querySelector('.card').classList.remove('flipped');
    });
});

// Permite el giro de la tarjeta