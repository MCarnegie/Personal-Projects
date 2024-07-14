import Room from "http://127.0.0.1:5500/Game/Enviorment/Room.js";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

export default class Player{
    constructor(x,y, location){
        this.x = x;
        this.y = y
        this.r = 20
        this.rightPressed = false;
        this.leftPressed = false;
        this.upPressed = false;
        this.downPressed = false;
        this.location= location
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
    }

    movePlayer(){
        const speed = 5;


        let dx = 0;
        let dy = 0;

        if (this.rightPressed) {
            dx += 1;
        }
        if (this.leftPressed) {
            dx -= 1;
        }
        if (this.downPressed) {
            dy += 1;
        }
        if (this.upPressed) {
            dy -= 1;
        }

        
        if (dx !== 0 && dy !== 0) {
            const length = Math.sqrt(dx * dx + dy * dy);
            dx /= length;
            dy /= length;
        }

        this.x += dx * speed;
        this.y += dy * speed;
    }

    playerColision(level){
        
        if(this.x+this.r>=canvas.width){
            try {
                if(level.layout[this.location.y][this.location.x+1] instanceof Room){
                    this.location.x++
                    this.x = this.r
                }else{
                    this.x = canvas.width-this.r
                }
            } catch (error) {
                this.x = canvas.width-this.r
            }
            
                
            
            
        }
        if(this.x-this.r<0){
            try {
                if(level.layout[this.location.y][this.location.x-1] instanceof Room){
                    this.location.x--
                    this.x = canvas.width-this.r
                }else{
                    this.x = this.r
                }
            } catch (error) {
                this.x = this.r
            }
            
            
        }
        if(this.y+this.r>=canvas.height){
            try {
                if(level.layout[this.location.y+1][this.location.x] instanceof Room){
                    this.location.y++
                    this.y = this.r
                }else{
                    this.y = canvas.height-this.r
                }
            } catch (error) {
                this.y = canvas.height-this.r
            }
       
        }
        if(this.y-this.r<0){
            try {
                if(level.layout[this.location.y-1][this.location.x] instanceof Room){
                    this.location.y--
                    this.y = canvas.height-this.r
                }else{
                    this.y = this.r
                }
            } catch (error) {
                this.y = this.r
            }
            
                
            
            
        }
    }


}

