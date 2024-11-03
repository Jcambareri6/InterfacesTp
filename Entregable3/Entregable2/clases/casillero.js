class casillero {
    constructor (posX,posY,ctx,width,height,src,posCol){
        this.posX=posX;
        this.posY= posY;
        this.ctx=ctx;
        this.width=width;
        this.height=height;
         this.ficha = null;
         this.img= new Image();
         this.setImagen(src)
        this.img.onload = () => {
            this.draw(); 
        };
        this.posCol=posCol;
       
    }
    
    draw(){
        this.ctx.beginPath();
       
        this.ctx.drawImage(
            this.img, 
            this.posX ,   
            this.posY ,  
            this.width,         
            this.height            
        );
        this.ctx.fill();
        this.ctx.closePath();
    }
    getFicha(){
        return this.ficha;
    }
    setFicha(ficha){
        this.ficha=ficha;
    }
    setImagen(src){
        this.img.src = src;
    }
    
}