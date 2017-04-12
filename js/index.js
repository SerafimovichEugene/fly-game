const Sprite = require('./sprite.js');
const player = require('./player.js');
const background = require('./background.js');
const walls = require('./walls.js');
const check = require('./check.js');
const creatures = require('./creatureToCollect.js');

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
canvas.width = 1152;
canvas.height = 648;
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

    ctx.clearRect(0, 0, 1152, 648);
    backgroundImage.renderBackground();
    dragon.renderPlayer();
    wallArray.renderWalls();
    chikenArray.renderCreatures(3);
    coinArray.renderCreatures(9);
}

function updateAll(diff) {

    dragon.updatePlayer(diff);
    wallArray.updateWalls(diff);
    chikenArray.updateCreatures(diff);
    coinArray.updateCreatures(diff);

    isProgressBarEnd = updateProgressBar();

    isGameOver = checkObj.checkIntersections();

    let collected = checkObj.ifCreatureToCollect();
    if (collected === 'coin') {
        updateScores();
    } else if (collected === 'chicken') {
        let progress = parseInt(progressStripe.style.width);
        progress += 10;
        progressStripe.style.width = progress + '%';
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
}

let lastTime = Date.now();
let dragon, wallArray, coinArray, chikenArray, backgroundImage, checkObj;
let isGameOver = false;
let isProgressBarEnd = false;
let gameTime = 0;
let gameTimeRec = 1;

function loadContent() {

    const dragonImg = new Image();
    dragonImg.src = 'img/dragon-fly.png';

    const coinImg = new Image();
    coinImg.src = 'img/coin.png';

    const chikenImg = new Image();
    chikenImg.src = 'img/chicken.png';

    backgroundImage = new background(ctx);

    dragon = new player(new Sprite(ctx, 94, 67, dragonImg, 16, [0, 1, 2, 3]), [0, 0]);

    wallArray = new walls(ctx);

    chikenArray = new creatures(new Sprite(ctx, 45.33, 55, chikenImg, 6, [0, 1, 2]), 'chicken', 600)

    coinArray = new creatures(new Sprite(ctx, 50, 50, coinImg, 6, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), 'coin', 150);

    checkObj = new check(canvas, dragon, wallArray, coinArray, chikenArray);

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

//load images and start main loop
loadContent();
