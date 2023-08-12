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
        }else if(this.hasMine){
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x+1,this.y+1, this.w-1, this.h-1);  
        }else{
            ctx.fillStyle = "red";
            ctx.fillText(this.numMines + "", this.x+(this.w/2-8), this.y+(this.h/2+8))
        }
             
         
            
    }

    checkcollision(){
        if(this.hasMine){
            if((mousex>=this.x && mousex<=this.x+this.w)&& (mousey>=this.y && mousey<=(this.y+this.h)) ){
                
            }
        }else{
            if((mousex>=this.x && mousex<=this.x+this.w)&& (mousey>=this.y && mousey<=(this.y+this.h)) ){
                this.isVisible = true;
                

            }
        }
    }

}

document.addEventListener("mousedown", mouseDownHandler, false);
function mouseDownHandler(e){
    var rect = canvas.getBoundingClientRect();
    
        mousex = e.clientX - rect.left
        mousey = e.clientY - rect.top
    
}

function main(){

        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawSquares();
        checkHit();
    
    
}

function makeSquares(){
    for(let x = 0; x<canvas.width; x+=50){
        for(let y = 0; y<canvas.height; y+=50){
            let ran = Math.round(Math.random()*10);
            if(ran == 5){
                let a = new Square(x,y,50,50,true,true);
                sqaures.push(a);
            }else{
                let a = new Square(x,y,50,50,false,false);
                sqaures.push(a);
            }
            
           
        }
    }
}

function checkHit(){
    for(let i = 0; i<sqaures.length; i++){
        sqaures[i].checkcollision();
    }
}

makeSquares();
function drawSquares(){
    for(let i = 0; i<sqaures.length; i++){
        let a = sqaures[i];
        a.draw();
    }
}

let int = setInterval(main, 5)