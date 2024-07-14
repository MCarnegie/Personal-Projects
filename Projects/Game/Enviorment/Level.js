var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

export default class Level{
    constructor(rooms, size){
        this.rooms = rooms
        this.size = size
        this.layout = []

    }

    makeLevel(){
        for(let i = 0; i<this.size; i++){
            let arr = []
            for(let z = 0; z<this.size; z++){
                arr.push(0)
            }
            this.layout.push(arr)
        }

        for(let i = 0; i<this.rooms.length; i++){
                    
            console.log(this.rooms[i].location.x)
            this.layout[this.rooms[i].location.y][this.rooms[i].location.x] = this.rooms[i]
        }
        
    }
}