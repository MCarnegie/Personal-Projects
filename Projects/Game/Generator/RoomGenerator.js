var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

import Room from "http://127.0.0.1:5500/Game/Enviorment/Room.js";
import Obstacle from "http://127.0.0.1:5500/Game/Enviorment/Obstacle.js";

//634 is one third of the screen width*2 for placement
//500 is one third of screen height*2 for placement
//8 is used so that player dosent travel into next room

export default function makeRooms(num){
    let roomArr = []
    for(let i = 0; i<num; i++){
        roomArr[i] = new Room("room" + i, [], [
            // new Obstacle(canvas.width/2,0,0.1,canvas.height,"blue"),
            // new Obstacle(0,canvas.height/2,canvas.width,0.1,"blue"),

            //top
            new Obstacle(0,0,canvas.width/3,8,"red"),
            new Obstacle(634,0,canvas.width/3,8,"red"),
            //new Obstacle(317,0,canvas.width/3,8,"red"), block entrance

            //bottom
            new Obstacle(0,canvas.height-8,canvas.width/3,8,"red"),
            new Obstacle(634,canvas.height-8,canvas.width/3,8,"red"),
            // new Obstacle(317,canvas.height-8,canvas.width/3,8,"red"), block entrance

            //left
            new Obstacle(0,0,8,canvas.height/3,"red"),
            new Obstacle(0,500,8,canvas.height/3,"red"),
            // new Obstacle(0,250,8,canvas.height/3,"red"), block entrance

            //right
            new Obstacle(canvas.width-8,0,8,canvas.height/3,"red"),
            new Obstacle(canvas.width-8,500,8,canvas.height/3,"red"),
            // new Obstacle(canvas.width-8,250,8,canvas.height/3,"red"), block entrance
               
        ])
    }

    return roomArr
}

//317 wide

//new Obstacle(317,0,canvas.width/3,8,"red"), up
 // new Obstacle(317,canvas.height-8,canvas.width/3,8,"red"), down
    // new Obstacle(0,250,8,canvas.height/3,"red"), left
      // new Obstacle(canvas.width-8,250,8,canvas.height/3,"red"), right