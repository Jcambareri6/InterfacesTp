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
            loadingOverlay.style.display = 'none'; 
            
            
        }
    }, interval);
});
const carrouselGrande = document.querySelector('.carrousel_grande');
const nextButton = document.querySelector('.flecha_der');
const prevButton = document.querySelector('.flecha_izq');

let scrollAmount = 0;

nextButton.addEventListener('click', () => {
    console.log("hola")
    carrouselGrande.scrollBy({
        top: 0,

        left: carrouselGrande.clientWidth, // Mueve el carrusel al ancho completo de una tarjeta
        behavior: 'smooth' // Transición suave
    });
});

prevButton.addEventListener('click', () => {
    carrouselGrande.scrollBy({
        top: 0,
        left: -carrouselGrande.clientWidth, // Mueve hacia la izquierda al ancho completo de una tarjeta
        behavior: 'smooth' // Transición suave
    });
});