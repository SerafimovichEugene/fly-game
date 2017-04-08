const Sprite = require('./sprite.js');
const player = require('./player.js');
const background = require('./background.js');

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
canvas.height = 400;
document.body.appendChild(canvas);

function renderAll() {

    ctx.clearRect(0, 0, 800, 400);
    backgroundImage.renderBackground();
    Dragon.renderPlayer();
}

let lastTime = Date.now();
//main loop
function main() {
    let now = Date.now();
    let diff = (now - lastTime) / 1000;    


    Dragon.updatePlayer(diff);
    renderAll();

    lastTime = now;
    requestAnimFrame(main);    
}

let dragonImg = new Image();
dragonImg.src = 'img/dragon-fly.png';

let dragonSprite = new Sprite(ctx, 94, 67, dragonImg, 16, [0,1,2,3]);
const backgroundImage = new background(ctx);

let Dragon = new player(dragonSprite, [0, 0]);


//event when flying up
document.addEventListener('keydown', function(event) {
        Dragon.fly(true);
    });

//event when stop flying up
document.addEventListener('keyup', function(event) {
        Dragon.fly(false);
    });

//start main loop
dragonImg.addEventListener('load', main);




