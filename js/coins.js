getRandomInt = require('./getRandomInt.js');

function coins(sprite) {

    this.sprite = sprite;
    this.coinArray = [];
}

function coin(position, sprite) {
    this.sprite = sprite;
    this.position = position;
}

let time = 148;

coins.prototype.updateCoins = function (diff) {

    time += Math.round(diff * 60);

    // console.log(this.coinArray);

    if (time % 150 == 149) {

        this.coinArray.push(new coin([810, getRandomInt(0, 300)], this.sprite));
    }

    this.coinArray.forEach((value) => {
        value.position[0] -= 2;
        value.sprite.update(diff);
    });

    this.coinArray.forEach((value, index, array) => {
        if (value.position[0] < -100) {
            array.shift();
        }
    });

}

coins.prototype.renderCoins = function () {

    this.coinArray.forEach((value, index, array) => {

        value.sprite.context.save();
        value.sprite.context.translate(value.position[0], value.position[1]);
        value.sprite.render(9);
        value.sprite.context.restore();

    });
}
module.exports = coins;