function check(player, walls, canvas) {
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
        if(this.player.position[0] + this.player.sprite.width < this.walls.wallArray[i].position[0] ||
           this.player.position[1]+20 + this.player.sprite.height-35 < this.walls.wallArray[i].position[1] ||
           this.walls.wallArray[i].position[0] + this.walls.wallArray[i].width < this.player.position[0] ||
           this.walls.wallArray[i].position[1] + this.walls.wallArray[i].heigth < this.player.position[1]+20) {
               res =  false;
           }
        else {
            return true;
        }
    }
    return res;
}

module.exports = check;
