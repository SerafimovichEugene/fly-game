getRandomInt = require('./getRandomInt.js');

function walls(context) {
    this.context = context;
    this.wallArray = [];
    this.image = new Image();
    this.image.src = 'img/wall.png';
    this.spaceHeigth = 150;
    this.widthOfWall = 50;
    this.time = 75;
}

function wall(pos, width, heigth) {
    this.position = pos;
    this.width = width;
    this.heigth = heigth;
}

walls.prototype.renderWalls = function () {

    for (let i = 0; i < this.wallArray.length; i++) {
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

walls.prototype.updateWalls = function (diff) {

    this.time += Math.round(diff * 60);

    if (this.time % 250 == 249) {

        let randomSpacePosition = getRandomInt(0, 600);

        this.wallArray.push(new wall([1162, 0], this.widthOfWall, randomSpacePosition));
        this.wallArray.push(new wall([1162, randomSpacePosition + this.spaceHeigth], this.widthOfWall, 648 - randomSpacePosition - this.spaceHeigth));
    }

    this.wallArray.forEach((value) => {
        value.position[0] -= 2;
    });

    this.wallArray.forEach((value, index, array) => {
        if (value.position[0] < -100) {
            array.shift();
        }
    });
}

module.exports = walls;
