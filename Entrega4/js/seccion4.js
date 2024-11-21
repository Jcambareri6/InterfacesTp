const seccion4 = document.querySelector('.seccion4');
const image = seccion4.querySelector('img');


seccion4.addEventListener('mousemove', (event) => {
  const rect = seccion4.getBoundingClientRect(); 
  const mouseX = event.clientX - rect.left; 
  const mouseY = event.clientY - rect.top; 


  const offsetX = (mouseX / rect.width - 0.5) * -20; 
  const offsetY = (mouseY / rect.height - 0.5) * -20;


  image.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

seccion4.addEventListener('mouseleave', () => {
  image.style.transform = 'translate(0, 0)';
});
