const Sprite = require('./sprite.js');
const player = require('./player.js');
const background = require('./background.js');
const walls = require('./walls.js');
const check = require('./check.js');
const coins = require('./coins.js');

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

let progressOfTiredness = document.createElement('div');

let progressStripe = document.createElement('span');

progressOfTiredness.className = 'tiredness';
progressStripe.style.width = '100%';
progressOfTiredness.appendChild(progressStripe);
document.body.appendChild(progressOfTiredness);

function updateProgressBar() {

    let currentTime = Math.floor(gameTime);
    
    if(currentTime > gameTimeRec) {
        gameTimeRec = currentTime;
        let currentProgres =  parseInt(progressStripe.style.width);

        // console.log(currentProgres);

        currentProgres -=1; 
        progressStripe.style.width = currentProgres + '%';
    }
}

function renderAll() {

    ctx.clearRect(0, 0, 800, 400);
    backgroundImage.renderBackground();
    dragon.renderPlayer();
    wallArray.renderWalls();
    coinArray.renderCoins();
}

function updateAll(diff) {
    
    dragon.updatePlayer(diff);
    wallArray.updateWalls(diff);
    coinArray.updateCoins(diff);

    updateProgressBar();
    IsGameOver = checkObj.checkIntersections();
}

//main loop
function main() {

    let now = Date.now();
    let diff = (now - lastTime) / 1000;    
    updateAll(diff);
    renderAll();
    lastTime = now;
    gameTime += diff;
    if(!IsGameOver) {
        requestAnimFrame(main);
    }
    
}

let lastTime = Date.now();
let dragon, wallArray, coinArray, backgroundImage, checkObj;
let IsGameOver = false;
let gameTime = 0;
let gameTimeRec = 1;

function loadContent() {

    const dragonImg = new Image();
    dragonImg.src = 'img/dragon-fly.png';

    const coinImg = new Image();
    coinImg.src = 'img/coin-sprite-animation.png';
    
    backgroundImage = new background(ctx);

    dragon = new player(new Sprite(ctx, 94, 67, dragonImg, 16, [0,1,2,3]), [0, 0]);

    wallArray = new walls(ctx);

    coinArray = new coins(new Sprite(ctx, 50, 50, coinImg, 8, [0,1,2,3,4,5,6,7,8,9]));

    checkObj = new check(dragon, wallArray, coinArray, canvas);

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




