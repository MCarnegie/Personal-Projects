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
let tilesShown = 0;
let playerDied = false;
let diceNums = [];
let trialNum = 0;

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
    }  
    draw(){
        //changes colors of block based on if its marked, visible, has a mine, or has text on it
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
                ctx.fillText( "Gem", this.x+(this.w/2-8), this.y+(this.h/2+8))
            
        }  
    }
   /*
    checks to see if mouse is touching block, if it is: checks to see if it is mine if not it clears stuff around it
    the next bunch of stuff just makes the block marked or not so you dont press it by accident
   */ 
    checkcollision(){
        if((mousex>=this.x && mousex<=this.x+this.w)&& (mousey>=this.y && mousey<=(this.y+this.h)) ){
                 if(!this.marked && isLeftDown){
                    
                    this.isVisible = true;
                    isLeftDown = false;
                    if(this.hasMine){
                        playerDied = true;
                    }
                    checkWin();
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
        default:
            
    }
    mousex = e.clientX - rect.left
    mousey = e.clientY - rect.top
}, false);

function lost(){
    
        alert("you lost")
        location.reload()
    
}

let reloadTriggered = false;
//main function that runs game on interval
function main(){
    if(!playerDied){

    
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawSquares();
        checkHit();
        document.getElementById('tilesShown').innerHTML = "Tiles Shown: " + getNumVisible();
    }else{
        if (!reloadTriggered) {  // Check if reload has already been triggered
            reloadTriggered = true;  // Set flag to true to prevent re-triggering reload
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawSquares();
            
            setTimeout(() => {
                alert("You lost!");
                playerDied = true;
                finishGame();
                clearInterval(poo);  // Stop any running interval
                location.reload();   // Reload the page
            }, 500);
        }
        
    }
    
}


//makes 50px squares based on the size and width fo canvas and puts in mines based on a random number
function makeSquares(){
    let count = 0;
    for(let x = 0; x<canvas.width; x+=50){
        let squaresY = [];
        for(let y = 0; y<canvas.height; y+=50){

            let a = new Square(x,y,50,50,false,false);
            squaresY.push(a);
            numSquares++;
           
        }
        sqaures.push(squaresY)
    }

    //places mines
    for(let i = 0; i<8; i++){
        let x = Math.round(Math.random()*5) //get randoms corrdinates
        let y = Math.round(Math.random()*5)
        console.log(x)
        console.log(y)
        console.log(sqaures[y][x])
        minesOn++;
        sqaures[y][x].hasMine = true
    }

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

function drawSquares(){
    for(let i = 0; i<sqaures.length; i++){
        for(let z = 0; z<sqaures[i].length; z++){
            sqaures[i][z].arrX = i;
            sqaures[i][z].arrY = z;
            let d = sqaures[i][z];
            d.draw()
        }
    }
    
    
    
}

function rollDice() {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice-face").innerText = randomNumber;
    diceNums.push(randomNumber)
}

/*
checks to see if the player cleared the board by seeing if the number of squares visible 
is equal to the number of squares total minus the number of mines on the board
*/
function getNumVisible(){
    let numVisible = 0;
    for(let i = 0; i<sqaures.length; i++){
        for(let z = 0; z<sqaures[i].length; z++){
            if(sqaures[i][z].isVisible)
                numVisible++;
        }
    }
    return numVisible
}

function checkWin(){
    let numVisible = getNumVisible();
    console.log(`amount visible: ${numVisible}, squares needed to be visible to win: ${numSquares-minesOn}`)
    console.log(minesOn)
    if(numVisible == (numSquares-minesOn)){
        alert("u won")
        location.reload();
    }
        
}
function finishGame() {
    let trialNum = localStorage.getItem('trialNum')
    if(trialNum === null){
        trialNum = 0
    }else{
        trialNum = parseInt(trialNum)
    }

    trialNum++

    let numVisible = getNumVisible();
    //will look like this: Trial #, Number visible, Multiplier applied, Dice number rolled, if they lost
    localStorage.setItem(`Trial ${trialNum}`, `${numVisible}, ${diceNums[0]==1?1.5:diceNums[0]==2?2:diceNums[0]==3?2.5:
        diceNums[0]==4?3:diceNums[0]==5?3.5:diceNums[0]==6?4:0}
        , [${diceNums}], ${playerDied} `)
    
    localStorage.setItem('trialNum', trialNum)

    location.reload()

    
}
makeSquares();
let poo = setInterval(main, 5)