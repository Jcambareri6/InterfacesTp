document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
  
    const checkCards = () => {
      const triggerBottom = window.innerHeight * 0.9;
      const triggerTop = window.innerHeight * 0.1;
  
      cards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const cardBottom = card.getBoundingClientRect().bottom;
  
        // Verifica si la tarjeta está visible en la ventana
        if (cardTop < triggerBottom && cardBottom > triggerTop) {
          setTimeout(() => {
            card.classList.add('visible');
          }, index * 600); // Retraso entre tarjetas
        } else {
          setTimeout(() => {
            card.classList.remove('visible');
          }, index * 300); // Elimina la clase al salir
        }
      });
    };
  
    window.addEventListener('scroll', checkCards);
    checkCards(); // Ejecuta al cargar la página
  });
  