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

        console.log(currentProgres);

        currentProgres -=1; 
        progressStripe.style.width = currentProgres + '%';
    }
}

function renderAll() {

    ctx.clearRect(0, 0, 800, 400);
    backgroundImage.renderBackground();
    dragon.renderPlayer();
    wallArray.renderWalls();
}

function updateAll(diff) {
    
    dragon.updatePlayer(diff);
    wallArray.updateWalls(diff);
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
let dragon, wallArray, backgroundImage, checkObj;
let IsGameOver = false;
let gameTime = 0;
let gameTimeRec = 1;

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




