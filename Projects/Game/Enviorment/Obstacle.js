var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

export default class Obstacle{
    constructor(x, y, w, h, color){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.color = color
    }

    draw(){
       ctx.beginPath();
       ctx.rect(this.x, this.y, this.w, this.h)
       ctx.fillStyle = this.color;
       ctx.fill();
       ctx.stroke();
    }

    /*returns new coordinates of thing that went into it so it dosent go through it */
    coloision(ox, oy, or){
        
        let x2 = this.x + this.w
        let y2 = this.y + this.h
        
        if(oy + or>this.y && oy-or<y2 && ox+or>this.x && ox-or<x2){
            if(oy-or<y2 && oy-or>this.y && ox - or>this.x && ox + or<x2 ){
                oy = y2+or;
            }else if(oy+or>this.y && ox - or>this.x && ox + or<x2){
                oy = this.y-or
            }else if(ox-or<x2 &&ox-or>this.x && oy-or>this.y && oy+or<y2){
                ox = x2+or
            }else if(ox+or>this.x && oy-or>this.y && oy+or<y2){
                ox = this.x-or;
            }
        }
       
        return {ox, oy}
    }
}