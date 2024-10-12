document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const content = document.querySelector('.content');
    const loadingOverlay = document.querySelector('.loading-overlay');

    let progress = 0;
    const loadingTime = 5000;
    const interval = 95; 

    const loadingInterval = setInterval(() => {
        progress += (interval / loadingTime) * 100; // Calcular porcentaje
       
        progressText.textContent = `${Math.floor(progress)}%`;

        if (progress >= 100) {
            clearInterval(loadingInterval);
            loadingOverlay.style.display = 'none'; // Ocultar el overlay
            content.style.filter = 'blur(0)'; // Quitar el desenfoque
        }
    }, interval);
});