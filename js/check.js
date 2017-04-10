function check(player, walls, coins, canvas) {
    this.player = player;
    this.walls = walls;
    this.field = canvas;
}

check.prototype.checkIntersections = function(){

    return this.ifOutOfField() || this.ifWall();
}

check.prototype.ifOutOfField = function() {

    if(this.player.position[1]< -10) {
        this.player.position[1] = -10;
    }
    else if(this.player.position[1] > 350) {
        this.player.position[1] = 350;
        return true;
    }
    return false;
}

check.prototype.ifWall = function() {
    let res = false;
    for(let i = 0; i < this.walls.wallArray.length; i++) {
        if(this.player.position[0] + this.player.sprite.width - 10 < this.walls.wallArray[i].position[0] - 10 ||
           this.player.position[1] + this.player.sprite.height - 20 < this.walls.wallArray[i].position[1] - 10 ||
           this.walls.wallArray[i].position[0] + this.walls.wallArray[i].width -10 < this.player.position[0] + 10 ||
           this.walls.wallArray[i].position[1] + this.walls.wallArray[i].heigth - 10 < this.player.position[1] + 20) {
               res =  false;
           }
        else {
            return true;
        }
    }
    return res;
}



module.exports = check;
