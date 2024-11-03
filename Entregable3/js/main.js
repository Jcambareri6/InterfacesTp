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

    const flechasIzquierda = document.querySelectorAll('.flechaIzqAnimacion');
    const flechasDerecha = document.querySelectorAll('.flechaDerAnimacion');
    const carousels = document.querySelectorAll('.carrousel_grande');

    let currentIndex = 0;
    console.log(flechasDerecha);
    showCarousel(currentIndex);
    updateArrowVisibility(currentIndex);

    function showCarousel(index) {
        carousels.forEach((carousel, i) => {
            if (i === index) {
                carousel.classList.add('active');
                carousel.classList.remove('out');
            } else {
                carousel.classList.remove('active');
                carousel.classList.add('out');
            }
        });
        updateArrowVisibility(index);
    }

    function updateArrowVisibility(index) {
        if (index === 0) {
            flechasIzquierda.forEach(flecha => flecha.classList.add('displayNone'));
        } else {
            flechasIzquierda.forEach(flecha => flecha.classList.remove('displayNone'));
        }

        if (index === carousels.length - 1) {
            flechasDerecha.forEach(flecha => flecha.classList.add('displayNone'));
        } else {
            flechasDerecha.forEach(flecha => flecha.classList.remove('displayNone'));
        }
    }

    flechasDerecha.forEach(button => {
        button.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % carousels.length;
            showCarousel(currentIndex);
        });
    });

    flechasIzquierda.forEach(button => {
        button.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + carousels.length) % carousels.length;
            showCarousel(currentIndex);
        });
    });

    const popOverRegistro = document.querySelector("#registroExistoso");
    const formRegistro = document.querySelector("#form_registro");
    let overlay = document.querySelector('#overlay');

    // Verifica que el form y el overlay existan antes de agregar los event listeners
    if (formRegistro && popOverRegistro && overlay) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(popOverRegistro);
            popOverRegistro.showPopover();
            mostrarOverlay();
        });

        function mostrarOverlay() {
            overlay.classList.remove("hidden");
            overlay.classList.add("show");
            overlay.addEventListener('click', ocultarRegistroExitoso);
            popOverRegistro.addEventListener('click', ocultarRegistroExitoso); // Corregido el uso de popOverRegistro
        }

        function ocultarRegistroExitoso() {
            overlay.classList.add("hidden");
            popOverRegistro.classList.remove("show");
        }
    } else {
        console.error('El formulario o el overlay no existen en el DOM');
    }

    // Evento para el botón de carrito
    const carritoCards = document.querySelectorAll('.carritoCard');
    if (carritoCards.length > 0) {
        carritoCards.forEach((carrito) => {
            console.log('Se ha cargado el DOM y se está ejecutando el listener');

            carrito.addEventListener('click', () => {
                console.log('Evento click activado');
                carrito.classList.toggle('en-carrito');
            });
        });
    } else {
        console.error('No se encontraron elementos con la clase .carritoCard');
    }
});
