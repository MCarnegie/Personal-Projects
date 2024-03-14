var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let mousex;
let mousey;
let sqaures = [];
ctx.font = "30px Arial";
let isRightDown = false;
let isLeftDown = false;
let minesOn = 0;
let numSquares = 0;

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
        this.marked = false;
    }  
    draw(){
        //changes colors of block based on if its marked, visible, has a mine, or has text on it
        ctx.fillStyle = "black";
        ctx.strokeRect(this.x,this.y,this.w,this.h);
        if(this.marked && !this.isVisible){
            ctx.fillStyle = "green";
            ctx.fillRect(this.x+1,this.y+1, this.w-1, this.h-1);
        }
        else if(!this.isVisible){
            
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
   /*
    checks to see if mouse is touching block, if it is: checks to see if it is mine if not it clears stuff around it
    the next bunch of stuff just makes the block marked or not so you dont press it by accident
   */ 
    checkcollision(){
        if((mousex>=this.x && mousex<=this.x+this.w)&& (mousey>=this.y && mousey<=(this.y+this.h)) ){
                 if(!isRightDown && !this.marked && isLeftDown){
                    if(this.hasMine){
                        alert("you lost")
                        location.reload()
                    }
                    this.isVisible = true;
                    if(this.numMines == 0){
                        clearMinesAroundWithZero(this.arrX, this.arrY)
                    }
                    isLeftDown = false;
                    checkWin();
                }else if(!this.marked && isRightDown){
                    this.marked = true;
                    isRightDown = false;
                    
                }else if(this.marked && isRightDown){
                    this.marked = false;
                    isRightDown = false;
                    isLeftDown = false;
                }

                // console.log(
                //     `this is at X:${this.arrX} Y:${this.arrY}, is it marked: ${this.marked}, is right down: ${isRightDown}, is left down: ${isLeftDown}`
                // )
                
                
        }

    }

    

}
//stops menu opening on right click
document.addEventListener(`contextmenu`, (e) => {
    e.preventDefault();
});

//this checks to see if the left or right mouse button is down and sets the variable accordingly
document.addEventListener("mousedown", (e) =>{
    var rect = canvas.getBoundingClientRect();
    switch (e.which) {
        case 1:
            isLeftDown = true;
            break;
        case 2:
           
            break;
        case 3:
            isRightDown = true;
            break;
        default:
            
    }
    mousex = e.clientX - rect.left
    mousey = e.clientY - rect.top
}, false);




//main function that runs game on interval
function main(){

        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawSquares();
        checkHit();
    
}


//makes 50px squares based on the size and width fo canvas and puts in mines based on a random number
function makeSquares(){
    for(let x = 0; x<canvas.width; x+=50){
        let squaresY = [];
        for(let y = 0; y<canvas.height; y+=50){
            let ran = Math.round(Math.random()*10);
            if(ran == 5){
                let a = new Square(x,y,50,50,false,true);
                minesOn++;
                squaresY.push(a);
            }else{
                let a = new Square(x,y,50,50,false,false);
                squaresY.push(a);
            }
            numSquares++;
           
        }
        sqaures.push(squaresY)
    }

}

//checks how many mines are around a square
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

/*

this is called when it clears mines around a square that has no mines near it
it does this by:
1. setting itself visible
2. checks squares around itself from top left clock wise, if  one dosent describe where a mine is : it makes it visible and repeats or 
if it does describe where one is, it just sets it visible and dosent clear around it
3. if the square has already been visited then it goes back once in the loop

this thing uses recursion to check around it, it stops itself by not repeating ones tha thave already been visited

*/
function clearMinesAroundWithZero(x,y){
    if (sqaures[x][y].visited) return; 
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

//checks if collosion happens
function checkHit(){
    for(let i = 0; i<sqaures.length; i++){
        for(let z = 0; z<sqaures[i].length; z++){
            let d = sqaures[i][z];
            d.checkcollision();
        }
    }
}

/*
draws the squares and assigns the number of minds around each square (only assigns once)
*/
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

/*
checks to see if the player cleared the board by seeing if the number of squares visible 
is equal to the number of squares total minus the number of mines on the board
*/

function checkWin(){
    let numVisible = 0;
    for(let i = 0; i<sqaures.length; i++){
        for(let z = 0; z<sqaures[i].length; z++){
            if(sqaures[i][z].isVisible)
                numVisible++;
        }
    }
    //console.log(`amount visible: ${numVisible}, squares needed to be visible to win: ${numSquares-minesOn}`)
    if(numVisible == (numSquares-minesOn)){
        alert("u won")
        location.reload();
    }
        
}
makeSquares();
let int = setInterval(main, 5)

