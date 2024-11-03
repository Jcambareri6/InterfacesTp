class ficha  {
    constructor(posX, posY, ctx,radio,src,equipo) {
        this.posX=posX;
        this.posY= posY;
        this.ctx=ctx;
        this.initialPosX = posX;  
        this.initialPosY = posY;
        this.radio=radio;
        this.seleccionada=false;
        this.posicionada=false;
        this.isDraggin= false;
        
        this.img = new Image();
        this.src= src
        this.equipo = equipo

        this.setImagen(src)
   
        this.img.onload = () => {
            this.draw(); 
        };
        console.log("instanciado")
      
    }
    

    setPosicionInicial(x, y) {
        this.initialPosX = x;
        this.initialPosY = y;
    }
    resetPosicionInicial() {
        this.posX = this.initialPosX;
        this.posY = this.initialPosY;
    }

    setImagen(src){
        this.img.src = src;
    }
    draw() {
       
        this.ctx.beginPath();
       
        this.ctx.drawImage(
            this.img, 
            this.posX - this.radio,   
            this.posY - this.radio,  
            this.radio * 2,         
            this.radio * 2            
        );
    
        
        this.ctx.fill();
        this.ctx.closePath();
    }
   
   
    isMouseOver(x = 0, y = 0) {
        let distance = Math.sqrt((x - this.posX) ** 2 + (y - this.posY) ** 2);
       
        return distance <= this.radio;  // Compara con el radio
    }
        // Getter y Setter para "seleccionada"
    setSeleccionada(seleccionada) {
        this.seleccionada = seleccionada;
    }

    getSeleccionada() {
        return this.seleccionada;
    }
    getPosicionada(){
        return this.posicionada;
    }
    setPosicionada(posicionada){
         this.posicionada=posicionada;
    }

    // Getter y Setter para "isDraggin"
    setIsDraggin(isDraggin) {
        this.isDraggin = isDraggin;
    }

    getIsDraggin() {
        return this.isDraggin;
    }

    // Getter y Setter para "posX"
    setPosX(posX) {
        this.posX = posX;
    }

    getPosX() {
        return this.posX;
    }

    // Getter y Setter para "posY"
    setPosY(posY) {
        this.posY = posY;
    }

    getPosY() {
        return this.posY;
    }

    // Getter y Setter para "radio"
    setRadio(radio) {
        this.radio = radio;
    }

    getRadio() {
        return this.radio;
    }

    setEquipo(equipo) {
        this.equipo = equipo;
    }

    getEquipo() {
        return this.equipo;
    }
   


}