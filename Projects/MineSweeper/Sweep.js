var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let mousex;
let mousey;
let sqaures = [];
ctx.font = "30px Arial";

class Square{
    
    constructor(x,y,h,w, isVisible, hasMine){
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.isVisible = isVisible;
        this.hasMine = hasMine;
        this.arrX;
        this.arrY;
        this.numMines;
        this.isVisited;
    }  
    draw(){
        ctx.fillStyle = "black";
        ctx.strokeRect(this.x,this.y,this.w,this.h);
        if(!this.isVisible){
            ctx.fillStyle = "grey";
            ctx.fillRect(this.x+1,this.y+1, this.w-1, this.h-1);   
        }else if(this.hasMine && this.isVisible){
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x+1,this.y+1, this.w-1, this.h-1);  
        }else{
            ctx.fillStyle = "red";
            if(this.numMines>0)
                ctx.fillText( this.numMines + "", this.x+(this.w/2-8), this.y+(this.h/2+8))
           
        }  
    }

    checkcollision(){
        if(this.hasMine){
            if((mousex>=this.x && mousex<=this.x+this.w)&& (mousey>=this.y && mousey<=(this.y+this.h)) ){
                this.isVisible = true;
                console.log("dead")
            }
        }else{
            if((mousex>=this.x && mousex<=this.x+this.w)&& (mousey>=this.y && mousey<=(this.y+this.h)) ){
                this.isVisible = true;
                if(this.numMines == 0){
                    clearMinesAroundWithZero(this.arrX, this.arrY)
                    
                }

            }
        }
    }

}

document.addEventListener("mousedown", (e) =>{
    var rect = canvas.getBoundingClientRect();
    
    mousex = e.clientX - rect.left
    mousey = e.clientY - rect.top
}, false);


function main(){

        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawSquares();
        checkHit();
    
    
}



function makeSquares(){
    
    for(let x = 0; x<canvas.width; x+=50){
        let squaresY = [];
        for(let y = 0; y<canvas.height; y+=50){
            let ran = Math.round(Math.random()*10);
            if(ran == 5){
                let a = new Square(x,y,50,50,false,true);
                squaresY.push(a);
            }else{
                let a = new Square(x,y,50,50,false,false);
                squaresY.push(a);
            }
            
           
        }
        sqaures.push(squaresY)
    }

}

function minesAround(x,y){
    const MINES_AROUND = 8;
    let numMines = 0;
        for(let i = 0; i<MINES_AROUND; i++){
            try{
                switch (i) {
                    case 0:
                        numMines = sqaures[x-1][y-1].hasMine?numMines+1:numMines
                        break;
                    case 1:
                        numMines = sqaures[x][y-1].hasMine?numMines+1:numMines
                        break;
                    case 2:
                        numMines = sqaures[x+1][y-1].hasMine?numMines+1:numMines
                        break;
                    case 3:
                        numMines = sqaures[x-1][y].hasMine?numMines+1:numMines
                        break;
                    case 4:
                        numMines = sqaures[x+1][y].hasMine?numMines+1:numMines
                        break;
                    case 5:
                        numMines = sqaures[x-1][y+1].hasMine?numMines+1:numMines
                        break;
                    case 6:
                        numMines = sqaures[x][y+1].hasMine?numMines+1:numMines
                        break;
                    case 7:
                        numMines = sqaures[x+1][y+1].hasMine?numMines+1:numMines
                        break;
                    }
            }catch{
                continue;
            }
            
        }
    
    return numMines;
}

function clearMinesAroundWithZero(x,y){
    if (sqaures[x][y].visited) return; // If already visited, return
    sqaures[x][y].visited = true
  for (let i = 0; i < 8; i++) {
    try{
        switch (i) {
            case 0:
                sqaures[x-1][y-1].numMines == 0 ?(sqaures[x-1][y-1].isVisible = true, clearMinesAroundWithZero(x-1,y-1)):sqaures[x-1][y-1].isVisible = true;
                break;
            case 1:
                sqaures[x][y-1].numMines == 0?(sqaures[x][y-1].isVisible = true,clearMinesAroundWithZero(x,y-1)):sqaures[x][y-1].isVisible = true
                break;
            case 2:
                sqaures[x+1][y-1].numMines == 0?(sqaures[x+1][y-1].isVisible = true,clearMinesAroundWithZero(x+1,y-1)):sqaures[x+1][y-1].isVisible = true
                break;
            case 3:
                sqaures[x-1][y].numMines == 0?(sqaures[x-1][y].isVisible = true,clearMinesAroundWithZero(x-1,y)):sqaures[x-1][y].isVisible = true
                break;
            case 4:
                sqaures[x+1][y].numMines == 0?(sqaures[x+1][y].isVisible = true,clearMinesAroundWithZero(x+1,y)):sqaures[x+1][y].isVisible = true
                break;
            case 5:
                sqaures[x-1][y+1].numMines == 0?(sqaures[x-1][y+1].isVisible = true,clearMinesAroundWithZero(x-1,y+1)):sqaures[x-1][y+1].isVisible = true
                break;
            case 6:
                sqaures[x][y+1].numMines == 0?(sqaures[x][y+1].isVisible = true,clearMinesAroundWithZero(x,y+1)):sqaures[x][y+1].isVisible = true
                break;
            case 7:
                sqaures[x+1][y+1].numMines == 0?(sqaures[x+1][y+1].isVisible = true,clearMinesAroundWithZero(x+1,y+1)):sqaures[x+1][y+1].isVisible = true
                break;
            }
    }catch{
        continue;
    }
    
  }
  return 0;
    
}

function checkHit(){
    for(let i = 0; i<sqaures.length; i++){
        for(let z = 0; z<sqaures[i].length; z++){
            let d = sqaures[i][z];
            d.checkcollision();
        }
    }
}


let once = true;
function drawSquares(){
    for(let i = 0; i<sqaures.length; i++){
        for(let z = 0; z<sqaures[i].length; z++){
            sqaures[i][z].arrX = i;
            sqaures[i][z].arrY = z;
            let d = sqaures[i][z];
            d.draw()
        }
    }
    if(once){
       for(let i = 0; i<sqaures.length; i++){
            for(let z = 0; z<sqaures[i].length; z++){
                sqaures[i][z].numMines = minesAround(i,z);
                
            }
        } 
        once = false;
    }
    
    
}
makeSquares();
let int = setInterval(main, 5)

