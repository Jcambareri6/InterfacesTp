class btnModalidad{
    constructor(ctx, posX, posY,modalidadJuego){
        this.ctx = ctx;
        this.posX=posX;
        this.posY=posY;
        this.modalidadJuego=modalidadJuego;
        this.width = 250;
        this.height = 46;
        this.color = "#163B84";
        this.borderRadius = 10;


    }
    draw(){
        const { ctx, posX, posY, width, height, color, borderRadius } = this;

        // Iniciar el dibujo del botón con bordes redondeados
        ctx.beginPath();
        ctx.moveTo(posX + borderRadius, posY);
        ctx.lineTo(posX + width - borderRadius, posY);
        ctx.quadraticCurveTo(posX + width, posY, posX + width, posY + borderRadius);
        ctx.lineTo(posX + width, posY + height - borderRadius);
        ctx.quadraticCurveTo(posX + width, posY + height, posX + width - borderRadius, posY + height);
        ctx.lineTo(posX + borderRadius, posY + height);
        ctx.quadraticCurveTo(posX, posY + height, posX, posY + height - borderRadius);
        ctx.lineTo(posX, posY + borderRadius);
        ctx.quadraticCurveTo(posX, posY, posX + borderRadius, posY);
        ctx.closePath();

        // Rellenar el botón
        ctx.fillStyle = color;
        ctx.fill();

        // Configuración del texto
        ctx.fillStyle = "#FFFFFF"; // Color del texto en blanco
        ctx.font = "20px roboto mono";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Dibujar el texto en el centro del botón
        ctx.fillText(
            `${this.modalidadJuego} en línea`,
        (posX + width / 2),
            posY + height / 2
        );
    
    }
}