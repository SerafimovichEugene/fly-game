creatures = require('./creatureToCollect.js');

function check(canvas, player, walls, coins, chikens) {
    this.field = canvas;
    this.player = player;
    this.walls = walls;
    this.coins = coins;
    this.chikens = chikens;
    this.pickSound = new Audio('./msc/sfx_pick.flac');
}

check.prototype.checkIntersections = function () {

    return this.ifOutOfField() || this.ifWall();
}

check.prototype.ifOutOfField = function () {

    if (this.player.position[1] < -10) {
        this.player.position[1] = -10;
    } else if (this.player.position[1] > 512) {
        // this.player.position[1] = 350;
        return true;
    }
    return false;
}

check.prototype.ifWall = function (arg) {

    let res = false;

    for (let i = 0; i < this.walls.wallArray.length; i++) {
        if (this.player.position[0] + this.player.sprite.width - 10 < this.walls.wallArray[i].position[0] - 10 ||
            this.player.position[1] + this.player.sprite.height - 20 < this.walls.wallArray[i].position[1] - 10 ||
            this.walls.wallArray[i].position[0] + this.walls.wallArray[i].width - 10 < this.player.position[0] + 10 ||
            this.walls.wallArray[i].position[1] + this.walls.wallArray[i].heigth - 10 < this.player.position[1] + 20) {
            res = false;
        } else {
            return true;
        }
    }
    return res;
}

check.prototype.ifCreatureToCollect = function () {

    let res = false;
    for (prop in this) {

        if (this[prop] instanceof creatures) {

            for (let i = 0; i < this[prop].creatureArray.length; i++) {
                if (this.player.position[0] + this.player.sprite.width < this[prop].creatureArray[i].position[0] + 10 ||
                    this.player.position[1] + this.player.sprite.height < this[prop].creatureArray[i].position[1] - 10 ||
                    this[prop].creatureArray[i].position[0] + 10 + this[prop].creatureArray[i].sprite.width < this.player.position[0] - 10 ||
                    this[prop].creatureArray[i].position[1] - 10 + this[prop].creatureArray[i].sprite.width < this.player.position[1] - 10) {
                    res = false;
                } else {
                    this.pickSound.play();
                    this[prop].creatureArray.splice(i, 1);
                    return this[prop].type;
                }
            }
        }
    }
    return res;
}

module.exports = check;
