const titulo = document.querySelector('.tituloJuego');
const parrafo = document.querySelector('.parrafoJuego');
const partes = document.querySelector('.partesJuego');
const figura4 = document.querySelector('.figura4');
const figura5 = document.querySelector('.figura5');

const iframe = document.getElementById('videosec6');
const figura = document.getElementById('figurasec6');
const seccion6 = document.querySelector(".seccion6");

// Configuración inicial de los elementos
if (iframe) iframe.style.transform = "translateY(0px) translateX(0px)";
if (figura) figura.style.transform = "translateY(0px) translateX(0px)";

window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;

    // Animación de los elementos generales
    titulo.style.transform = `translateY(${scrollPosition * 0.1}px)`; 
    parrafo.style.transform = `translateY(${scrollPosition * 0.1}px)`; 
    partes.style.transform = `translateY(${scrollPosition * 0.1}px) translateX(${scrollPosition * -0.1}px)`; 

    figura4.style.transform = `translateY(${scrollPosition * 0.06}px) translateX(${scrollPosition * -0.03}px)`; 
    figura5.style.transform = `translateY(${scrollPosition * 0.14}px)`; 

    // Verifica si seccion6 está visible en el viewport
    const seccionRect = seccion6.getBoundingClientRect();

    // Calcular desplazamiento relativo solo si la sección es visible
    if (seccionRect.top < window.innerHeight && seccionRect.bottom > 0) {
        const seccionHeight = seccionRect.height || 1; // Evita división por 0
        const scrollRatio = Math.min(1, Math.max(0, (window.innerHeight - seccionRect.top) / seccionHeight)); // Ratio entre 0 y 1

        // Aplica transformaciones proporcionales
        if (iframe) {
            iframe.style.transform = `translateY(${scrollRatio * 100}px) translateX(${scrollRatio * -80}px)`;
        }

        if (figura) {
            figura.style.transform = `translateY(${scrollRatio * -200}px) translateX(${scrollRatio * 4}px)`;
        }
    }
});






