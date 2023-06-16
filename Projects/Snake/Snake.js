let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let score = 0;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.font = "20px Georgia";
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
                alert("you hit yourself... Your score is: " + score)
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
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(once){
        candy.randomLocation();
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
    
}

function Move(){
    let oldMove = player.x + " " + player.y;
    if(direction == "e"){
        player.x = player.x+50;
        if(player.x>=canvas.width){
            console.log("hello1");
            alert("you hit the side... Your score is: " + score)
            death();
        }
      
    }else if(direction == "w"){
        player.x = player.x-50;
        if(player.x<0){
            console.log("hello2");
            alert("you hit the side... Your score is: " + score)
            death();
        }
       
    }else if(direction == "s"){
        player.y = player.y+50; 
        if(player.y>=canvas.height){
            console.log("hello3");
            alert("you hit the top... Your score is: " + score)
            death();
        }
        
    }else if(direction == "n"){
        player.y = player.y-50; 
        if(player.y<0){
            console.log("hello4");
            alert("you hit the bottom... Your score is: " + score)
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
    console.log("hello");
    document.location.reload();
    clearInterval(interval);
    clearInterval(interval2);
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
let interval2 = setInterval(Move, 220);
let interval = setInterval(draw, 5);

