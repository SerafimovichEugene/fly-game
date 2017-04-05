let requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);



// dragonImg.src = 'img/dragon-fly.png';
// let elem = document.createElement('img');
// elem.src = 'img/dragon-fly.png';
// console.log(elem);
// document.body.appendChild(elem);

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
    let frame = this.frames[roundedDuration % 4]



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
}

Sprite.prototype.update = function(diff) {

    this.duration += this.speed * diff;
    console.log('diff:', diff);      
    console.log('this.speed:', this.speed);    
    console.log('duration:', this.duration);      
}

let lastTime = 0;

function main() {
    let now = Date.now();
    let diff = (now - lastTime) / 1000;
    
    dragonSprite.update(diff);
    dragonSprite.render();

    lastTime = now;
    requestAnimFrame(main);    
}


let dragonImg = new Image();
let dragonSprite = new Sprite(ctx, 188, 136, dragonImg, 16, [0,1,2,3]);

dragonImg.addEventListener('load', main);

dragonImg.src = 'img/dragon-fly.png';



