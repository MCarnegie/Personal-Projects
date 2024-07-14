var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


import  Player  from "http://127.0.0.1:5500/Game/Entities/Player.js";
import Obstacle from "http://127.0.0.1:5500/Game/Enviorment/Obstacle.js";
import Room from "http://127.0.0.1:5500/Game/Enviorment/Room.js";
import Level from "http://127.0.0.1:5500/Game/Enviorment/Level.js";


let testLevel = new Level([
    new Room("test1", [], [new Obstacle(200, 100, 100 ,200, "pink")], {x:1, y:1}), 
    new Room("test2", [], [new Obstacle(400, 100, 400 ,100, "blue")], {x:1, y:2}), 
    new Room("test3", [], [new Obstacle(200, 200, 100 ,400, "green")], {x:1, y:0}), 
    new Room("test4", [], [new Obstacle(100, 100, 200 ,100, "black")], {x:2, y:1}), 
    new Room("test5", [], [new Obstacle(800, 100, 100 ,100, "orange")], {x:0, y:1}),
    
], 10)

let player = new Player(100, 200, {x:1, y:1})

document.addEventListener("keydown", (e)=>{
    if (e.key == "S" || e.key == "s") {
        player.downPressed = true;
    }
    else if (e.key == "W" || e.key == "w") {
        player.upPressed = true;
    }else if (e.key == "A" || e.key == "a"){
        player.leftPressed = true;
    }else if (e.key == "D"|| e.key == "d"){
        player.rightPressed = true;
    }
})
document.addEventListener("keyup", (e) =>{
    if (e.key == "S" || e.key == "s") {
        player.downPressed = false;
    }
    else if (e.key == "W" || e.key == "w") {
        player.upPressed = false;
    }else if (e.key == "A" || e.key == "a"){
        player.leftPressed = false;
    
    }else if (e.key == "D"|| e.key == "d"){
        player.rightPressed = false;
    }
})

// let a = new Obstacle(200, 100, 100 ,100)

console.log(testLevel.rooms)
testLevel.makeLevel()
console.log(testLevel.layout)
function main(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    player.draw()
    player.movePlayer()
    player.playerColision(testLevel)
    
    testLevel.layout[player.location.y][player.location.x].draw()
    let newCords = testLevel.layout[player.location.y][player.location.x].colision(player.x, player.y, player.r)
    player.x = newCords.ox
    player.y = newCords.oy
   

}

setInterval(main, 5)