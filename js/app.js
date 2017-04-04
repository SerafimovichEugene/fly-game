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

function Sprite(context, width, height, image, perFrame, speed) {
    
    this.context = context;
    this.width = width;
    this.height = height;
    this.image = image;

    this.speed = speed;

    this.index = 1;
    this.count = 0;
    this.perFrame = perFrame;      
        
};

Sprite.prototype.render = function() {
    
    this.context.drawImage(
        this.image,
        this.frameIndex * this.width,
        0,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height);
}

Sprite.prototype.update = function(dt) {

    this.index += this.speed * dt;
        
    if(this.frameIndex == 5) {
        this.frameIndex = 1;
    }
}

let lastTime;

function main() {
    let now = Date.now();
    let dt = (now - lastTime) / 2;

    dragonSprite.update(dt);
    dragonSprite.render();

    lastTime = now;
    requestAnimFrame(main);    
}


let dragonImg = new Image();
let dragonSprite = new Sprite(ctx, 188, 136, dragonImg, 4);

dragonImg.addEventListener('load', main);

dragonImg.src = 'img/dragon-fly.png';



