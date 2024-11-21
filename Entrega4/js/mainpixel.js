// Logo Header
const header = document.getElementById("header1");
const logoHeader = document.getElementById("fotoLogo");
const imag = document.querySelectorAll('.img-sec4 img');
const textos = document.querySelectorAll('.textos > div');
let anchoInicial = 560;
let altoInicial = 320;
let anchoFinal = 150;
let alturaFinal = 86;
let scrollLimite = 300;

window.addEventListener("scroll", function () {
    const scrollEvento = window.scrollY;
    // punto 4 
    animarHeader(scrollEvento)
    //parallax seccion 1 
    animarParallaxSeccion1(scrollEvento)
    animarSeccionTextos(scrollEvento);




});
function animarHeader(scrollY) {
    let scrollTop = Math.min(scrollY, scrollLimite);
    let anchoActual = anchoInicial - (anchoInicial - anchoFinal) * (scrollTop / scrollLimite); // calcula porc para achicar img
    let topActual = Math.min(scrollTop, 150);

    // Aplicar los nuevos valores al logo
    logoHeader.style.width = `${anchoActual}px`;
    logoHeader.style.transform = `translateY(-${topActual}px)`;

    if (window.scrollY >= scrollLimite) {

        // Asegurarte de que tenga 'headerScroll'
        header.classList.add('headerScroll');
    }
};



// Menú (Sección 2)
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.btnMenu');
    const menuItems = document.querySelector('.menuItems');

    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('open');
        menuItems.classList.toggle('open');
    });
});

// Fondo que cambia automáticamente (Sección 2)
const imagenes = [
    'img/sector2/FondoDiv.png',
    'img/sector2/fondodiv2.png',
    'img/sector2/fondodiv3.png',
    'img/sector2/fondodiv4.png'
];

const imgFondo = document.getElementById('img-fondo');
let indiceActual = 0;

function cambiarFondo() {
    imgFondo.style.backgroundImage = `url(${imagenes[indiceActual]})`;
    indiceActual = (indiceActual + 1) % imagenes.length; // Ciclar el índice
}

setInterval(cambiarFondo, 3000);
cambiarFondo();

// Sección 5: Cambio de imágenes en scroll sincronizado con textos


// Función para cambiar la imagen activa
function cambiarImagenActiva(index) {
    imag.forEach((img, i) => {
        if (i === index) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        } else {
            img.style.opacity = '0';
            img.style.transform = 'scale(1.1)';
        }
    });
}


function animarSeccionTextos() {
    textos.forEach((texto, index) => {
        const rect = texto.getBoundingClientRect();
        const visible = rect.top < window.innerHeight && rect.bottom > 0;

        if (visible) {
            cambiarImagenActiva(index);
        }
    });
}
function animarParallaxSeccion1(scrollY) {
    let elementos = document.querySelectorAll("[data-velocidad]");

    let initScroll = 170
    let limitScroll = 270

    elementos.forEach(elementoPrimerPlano => {
        mover(scrollY, initScroll, limitScroll, elementoPrimerPlano,);
    })

}
function mover(scrollY, initScroll, limitScroll, elemento) {

    if (scrollY >= initScroll && scrollY <= limitScroll) {
        let velocidad = parseFloat(elemento.getAttribute("data-velocidad"));
        let movimiento = (scrollY - initScroll) * velocidad
        elemento.style.transform = `translateY(${movimiento}px)`;

    }
}
let currentImage = ""; 

function animarSeccionTextos(scrollY) {
    let img = document.getElementById("imagenDinamica");
    let seccionesTxt = document.querySelectorAll("[data-img]");
    
    seccionesTxt.forEach(seccion => {
        const rect = seccion.getBoundingClientRect();
        const sectionTop = seccion.offsetTop-200;
        const sectionHeight = seccion.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            const newImage = seccion.getAttribute('data-img');
            
            // Solo cambia la imagen si es diferente de la actual
            if (currentImage !== newImage) {
                currentImage = newImage; // Actualiza la imagen activa
                img.classList.remove('img-animada');

                setTimeout(() => {
                    img.src = newImage;
                    img.classList.add('img-animada');
                }, 150);
            }
        }
    });
}
// Inicializar la primera imagen como activa
cambiarImagenActiva(0);
