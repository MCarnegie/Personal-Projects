var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");



import  Player  from "http://127.0.0.1:5500/Game/Entities/Player.js";

let a = new Player()

function main(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    a.draw()
}

setInterval(main, 5)