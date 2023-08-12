var canvas1 = document.getElementById("myCanvas1");
var ctx1 = canvas1.getContext("2d");
var canvas2 = document.getElementById("myCanvas2");
var ctx2 = canvas2.getContext("2d");
let isTouchingPlayer = false;
let mouseX = 0;
let mouseY = 0;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let spacePressed = false;
let timeStop = false;
let amount = 200;
let temp = true;
let shoot;

class Bullet{
    constructor(x,y,r,dx,dy, s, isVisible){
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
        this.s = s
        this.isVisible = isVisible;
        this.once = true;
        
    }

    draw(){
        if(this.isVisible){
            ctx1.fillStyle = "red";
            ctx1.beginPath();
            ctx1.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            ctx1.stroke();
            ctx1.fill();

        }
        
    }

        //copied the shit out of this from stackoverflow thanks blind man 87
    moveMe(){
        if(this.isVisible){
            if(!timeStop){
                if(this.isVisible){
                var vx = mouseX - this.x;
                var vy = mouseY - this.y;
                if(this.once){
                        var dist = Math.sqrt(vx * vx + vy * vy);
                        this.dx = vx / dist;
                        this.dy = vy / dist;
                        this.once = false;
                }
        

                this.dx *= this.s;
                this.dy *= this.s;

                this.x += this.dx;
                this.y += this.dy;
                }
            }
        }
        
        
        
    }
}

class eBullet extends Bullet{
    constructor(x,y,r,dx,dy, s, isVisible){
        super(x,y,r,dx,dy,s,isVisible)
    }

    draw(){
        if(this.isVisible){
             ctx1.fillStyle = "blue  ";
            ctx1.beginPath();
            ctx1.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            ctx1.stroke();
            ctx1.fill();

        }
       
    }

    moveMe(){
    if(this.isVisible){ 
            if(!timeStop){
            
                var vx = player.x - this.x;
                var vy = player.y - this.y;
                if(this.once){
                    var dist = Math.sqrt(vx * vx + vy * vy);
                    this.dx = vx / dist;
                    this.dy = vy / dist;
                    this.once = false;
                }
        

                this.dx *= this.s;
                this.dy *= this.s;

                this.x += this.dx;
                this.y += this.dy;
            }
        }
        
        
    }
    
}


class Player{
    //xyr is self explanitory, s is speed
    constructor(x,y,r,s){
        this.x = x;
        this.y = y;
        this.r = r;
        this.s = s;
        this.angle = 0;
        this.b = [];
        
       
    }

    draw(){
        ctx1.fillStyle = "black"
        ctx1.beginPath();
        ctx1.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx1.stroke();
        ctx1.fill();
    
    }


    drawBullets(){
       for(var a of this.b){
        a.draw();
        a.moveMe();
       }
    }

    move(){
        if (rightPressed) {
            this.x += this.s;
            if (this.x + this.r > canvas1.width) {
                this.x = canvas1.width - this.r;
            }
        }
         if (leftPressed) {
            this.x -= this.s;
            if (this.x -this.r< 0) {
                this.x = this.r;
            }
        }
         if(downPressed){
            this.y += this.s;
            if (this.y + this.r > canvas1.height){
                this.y = canvas1.height - this.r
            }
        }
         if (upPressed){
            this.y -= this.s;
            if (this.y - this.r <= 0){
                this.y =  this.r
            }
        }
    }

    shoot(){
       this.b.push(new Bullet(this.x, this.y, 2, 10,10,1.20,true))
        
    }

    reload(){
        for (let index = 0; index < b.length; index++) {
            b[index] = new Bullet(this.x, this.y, 2, this.x, this.y)
            
        }
    }
    
}

let player = new Player(100,75,20,1.8);

class Enemy extends Player{
    constructor(x,y,r,s){
        super(x,y,r,s);
        this.dx = 2;
        this.dy = 2;
    }

    draw(){
        ctx1.fillStyle = "blue"
        ctx1.beginPath();
        ctx1.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx1.stroke();
        ctx1.fill();
    
    }

    shoot(){
        if(!timeStop){
            this.b.push(new eBullet(this.x, this.y, 2, 10,10,1.08,true))
        }
        
   
    }

    move(){
        if(!timeStop){
            var vx = player.x - this.x;
            var vy = player.y - this.y;

            var dist = Math.sqrt(vx * vx + vy * vy);
            this.dx = vx / dist;
            this.dy = vy / dist;
            this.once = false;
            


            this.dx *= this.s;
            this.dy *= this.s;

            this.x += this.dx;
            this.y += this.dy;
        }
        
    }



}

let enemy = new Enemy(100,150,20,0.5)

class Obstacle{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw(){
        ctx1.fillStyle = "green";
        ctx1.fillRect(this.x,this.y,this.w,this.h);
    }

    collision(entity){

        if(entity.y + entity.r>this.y && entity.y-entity.r<this.y+this.h && entity.x+entity.r>this.x && entity.x-entity.r<this.x+this.w){
            if(entity instanceof Bullet){
                entity.isVisible = false;
            }else {

                if(entity.y-entity.r<this.y+this.h && entity.y-entity.r>this.y && entity.x>this.x && entity.x <this.x + this.w ){
                 
                        entity.y = this.y+this.h+entity.r;
                        console.log("out bottom")
                    
                    
                }else if(entity.y+entity.r>this.y && entity.x>this.x && entity.x<this.x + this.w){
                    entity.y = this.y-entity.r
                    console.log("out top")
                }else if(entity.x-entity.r<this.x+this.w &&entity.x-entity.r>this.x && entity.y>this.y && entity.y<this.y+this.h){
                    entity.x = this.x+this.w+entity.r
                    console.log("out right")
                }else if(entity.x+entity.r>this.x && entity.y>this.y && entity.y<this.y+this.h){
                    entity.x = this.x-entity.r;
                    console.log("out left")
                }
        }
            }
                



          

    }
}
let tempOb = new Obstacle(750,400,80,80)
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousedown", function(e){
    mouseX = e.offsetX;
    mouseY = e.offsetY;

        player.shoot();
    
    
}, false);
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
    }else if(e.key ==" "){
        timeStop = true;
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

function enemyShoot(){
    enemy.shoot();
}

function showTime(){
    
  
        if(timeStop){
            clearInterval(shoot);
            if(amount<=0){
                amount = 200;
                timeStop = false;
                temp = true;
                console.log("he")
            }else{
               
              amount--;
            }
        }
    
        
}


        
function main(){

        ctx1.clearRect(0,0,1050,800);
    
    
    ctx2.clearRect(0,0,1050,150);
    ctx2.fillStyle = "#ff944d"
    ctx2.fillRect(0,0,1050,150)
    ctx2.fillStyle = "black"
    ctx2.fillRect(0,0,1050,5);
    ctx2.fillStyle = "green"
    ctx2.fillRect(39,39,amount, 20)


        showTime();
    if(temp){
        shoot = setInterval(enemyShoot, 1000)
        temp = false;
    }

    player.draw();
    player.move();
    player.drawBullets();
    //enemy.draw();
    //enemy.drawBullets();
    tempOb.draw();
    tempOb.collision(player);

    //also remember to add this for enemy too
    for(let i = 0; i<player.b.length; i++){
        tempOb.collision(player.b[i]);
    }

    for(let i = 0; i<enemy.b.length; i++){
        tempOb.collision(enemy.b[i]);
    }

    //enemy.move();
    //tempOb.collision(enemy)
    
}


let run = setInterval(main, 5);
