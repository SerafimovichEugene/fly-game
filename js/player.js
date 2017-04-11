function player(sprite, position) {

    this.sprite = sprite;
    this.position = position;
    this.gravity = 10;
    this.speedOfFalling = 0;
    this.step = 0;

    this.onFly = false;
    this.num = 1;

}

player.prototype.updatePlayer = function (diff) {

    this.speedOfFalling = Math.pow(2 * this.gravity * this.step, 1 / 2);

    if (this.onFly) {
        this.step += 100;
        this.position[1] -= this.speedOfFalling * diff;
        // console.log(this.position[1]);
    } else {
        this.step += 60;
        this.position[1] += this.speedOfFalling * diff;
        // console.log(this.position[1]);
    }

    this.sprite.update(diff);
}

player.prototype.renderPlayer = function () {

    this.sprite.context.save();
    this.sprite.context.translate(0, this.position[1]);
    this.sprite.render(this.num);
    this.sprite.context.restore();
}

player.prototype.fly = function (arg) {

    if (!this.onFly) {
        this.step = 0;
        this.num = 4;
    } else if (!arg) {
        this.step = 0;
        this.num = 1;
    }
    this.onFly = arg;
}


module.exports = player;
