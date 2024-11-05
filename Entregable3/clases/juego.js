let turnoJugador = document.querySelector(".turnoPlayer");
let jugadorHumano= document.querySelector('#inputHumanos');
let jugadorAliens=document.querySelector('#inputAliens');


class Juego {
    constructor(Modalidad, canvas, fichaElegidaAliens, fichaElegidaHumanos) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.Modalidad = Modalidad;
        this.fichaElegidaAliens = fichaElegidaAliens;
        this.fichaElegidaHumanos = fichaElegidaHumanos;
        this.currentPlayer = "humanos";
        this.selectedFicha = null;
        this.tablero = this.setTablero(this.Modalidad);
        this.fichasAliens = [];
        this.fichasHumanos = [];

        this.iniciarFichas();
        this.actualizarTurnoJugador();  // Actualiza el texto al jugador actual
        this.mostrarTurno();
        setTimeout(() => this.ocultarTurno(), 2000);

        this.canvas.addEventListener('mousedown', this.MouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this.MouseUp.bind(this));
        this.canvas.addEventListener('mousemove', this.Move.bind(this));
    }

    iniciarFichas() {
        let tamañoX = 0;
        let tamañoY = 7;

        switch (this.Modalidad) {
            case '4':
                tamañoX = 6;
                this.generarFichas((tamañoX * tamañoY) / 2);
                break;
            case '5':
                tamañoX = 7;
                this.generarFichas((tamañoX * tamañoY) / 2);
                break;
            case '6':
                tamañoX = 8;
                this.generarFichas((tamañoX * tamañoY) / 2);
                break;
        }
    }

    generarFichas(cantFichas) {
        const posYMin = 100;
        const posYMax = 500;

        const tableroConfig = {
            4: { posX: 575, ancho: 360, margen: 150 },
            5: { posX: 545, ancho: 420, margen: 180 },
            6: { posX: 515, ancho: 480, margen: 200 },
            7: { posX: 485, ancho: 540, margen: 220 }
        };

        const tablero = tableroConfig[this.Modalidad];

        const getRandomPosition = (minX, maxX, minY, maxY) => {
            const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
            const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
            return { x, y };
        };

        for (let i = 0; i < cantFichas; i++) {
            const alienPos = getRandomPosition(tablero.posX + tablero.ancho + tablero.margen, tablero.posX + tablero.ancho + 100, posYMin, posYMax);
            let fichaAlien = new ficha(alienPos.x, alienPos.y, this.ctx, 35, this.fichaElegidaAliens, 'aliens');
            fichaAlien.setPosicionInicial(alienPos.x, alienPos.y);
            this.fichasAliens.push(fichaAlien);
        }

        for (let i = 0; i < cantFichas; i++) {
            const humanoPos = getRandomPosition(tablero.posX - 100, tablero.posX - tablero.margen, posYMin, posYMax);
            let fichaHumano = new ficha(humanoPos.x, humanoPos.y, this.ctx, 35, this.fichaElegidaHumanos, 'humanos');
            fichaHumano.setPosicionInicial(humanoPos.x, humanoPos.y);
            this.fichasHumanos.push(fichaHumano);
        }
    }

    setTablero(Modalidad) {
        let tablero;

        switch (Modalidad) {
            case "4":
                tablero = new Tablero(570, 70, this.ctx, 6, 8, null);
                break;
            case "5":
                tablero = new Tablero(545, 70, this.ctx, 7, 8, null);
                break;
            case "6":
                tablero = new Tablero(515, 70, this.ctx, 8, 8, null);
                break;
        }

        return tablero;
    }

    actualizarTurnoJugador() {
        if (this.currentPlayer=='humanos'){
        turnoJugador.innerHTML = `<h3>Turno de: ${jugadorHumano.value}</h3>`;
        }else{
        turnoJugador.innerHTML = `<h3>Turno de: ${jugadorAliens.value}</h3>`;
        }
    }

    mostrarTurno() {
        turnoJugador.style.display = "flex";
    }

    ocultarTurno() {
        turnoJugador.style.display = "none";
    }

    gestionarTurnos() {
        if (this.currentPlayer === 'humanos') {
            this.currentPlayer = 'aliens';
        } else {
            this.currentPlayer = 'humanos';
        }

        this.actualizarTurnoJugador();
        this.mostrarTurno();
        setTimeout(() => this.ocultarTurno(), 2000);
    }
    mostrarPopoverGanador(jugador) {
        const popoverGanador = document.querySelector('.ganador');
        // Actualiza el contenido del popover
        popoverGanador.querySelector('h1').innerText = `¡${jugador} ha ganado!`;
        popoverGanador.style.display = 'flex';  // Muestra el popover
    }

    mostrarPopoverEmpate() {
        const popoverEmpate = document.querySelector('.empate');
        // Actualiza el contenido del popover
        popoverEmpate.querySelector('h1').innerText = `¡Es un empate!`;
        popoverEmpate.style.display = 'flex';  // Muestra el popover
    }
    MouseDown(e) {
        this.fichasHumanos.forEach(ficha => {
            if (!ficha.getPosicionada() && ficha.isMouseOver(e.layerX, e.layerY)) {
                this.configurarDrag("humanos", ficha);
            }
        });

        this.fichasAliens.forEach(ficha => {
            if (!ficha.getPosicionada() && ficha.isMouseOver(e.layerX, e.layerY)) {
                this.configurarDrag("aliens", ficha);
            }
        });
    }

    MouseUp(e) {
        if (this.selectedFicha && this.selectedFicha.getIsDraggin() && this.selectedFicha.getSeleccionada()) {
            if (this.tablero.dropZone(e.layerX, e.layerY)) {
                const columna = Math.floor((e.layerX - this.tablero.posX) / this.tablero.widthCelda);
                let filaFichaPosicionada = this.tablero.posicionarFicha(columna - 1, this.selectedFicha);

                if (filaFichaPosicionada != -1) {
                    this.selectedFicha.setPosicionada(true);
                    this.tablero.animarCaidaFicha(this, columna - 1, filaFichaPosicionada, this.selectedFicha);
                    this.selectedFicha.setIsDraggin(false);
                    this.reDrawCanvas();
                    this.redibujarFichas();

                    if (this.tablero.hayGanador(this.currentPlayer, this.Modalidad, filaFichaPosicionada, columna - 1)) {
                        setTimeout(() => {
                            this.mostrarPopoverGanador(this.currentPlayer);//muestra popoverganador
                        }, 1000);
                    }/*
                        // Verificar si hay empate
                    if (this.tablero.hayEmpate(this.fichasAliens.length + this.fichasHumanos.length)) {
                       mostrarPopoverEmpate();
                        return;  // Evita que el turno cambie si hay empate
                    }
                    */

                    this.gestionarTurnos();
                    this.selectedFicha = null;
                } else {
                    this.reset();
                }
            } else {
                this.reset();
            }
        }
    }

    Move(e) {
        if (this.selectedFicha && this.selectedFicha.getIsDraggin() && this.selectedFicha.getSeleccionada()) {
            let newX = e.layerX - this.canvas.offsetLeft;
            let newY = e.layerY;
            this.selectedFicha.setPosX(newX);
            this.selectedFicha.setPosY(newY);
            this.reDrawCanvas();
            this.selectedFicha.draw();
            this.redibujarFichas();
        }
    }

    reDrawCanvas() {
        // Cargar la imagen de fondo
        let img = new Image();
        img.src = "./img/fondoCanvasPresentacion.png";

        // Redibujar el canvas después de cargar la imagen
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Limpia el canvas
            this.ctx.drawImage(img, 62, 0, this.canvas.width - 124, this.canvas.height); // Dibuja la imagen de fondo

            // Redibuja el tablero y las fichas después de la imagen de fondo
            this.tablero.drawTablero();  // Dibuja el tablero
            this.redibujarFichas();      // Redibuja las fichas
        };
    }

    reset() {
        this.selectedFicha.setIsDraggin(false);
        this.selectedFicha.setSeleccionada(false);
        this.selectedFicha.resetPosicionInicial();
        this.reDrawCanvas();
        this.redibujarFichas();
        this.selectedFicha = null;
    }

    redibujarFichas() {
        this.fichasAliens.forEach(ficha => ficha.draw());
        this.fichasHumanos.forEach(ficha => ficha.draw());
    }

    configurarDrag(turno, ficha) {
        if (this.currentPlayer === turno) {
            this.selectedFicha = ficha;
            this.selectedFicha.setSeleccionada(true);
            this.selectedFicha.setIsDraggin(true);
        }
    }
}
