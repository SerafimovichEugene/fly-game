function Sprite(context, width, height, image, speed, frames) {
    
    this.context = context;
    this.width = width;
    this.height = height;
    this.image = image;    
    this.speed = speed;
    this.frames = frames;
    this.duration = 0;      
        
};

Sprite.prototype.render = function() {
    
    this.context.clearRect(0, 0, this.width, this.height);

    let roundedDuration = Math.round(this.duration);
    let frame = this.frames[roundedDuration % 4];
    let x = frame * this.width; 
    let y = 0;
    
    console.log('roundedDuration:', roundedDuration);    
    console.log('frame:', frame);
    console.log('x, y: ', x , y);

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
    console.log('diff:', diff);      
    console.log('this.speed:', this.speed);    
    console.log('duration:', this.duration);      
};

module.exports = Sprite;
