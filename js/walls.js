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
    // console.log('time ', time);
    // console.log('% ', time % 16);
    
    if(time % 200 == 199){
        
        this.wallArray.push(new wall([810, 0], 20, 170));
        this.wallArray.push(new wall([810, 230], 20, 170));
        console.log('in arr', this.wallArray.length);
    }
    this.wallArray.forEach((value, index, array) => {
        value.position[0] -= 1;        
    });

    this.wallArray.forEach((value, index, array)=>{
        if(value.position[0] < -20) {
            array.shift();
        }
    })
    
}

module.exports = walls;


