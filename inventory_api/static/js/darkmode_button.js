document.getElementById('dark-mode-toggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', this.checked);
    document.documentElement.classList.toggle('dark-mode', this.checked);
});

