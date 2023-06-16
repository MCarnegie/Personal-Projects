let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let enterPressed = false;
let hPressed = false;
let died = false;
let score = 0;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let bgMusic = new Audio('main theme.wav');
let munch = new Audio('snake eating.wav');
let mainMenu = new Image(); mainMenu.src = "Title Screen.png"
let helpScreen = new Image(); helpScreen.src = "Help Screen.png"
let background = new Image(); background.src = "background.png"
let deathScreen = new Image(); deathScreen.src = "deathScreen.png"
ctx.font = "80px Georgia";
let moves = [];
for(let i = 0; i<1; i++){
    moves[i] = 0;
}
let once = true;

class Snake{
    constructor(x,y, h, w){
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
    }

    drawSnakeBody(){
            
        ctx.fillStyle = "red";
        ctx.fillRect(this.x,this.y,this.w,this.h);
        let num = moves.length;
        for(let i = 1; i<num; i++){
            ctx.fillStyle = "blue";
            let x = getX(i);
            let y = getY(i);

            ctx.fillRect(x,y,this.w,this.h);
            
            
        }
        
       
    }

    collosion(){
        if(this.x == candy.x && this.y == candy.y){
            munch.play();
            candy.randomLocation();
            score++;
            let temp = [];
            let num = moves.length
            for(let i = 0; i<num+1; i++){
                temp[i] = 0;
            }
            for(let i = 0; i<num; i++){
                temp[i] = moves[i];
            }
            moves = temp;
        }

        for(let i = 2; i<moves.length; i++){
            if(this.x == getX(i) && this.y == getY(i)){
                death();
            }
                
            
        }
    }



}
player = new Snake(350,250,50,50)

class Food{
    constructor(x,y, h, w){
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
    }

    drawCandy(){
        ctx.fillStyle = "green";
        ctx.fillRect(this.x,this.y,this.w,this.h);
        
    }

    randomLocation(){
        let arrX = [];
        let z = 0;
        for(let i = 0; i<canvas.width; i = i+50){
            arrX[z] = i;
            z++
        }
        let arrY = [];
        let q = 0;
        for(let i = 0; i<canvas.height; i = i+50){
            arrY[q] = i;
            q++;
        }
        this.x =  arrX[Math.round(Math.random()*(arrX.length-1))];
        this.y = arrY[Math.round(Math.random()*(arrY.length-1))];
        
        

    }
}

candy = new Food(0,0, 50,50)

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if (e.key == "S" || e.key == "s") {
        downPressed = true;
    }
    else if (e.key == "W" || e.key == "w") {
        upPressed = true;
    }else if (e.key == "A" || e.key == "a"){
        leftPressed = true;
    }else if (e.key == "D"|| e.key == "d"){
        rightPressed = true;
    }else if (e.key === 'Enter') {
        enterPressed = true;
        died = false;
    }else if (e.key == "H"|| e.key == "h"){
        hPressed = true;
    }
    
    
}
function keyUpHandler(e) {
    if (e.key == "S" || e.key == "s") {
        downPressed = false;
    }
    else if (e.key == "W" || e.key == "w") {
        upPressed = false;
    }else if (e.key == "A" || e.key == "a"){
        leftPressed = false;
    
    }else if (e.key == "D"|| e.key == "d"){
        rightPressed = false;
    }
    
}
done = true;
direction = "e";
once = true;
let interval2;
function draw(){
    
    if(enterPressed){
        bgMusic.play();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background,0,0,canvas.width,canvas.height)
        if(once){
            candy.randomLocation();
            interval2 = setInterval(Move, 220);
            once = false;
        }
        
        candy.drawCandy();
        player.drawSnakeBody();
        player.collosion();
        
        
        if(rightPressed && direction != "w"){
            direction = "e"
        }else if(leftPressed && direction != "e"){ 
            direction = "w"
        }else if(downPressed && direction != "n"){
            direction = "s"
        }else if(upPressed && direction != "s"){
            direction = "n"
        }
    }else if (hPressed){
        ctx.drawImage(helpScreen,0,0,canvas.width,canvas.height)
    }else if (!died){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.drawImage(mainMenu,0,0,canvas.width,canvas.height)
        bgMusic.play()
    }
        
    
}

function Move(){
    let oldMove = player.x + " " + player.y;
    if(direction == "e"){
        player.x = player.x+50;
        if(player.x>=canvas.width){
            death();
        }
      
    }else if(direction == "w"){
        player.x = player.x-50;
        if(player.x<0){
            death();
        }
       
    }else if(direction == "s"){
        player.y = player.y+50; 
        if(player.y>=canvas.height){
            death();
        }
        
    }else if(direction == "n"){
        player.y = player.y-50; 
        if(player.y<0){
            death();
        }
    }
    
    moves[0] = player.x + " " + player.y; 
    
    let num = moves.length
    
    for(let i = num-score; i<num; i++){
        let temp = moves[i];
        moves[i] = oldMove;
        oldMove = temp;
            
    }   
    
}

function death(){
    died = true;
    hPressed = false;
    enterPressed = false;
    once = true;
    clearInterval(interval2);
    ctx.drawImage(deathScreen,0,0,canvas.width,canvas.height);
    ctx.fillStyle = "red";
    ctx.fillText(score, 475, 550);
    player.x = 350;
    player.y = 250;
    moves = [];
    for(let i = 0; i<1; i++){
        moves[i] = 0;
    }
    score = 0;
    direction = "e"
    ctx.fillText("Press enter to try again", 80, 650);
    
}

function getX(Index){
    let str = moves[Index];
    try {
        str = str.substring(0,str.indexOf(" "));
        return str; 
    } catch (error) {
        
    }
}

function getY(Index){
    let str = moves[Index];
    
    try {
        str = str.substring(str.indexOf(" ")+1); 
        return str;
    } catch (error) {
        
    } 
}



let interval = setInterval(draw, 5);

