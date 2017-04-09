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
    
    return false;
}

module.exports = check;
