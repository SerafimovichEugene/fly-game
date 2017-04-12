getRandomInt = require('./getRandomInt.js');

function creatures(sprite, type, tiks) {

    this.sprite = sprite;
    this.creatureArray = [];
    this.type = type;
    this.tiks = tiks;
    this.time = 149;
}

function creature(position, sprite) {

    this.sprite = sprite;
    this.position = position;
}

creatures.prototype.updateCreatures = function (diff) {

    this.time += Math.round(diff * 60);

    if (this.time % this.tiks == (this.tiks - 1)) {
        this.creatureArray.push(new creature([810, getRandomInt(0, 450)], this.sprite));
    }

    this.creatureArray.forEach((value) => {
        value.position[0] -= 2;
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
