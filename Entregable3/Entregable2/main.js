let canvas = document.getElementById("canvasP");
let ctx = canvas.getContext('2d');

dibujarTablero();
ctx.beginPath();
let btnJugar= document.getElementById('btnJugar')
let fichaHumanoElegida = undefined;
let fichaAliensElegida=undefined;
 let fichasHumanos = document.querySelectorAll(".fichaHumano");
 let fichasAliens= document.querySelectorAll(".fichaAlien");
 let botonAnteriorHumanos = null;
 let btnAliensAnterior = null;
 let contenedorJuego= document.querySelector('#contenedorJuego');
 let nameJugadorHumano= document.querySelector('#inputHumanos');
 let nameJugadorAliens=document.querySelector('#inputAliens')
 let containerPlayer1 = document.querySelector('#nombreJugador1')
 let containerPlayer2= document.querySelector('#nombreJugador2')
 let menuJuego = document.querySelector('.menu-game');
 console.log(containerPlayer2);
 console.log(nameJugadorAliens);
 console.log(nameJugadorHumano);
// let btn_reinicar = document.querySelector(".btn_reinicar");
// btn_reinicar.addEventListener('click',reinicarJuego());
// let menu = document.querySelector(".menu");
// menu.addEventListener('click',volverMenu());
btnJugar.addEventListener("click",()=>{
   btnJugar.classList.add('none');
   contenedorJuego.classList.remove('none')
   contenedorJuego.classList.add('contenedorJuego')
   console.log(contenedorJuego)
})
fichasHumanos.forEach(btn => {
  btn.addEventListener('click', () => {
    
    
    if (botonAnteriorHumanos && botonAnteriorHumanos !== btn) {
        botonAnteriorHumanos.classList.remove('elegida');
    }

    let ruta = btn.src
     let explodeSrc = ruta.split("/")
     console.log(explodeSrc[4])
    fichaHumanoElegida= `${explodeSrc[4]}/${explodeSrc[5]}`
    console.log(fichaHumanoElegida);

    btn.classList.add('elegida');

    
    botonAnteriorHumanos = btn;
  });
});

fichasAliens.forEach(btn => {
    btn.addEventListener('click', () => {
      
      if (btnAliensAnterior && btnAliensAnterior !== btn) {
        btnAliensAnterior.classList.remove('elegida');
      }
  
          let ruta = btn.src
         let explodeSrc = ruta.split("/")
         console.log(explodeSrc[4])
         fichaAliensElegida= `${explodeSrc[4]}/${explodeSrc[5]}`
  

    btn.classList.add('elegida');
      btnAliensAnterior = btn;
    });
  });
  const botonesModalidad = document.querySelectorAll('.btnModalidad');
  botonesModalidad.forEach(boton => {
    boton.addEventListener('click', () => {
       
        const modalidad = boton.getAttribute('modalidad');
        
        if(fichaAliensElegida ==undefined ){
            fichaAliensElegida='img/fichaAliens1.png'
            
        }
        if(fichaHumanoElegida==undefined){
            fichaHumanoElegida='img/fichaHumanoide3.png'
        }
        if (nameJugadorAliens.value === "" && nameJugadorHumano.value === "") {
            nameJugadorAliens.value= "pepo";
            nameJugadorHumano.value= "rey";
        }
        containerPlayer1.classList.remove('none')
        containerPlayer2.classList.remove('none')
      
        containerPlayer1.classList.add('namePlayer1')
        containerPlayer2.classList.add('namePlayer2')
        menuJuego.style.display="flex";
        containerPlayer1.innerHTML=generarHtml(fichaHumanoElegida,nameJugadorHumano.value);
        containerPlayer2.innerHTML=generarHtml(fichaAliensElegida,nameJugadorAliens.value)
        console.log(generarHtml(fichaAliensElegida,nameJugadorAliens.value))

        borrarTablero();
        dibujarTablero();
        iniciarJuego();
        const juego = new Juego(modalidad,canvas,fichaAliensElegida,fichaHumanoElegida);
       
        juego.play();
        

       


       

    
    });
});
function generarHtml(ficha,name){
    let html = `
    <div class="containerPlayer">
      <img  src="${ficha}" alt="FichaPlayer">
      <h3>${name}</h3>
    </div>
    `
 
    return html
}

 function borrarTablero(){
 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function dibujarTablero(){


    let img = new Image();
    img.src = "./img/fondoCanvasPresentacion.png"
    img.onload = function () {
        ctx.drawImage(img,62, 0, canvas.width-124, canvas.height);
    };
}
// let juego1 = new Juego(6, canvas, ctx);
// juego1.play();
  function iniciarJuego(){
    contenedorJuego.classList.add('none');
    // btn_reinicar.classList.add('block');
    // menu.classList.add('block');
 }
  function reinicarJuego() {
    borrarTablero();
    dibujarTablero();
    iniciarJuego();
 }
  function volverMenu(){
    borrarTablero();
    contenedorJuego.classList.add('block');
    btn_reinicar.classList.add('none');
    menu.classList.add('none');
  }
 













