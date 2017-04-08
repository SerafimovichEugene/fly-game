function Sprite(context, width, height, image, speed, frames) {
    
    this.context = context;
    this.width = width;
    this.height = height;
    this.image = image;    
    this.speed = speed;
    this.frames = frames;
    this.duration = 0;   
      
};

Sprite.prototype.render = function(num) {
    
    // this.context.clearRect(0, 0, 800, 600);

    let roundedDuration = Math.round(this.duration);
    let frame = this.frames[roundedDuration % num];
    let x = frame * this.width; 
    let y = 0;    

    this.context.drawImage(
        this.image,
        x,
        y,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height);
};

Sprite.prototype.update = function(diff) {    
    this.duration += this.speed * diff;        
};

module.exports = Sprite;
