const Sprite = require('./sprite.js');
const player = require('./player.js');
const background = require('./background.js');
const walls = require('./walls.js');
const check = require('./check.js');

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
    dragon.renderPlayer();
    wallArray.renderWalls();
}

function updateAll(diff) {
    dragon.updatePlayer(diff);
    wallArray.updateWalls(diff);

    IsGameOver = checkObj.checkIntersections();
}



//main loop
function main() {

    let now = Date.now();
    let diff = (now - lastTime) / 1000;    
    updateAll(diff);
    renderAll();
    lastTime = now;
  
    if(!IsGameOver) {
        requestAnimFrame(main);
    }   
}

let lastTime = Date.now();
let dragon, wallArray, backgroundImage, checkObj;
let IsGameOver = false;

function loadContent() {
    const dragonImg = new Image('img/dragon-fly.png');
    dragonImg.src = 'img/dragon-fly.png';
    
    backgroundImage = new background(ctx);

    dragon = new player(new Sprite(ctx, 94, 67, dragonImg, 16, [0,1,2,3]), [0, 0]);

    wallArray = new walls(ctx);

    checkObj = new check(dragon, wallArray, canvas);

    main();
}



//event when flying up
document.addEventListener('keydown', function(event) {
        dragon.fly(true);
    });

//event when stop flying up
document.addEventListener('keyup', function(event) {
        dragon.fly(false);
    });

//load images and start main loop
loadContent();




