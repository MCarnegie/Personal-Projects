var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

import Room from "http://127.0.0.1:5500/Game/Enviorment/Room.js";
import Obstacle from "http://127.0.0.1:5500/Game/Enviorment/Obstacle.js";

export default function makeRooms(num){
    let roomArr = []
    for(let i = 0; i<num; i++){
        roomArr[i] = new Room("room" + i, [], [])
    }

    return roomArr
}