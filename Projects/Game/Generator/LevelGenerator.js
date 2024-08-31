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
let endRooms = [];

const directions = [
    { x: 1, y: 0 },  // Right
    { x: -1, y: 0 }, // Left
    { x: 0, y: 1 },  // Down
    { x: 0, y: -1 }  // Up
];

/*TO FIX: to make this work make it restart the program 

Condtions to restart:

Room array is not zero
Count amount of rooms in layout, if it is not equal to size restart


*/

/*stop while loop when

roomArr.length = 0
checkLayout = true

*/

export default function makeNewLevel(){
    /*limit for size should not exceed 16 for best and most consistent results
    if you want bigger doungeons remove the while loop safeguard
    */
    size = 8 /*will be level that player is at at some point*/

    le = new Level(roomArr, size)
    le.makeEmptyLevel()

    
    let attempts = 0;
    while (!checkLayout(le.layout)) {
        generateLayout()

        if(attempts>100)
            break;
        attempts++;
        
    }
    console.log(attempts)

    console.log("end rooms:")
    console.log(endRooms)

  
    



    return le;
    

    

}

function generateLayout(){
    le.makeEmptyLevel()
    roomArr = makeRooms(size)
    queue = []
    endRooms = []
    le.layout[le.pStart.y][le.pStart.x] = roomArr[0]
    queue[0] = {y: le.pStart.y, x:le.pStart.x, Vistied: false}
    roomArr.shift()

    while(queue.length>0){

        
     
        let r = queue.shift()

        if(!r.Vistied){
            Visit(r)
            r.Vistied = true
        }
    
    
    }
   
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


    //get all neighbours around room
    for(let i = 0; i<4; i++){
        let dx = directions[i].x
        let dy = directions[i].y

        if(isOk(r.x + dx, r.y + dy)){
            arr[i] = {x:r.x + dx, y: r.y + dy, Vistied: false}
        }else{
            arr[i] = false
        }
    }


    //add to queue, make the room, remove that room from room Array
    for(let z = 0; z<arr.length; z++){
        let a = arr[z]
        if(!a){
            console.log(r)
            continue;
        }else if(Math.round((Math.random()*100)+1)<50){
            console.log(r)
            continue;
        }else if(roomArr.length<=0){
            console.log(r)
            continue;
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
        if(le.layout[y][x] instanceof Room){
            return false;
        }
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
        try {
            if(le.layout[y+dy][x+dx] instanceof Room){
                num++;
            }
        } catch (error) {
            num++
        }
       
    }

    return num;
}

function checkLayout(layout){
    let num = 0;
    for(let i = 0; i<layout.length; i++){
        for(let z = 0; z<layout[i].length; z++){
            if(layout[i][z] instanceof Room)
                    num++
        }
    }
    console.log(`Number of rooms: ${num}, Expected size: ${size}`);
    if(num == size){
        editBarriers(layout)
        return true
    }else
        return false
}

function editBarriers(layout){
    for(let i = 0; i<layout.length; i++){
        for(let z = 0; z<layout[i].length; z++){
            if(layout[i][z] instanceof Room)
                addIfNeighbourEmpty(z,i, layout[i][z])
        }
    }
}

function addIfNeighbourEmpty(x, y, r){
    for(let i = 0; i<4; i++){
        let dx = directions[i].x
        let dy = directions[i].y
        try {
            if(le.layout[y+dy][x+dx] instanceof Room){
                r.eN[i] = false
            }
        } catch (error) {
            r.eN[i] = false
        }
       
    }
}
