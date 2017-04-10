function walls (context) {
    this.context = context;
    this.wallArray = [];
    this.image = new Image();
    this.image.src = 'img/wall.png';
    this.spaceHeigth = 150;
    this.widthOfWall = 50; 
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

    if(time % 100 == 99){

        let randomSpacePosition = getRandomInt(0, 300);
        
        this.wallArray.push(new wall([810, 0], this.widthOfWall, randomSpacePosition));
        this.wallArray.push(new wall([810, randomSpacePosition + this.spaceHeigth], this.widthOfWall, 400 - randomSpacePosition - this.spaceHeigth));
        
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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = walls;


