const titulo = document.querySelector('.tituloJuego');
const parrafo = document.querySelector('.parrafoJuego');
const partes = document.querySelector('.partesJuego');
const figura4 = document.querySelector('.figura4');
const figura5 = document.querySelector('.figura5');

const iframe = document.getElementById('videosec6');
const figura = document.getElementById('figurasec6');
const seccion6 = document.querySelector(".seccion6");


if (iframe) iframe.style.transform = "translateY(0px) translateX(0px)";
if (figura) figura.style.transform = "translateY(0px) translateX(0px)";

window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;

    
    titulo.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    parrafo.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    partes.style.transform = `translateY(${scrollPosition * 0.1}px) translateX(${scrollPosition * -0.1}px)`;

    figura4.style.transform = `translateY(${scrollPosition * 0.06}px) translateX(${scrollPosition * -0.03}px)`;
    figura5.style.transform = `translateY(${scrollPosition * 0.14}px)`;


    const seccionRect = seccion6.getBoundingClientRect();

 
    if (seccionRect.top < window.innerHeight && seccionRect.bottom > 0) {
        const seccionHeight = seccionRect.height || 1;
        const scrollRatio = Math.min(1, Math.max(0, (window.innerHeight - seccionRect.top) / seccionHeight)); // Ratio entre 0 y 1

 
        if (iframe) {
            iframe.style.transform = `translateY(${scrollRatio * 100}px) translateX(${scrollRatio * -80}px)`;
        }

        if (figura) {
            figura.style.transform = `translateY(${scrollRatio * -200}px) translateX(${scrollRatio * 4}px)`;
        }
    }
});






