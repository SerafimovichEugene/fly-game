function walls (context) {
    this.context = context;
    this.wallArray = [];
    this.image = new Image();
    this.image.src = 'img/wall.png';
    
}

function wall (pos, width, heigth) {
    this.position = pos;
    this.width = width;
    this.heigth = heigth;
}

walls.prototype.renderWalls = function() {     

    for(let i = 0; i < this.wallArray.length; i++) {
        this.context.drawImage(
            this.image,
            0,
            0,
            this.wallArray[i].width,
            this.wallArray[i].heigth,
            this.wallArray[i].position[0],
            this.wallArray[i].position[1],
            this.wallArray[i].width,
            this.wallArray[i].heigth);
    }
}

let time = 0;

walls.prototype.updateWalls = function(diff) {

    
    time += Math.round(diff * 60);

    console.log(this.wallArray.length);
    if(time % 100 == 99){
        
        this.wallArray.push(new wall([810, 0], 100, 120));
        this.wallArray.push(new wall([810, 280], 100, 120));
        
    }
    this.wallArray.forEach((value, index, array) => {
        value.position[0] -= 3;        
    });

    this.wallArray.forEach((value, index, array)=>{
        if(value.position[0] < -100) {
            array.shift();
        }
    })
    
}

module.exports = walls;


