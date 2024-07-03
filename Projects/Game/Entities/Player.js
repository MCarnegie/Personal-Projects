var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

export default class Player{
    draw(){
        ctx.beginPath();
        ctx.arc(95, 50, 40, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

