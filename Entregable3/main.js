let canvas = document.getElementById("canvasP");
let ctx = canvas.getContext('2d');

ctx.beginPath();
dibujarTablero();

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
 let Timer = document.querySelector('.timer-display')
 let timerSeconds = 80;
  let interval = null;
  let isPaused = false;
 console.log(containerPlayer2);
 console.log(nameJugadorAliens);
 console.log(nameJugadorHumano);

 let btn_return = document.querySelector(".btn_return");
 btn_return.addEventListener('click',()=>{
    console.log("entre a reinicar")
    borrarTablero();
    dibujarTablero();
})

 let btn_menu = document.querySelector(".btn_home ");
 btn_menu.addEventListener('click',()=>{
    console.log("entre a menu")
    borrarTablero();
    dibujarTablero();
    contenedorJuego.classList.remove('none')
    contenedorJuego.classList.add('contenedorJuego')
    menuJuego.style.display="none";
    containerPlayer1.classList.remove('namePlayer1')
    containerPlayer2.classList.remove('namePlayer2')
    containerPlayer1.classList.add('none')
    containerPlayer2.classList.add('none')
})
 
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
    console.log(ruta)

     let explodeSrc = ruta.split("/")
     console.log(explodeSrc)
    fichaHumanoElegida= `${explodeSrc[3]}/${explodeSrc[4]}`
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
         fichaAliensElegida= `${explodeSrc[5]}/${explodeSrc[6]}`
  

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
        startTimer();
        juego.play();
        
        

       


       

    
    });
});


// Función para iniciar el temporizador
function startTimer() {
      timerInterval = setInterval(updateTimer, 1000); // Actualiza cada segundo

}
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

  function iniciarJuego(){
    contenedorJuego.classList.add('none');
    menuJuego.style.display="flex";
 }
 function updateTimer() {
  const minutes = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
  const seconds = String(timerSeconds % 60).padStart(2, '0');
  Timer.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (interval) return; 

  interval = setInterval(() => {
      if (!isPaused) {
          timerSeconds--;
          updateTimer();

          if (timerSeconds <= 0) {
              clearInterval(interval);
              interval = null;
          }
      }
  }, 1000);
}



