var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

import Level from "http://127.0.0.1:5500/Game/Enviorment/Level.js";
import Room from "http://127.0.0.1:5500/Game/Enviorment/Room.js";
import makeRooms from "http://127.0.0.1:5500/Game/Generator/RoomGenerator.js";

/*should return a level*/
/*makes a level by randomly placing special rooms and regular rooms into a layout
when done, makes sure that all these rooms are connected to eachother*/

let size;
let roomArr;
/*makeRooms(Math.round((Math.random()*2)+1) + 5 + level * 2.6)*/
let queue;
let le;


const directions = [
    { x: 1, y: 0 },  // Right
    { x: -1, y: 0 }, // Left
    { x: 0, y: 1 },  // Down
    { x: 0, y: -1 }  // Up
];

export default function makeNewLevel(){
    size = 8 /*will be level that player is at at some point*/
    roomArr = makeRooms(11)
    /*makeRooms(Math.round((Math.random()*2)+1) + 5 + level * 2.6)*/
    queue = []
    le = new Level(roomArr, size)
    le.makeEmptyLevel()
    le.layout[le.pStart.y][le.pStart.x] = roomArr[0]
    queue[0] = {y: le.pStart.y, x:le.pStart.x, Vistied: false}
    roomArr.shift()
    
 
    
    while(queue.length>0 && roomArr.length>0){

        
        console.log(le.layout)
            let r = queue.shift()

            if(!r.Vistied){
                Visit(r)
                r.Vistied = true
            }
        
        
    }



    



    return le;

    

}

/*

cell can ahve a room if it hasnt already been filled
cell can have a room if its adjacent cells dont have more than 2 neighbors
if we have no more rooms stop

*/


/*visit should fill in cells that can have rooms in it and tell us rooms to add to the que
*/
function Visit(r){
    
    let arr = []

    for(let i = 0; i<4; i++){
        let dx = directions[i].x
        let dy = directions[i].y

        if(isOk(r.x + dx, r.y + dy)){
            arr[i] = {x:r.x + dx, y: r.y + dy, Vistied: false}
        }else{
            arr[i] = false
        }
    }
    console.log(arr)
    //add to queue, make the room, remove that room from room Array
    for(let z = 0; z<arr.length; z++){
        let a = arr[z]
        if(!a){
            continue;
        }else if(Math.round((Math.random()*100)+1)<50){
            continue
        }else{
           le.layout[a.x][a.y] = roomArr[0]
            queue.push({x: a.x, y:a.y})
            roomArr.shift() 
        }
        
    }



}

/*Room we looking at if it is ok */
function isOk(x, y){
    if( (x>= 0 && y>=0) && (x<size && y<size) ){
        if(le.layout[y][x] instanceof Room)
            return false;

        if(checkNumNeighbours(x, y)>1){
            return false;
        }

        return true
    }
        
    return false;
    
}

function checkNumNeighbours(x,y){
    let num = 0;
    
    for(let i = 0; i<4; i++){
        let dx = directions[i].x
        let dy = directions[i].y

        if(le.layout[y+dy][x+dx] instanceof Room){
            num++;
        }
    }

    return num;
}
