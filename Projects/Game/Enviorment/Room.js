var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//en means empty neighbours going right, left, down, up
export default class Room{
    constructor(name, enemys, obstacles){
        this.name = name
        this.enemys = enemys
        this.obstacles = obstacles
        this.eN = [true,true,true,true]

    }

    draw(){
        for(let i = 0; i<this.obstacles.length; i++){
            this.obstacles[i].draw()
        }
    }

    colision(ox, oy, or){
        for(let i = 0; i<this.obstacles.length; i++){
            ox = this.obstacles[i].coloision(ox, oy, or).ox
            oy = this.obstacles[i].coloision(ox, oy, or).oy

        }
        return {ox, oy}
    }


    
}