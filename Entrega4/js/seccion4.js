const seccion4 = document.querySelector('.seccion4');
const image = seccion4.querySelector('img');

// Escuchar el movimiento del mouse en la sección
seccion4.addEventListener('mousemove', (event) => {
  const rect = seccion4.getBoundingClientRect(); // Obtiene el tamaño y posición de la sección
  const mouseX = event.clientX - rect.left; // Coordenada X del mouse dentro de la sección
  const mouseY = event.clientY - rect.top; // Coordenada Y del mouse dentro de la sección

  // Calcular el desplazamiento en la dirección opuesta
  const offsetX = (mouseX / rect.width - 0.5) * -20; // Ajusta el valor -20 según la intensidad
  const offsetY = (mouseY / rect.height - 0.5) * -20;

  // Aplica la transformación a la imagen
  image.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

// Resetear la posición cuando el mouse sale de la sección
seccion4.addEventListener('mouseleave', () => {
  image.style.transform = 'translate(0, 0)';
});
