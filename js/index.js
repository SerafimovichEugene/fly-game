const Sprite = require('./sprite.js');

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
