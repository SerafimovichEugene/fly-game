getRandomInt = require('./getRandomInt.js');

function creatures(sprite, type, tiks, speed, width, height) {

    this.sprite = sprite;
    this.creatureArray = [];

    this.width = width;
    this.height = height;

    this.type = type;
    this.speed = speed;
    this.tiks = tiks;
    this.time = 149;
}

function creature(position, sprite, width, height) {

    this.width = width;
    this.height = height;
    
    this.sprite = sprite;
    this.position = position;
}

creatures.prototype.updateCreatures = function (diff) {

    this.time += Math.round(diff * 60);

    if (this.time % this.tiks == (this.tiks - 1)) {
        this.creatureArray.push(new creature([810, getRandomInt(0, 450)], this.sprite, this.width, this.height));
    }

    this.creatureArray.forEach((value) => {
        value.position[0] -= this.speed;
        value.sprite.update(diff);
    });

    this.creatureArray.forEach((value, index, array) => {
        if (value.position[0] < -100) {
            array.shift();
        }
    });

}

creatures.prototype.renderCreatures = function (numOfFrames) {

    this.creatureArray.forEach((value, index, array) => {

        value.sprite.context.save();
        value.sprite.context.translate(value.position[0], value.position[1]);
        value.sprite.render(numOfFrames);
        value.sprite.context.restore();

    });
}
module.exports = creatures;
