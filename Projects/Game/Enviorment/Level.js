var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

export default class Level{
    constructor(rooms, size){
        this.rooms = rooms
        this.size = size
        this.layout = []
        this.pStart = {x:Math.floor(size/2), y:Math.floor(size/2)}

    }

    makeEmptyLevel(){
        for(let i = 0; i<this.size; i++){
            let arr = []
            for(let z = 0; z<this.size; z++){
                arr.push("NR")
            }
            this.layout.push(arr)
        }

        // if(this.rooms.length>0){
        //      for(let i = 0; i<this.rooms.length; i++){
                    

        //     this.layout[this.rooms[i].location.y][this.rooms[i].location.x] = this.rooms[i]
        //     }
        // }
       
        
    }
}