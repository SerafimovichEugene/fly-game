const Sprite = require('./sprite.js');
const player = require('./player.js');
const background = require('./background.js');
const walls = require('./walls.js');
const check = require('./check.js');
const creatures = require('./creatures.js');

let requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 908;
canvas.height = 512;
document.body.appendChild(canvas);

let progressOfTiredness = document.createElement('div');

let progressStripe = document.createElement('span');

progressOfTiredness.className = 'tiredness';
progressStripe.style.width = '100%';
progressOfTiredness.appendChild(progressStripe);
document.body.appendChild(progressOfTiredness);

function updateProgressBar() {

    let currentTime = Math.floor(gameTime);

    if (currentTime > gameTimeRec) {
        gameTimeRec = currentTime;
        let currentProgres = parseInt(progressStripe.style.width);

        if (currentProgres == 0) {
            return true;
        }
        currentProgres -= 1;
        progressStripe.style.width = currentProgres + '%';
    }
    return false;
}

function updateScores() {

    let scores = document.body.getElementsByClassName('scores')[0].getElementsByTagName('strong');
    let score = parseInt(scores[0].innerHTML);
    scores[0].innerHTML = score + 1;

}

function renderAll() {

    ctx.clearRect(0, 0, 908, 512);
    backgroundImage.renderBackground();
    dragon.renderPlayer();
    wallArray.renderWalls();
    chikenArray.renderCreatures(3);
    coinArray.renderCreatures(9);
    fireBallArray.renderCreatures(6);
}

function updateAll(diff) {

    dragon.updatePlayer(diff);
    wallArray.updateWalls(diff);
    chikenArray.updateCreatures(diff);
    coinArray.updateCreatures(diff);
    fireBallArray.updateCreatures(diff);

    isProgressBarEnd = updateProgressBar();

    isGameOver = checkObj.checkIntersections();

    let collected = checkObj.ifCreatureToCollect();
    if (collected == 'coin') {
        updateScores();
    } else if (collected == 'chicken') {
        let progress = parseInt(progressStripe.style.width);
        progress += 10;
        progressStripe.style.width = progress + '%';
        console.log(collected);
    }
    else if(collected == 'fire') {
        console.log(collected);
        gameOver();
    }
}

//main loop
function main() {

    let now = Date.now();
    let diff = (now - lastTime) / 1000;
    updateAll(diff);
    renderAll();
    lastTime = now;
    gameTime += diff;
    if (!isGameOver && !isProgressBarEnd) {
        requestAnimFrame(main);
    }
    else {
        // music.pause();
        gameOver();
    }
}

let lastTime = Date.now();
let dragon, wallArray, coinArray, chikenArray, backgroundImage, fireBallArray, checkObj;
let isGameOver = false;
let isProgressBarEnd = false;
let gameTime = 0;
let gameTimeRec = 1;


// let music = new Audio('./msc/Flying_softly.mp3'); 


function loadContent() {

    const dragonImg = new Image('img/dragon-fly.png');
    dragonImg.src = 'img/dragon-fly.png';

    const coinImg = new Image();
    coinImg.src = 'img/coin.png';

    const chikenImg = new Image();
    chikenImg.src = 'img/chicken.png';

    const fireBallImg = new Image();
    fireBallImg.src = 'img/fireBall.png';

    backgroundImage = new background(ctx);

    dragon = new player(new Sprite(ctx, 94, 67, dragonImg, 16, [0, 1, 2, 3]), [0, 0], 60, 40);

    wallArray = new walls(ctx);

    chikenArray = new creatures(new Sprite(ctx, 45.33, 55, chikenImg, 6, [0, 1, 2]), 'chicken', 700, 2, 40, 40)

    coinArray = new creatures(new Sprite(ctx, 50, 50, coinImg, 6, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), 'coin', 200, 2, 40, 40);

    fireBallArray = new creatures(new Sprite(ctx, 143, 55, fireBallImg, 6, [0, 1, 2, 3, 4, 5]), 'fire', 100, 5, 25, 25);

    checkObj = new check(canvas, dragon, wallArray, coinArray, chikenArray, fireBallArray);
    // music.play();
    main();
}

//event when flying up
document.addEventListener('keydown', function (event) {
    dragon.fly(true);
});

//event when stop flying up
document.addEventListener('keyup', function (event) {
    dragon.fly(false);
});

function gameOver() {
    isGameOver = true;
    document.getElementById('gameOver').style.display = 'block';
}

// music.addEventListener('ended', function() {
//     this.currentTime = 0;
//     this.play();
// }, false);


loadContent();
