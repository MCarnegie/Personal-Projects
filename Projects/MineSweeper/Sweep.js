var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let mousex;
let mousey;
let sqaures = [];
ctx.font = "30px Arial";

class Square{
    numMines = 0;
    constructor(x,y,h,w, isVisible, hasMine){
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.isVisible = isVisible;
        this.hasMine = hasMine;
        


    }  

    draw(){
        ctx.fillStyle = "black";
        ctx.strokeRect(this.x,this.y,this.w,this.h);
        if(!this.isVisible){
            ctx.fillStyle = "grey";
            ctx.fillRect(this.x+1,this.y+1, this.w-1, this.h-1);   
        }else{
            ctx.fillStyle = "red";
            ctx.fillText(this.numMines + "", this.x+(this.w/2), this.y+(this.h/2))
        }
             
         
            
    }

    checkcollision(){

    }

}

document.addEventListener("mousedown", mouseDownHandler, false);
//document.addEventListener("mouseup", mouseUphandler, false);
function mouseDownHandler(e){
    mousex = e.screenX;
    mousey = e.screenY;
}

function main(){
    drawSquares();
}

function makeSquares(){
    for(let x = 0; x<canvas.width; x+=50){
        for(let y = 0; y<canvas.height; y+=50){
            let a = new Square(x,y,50,50,true,false);
            sqaures.push(a);
        }
    }
}
makeSquares();
function drawSquares(){
    for(let i = 0; i<sqaures.length; i++){
        let a = sqaures[i];
        a.draw();
    }
}

setInterval(main, 5);