/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = getRandomInt;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function background(context) {
    this.context = context;
    this.image = new Image();
    this.image.src = 'img/background2.png';
    this.width = 908;
    this.heigth = 512;
    this.step = 0;
};

background.prototype.renderBackground = function () {

    ++this.step;
    if (this.step == this.width) {
        this.step = 0;
    }
    this.context.drawImage(this.image, 0, 0, this.step, this.heigth, this.width - this.step, 0, this.step, this.heigth);
    this.context.drawImage(this.image, this.step, 0, this.width - this.step, this.heigth, 0, 0, this.width - this.step, this.heigth);
};

module.exports = background;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

creatures = __webpack_require__(6);

function check(canvas, player, walls, coins, chikens, fireBalls) {
    this.field = canvas;
    this.player = player;
    this.walls = walls;
    this.coins = coins;
    this.chikens = chikens;
    this.fireBalls = fireBalls;
}

check.prototype.checkIntersections = function () {

    return this.ifOutOfField() || this.ifWall();
}

check.prototype.ifOutOfField = function () {

    if (this.player.position[1] < -10) {
        this.player.position[1] = -10;
    } else if (this.player.position[1] > 512) {
        return true;
    }
    return false;
}

check.prototype.ifWall = function (arg) {

    let res = false;

    for (let i = 0; i < this.walls.wallArray.length; i++) {
        if (this.player.position[0] + this.player.sprite.width - 10 < this.walls.wallArray[i].position[0] - 10 ||
            this.player.position[1] + this.player.sprite.height - 20 < this.walls.wallArray[i].position[1] - 10 ||
            this.walls.wallArray[i].position[0] + this.walls.wallArray[i].width - 10 < this.player.position[0] + 10 ||
            this.walls.wallArray[i].position[1] + this.walls.wallArray[i].heigth - 10 < this.player.position[1] + 20) {
            res = false;
        } else {
            return true;
        }
    }
    return res;
}

check.prototype.ifCreatureToCollect = function () {

    let res = false;
    for (prop in this) {

        if (this[prop] instanceof creatures) {

            for (let i = 0; i < this[prop].creatureArray.length; i++) {
                if (this.player.position[0] + this.player.width < this[prop].creatureArray[i].position[0] ||
                    this.player.position[1] - 10 + this.player.height < this[prop].creatureArray[i].position[1] ||
                    this[prop].creatureArray[i].position[0] + this[prop].creatureArray[i].width < this.player.position[0] ||
                    this[prop].creatureArray[i].position[1] + this[prop].creatureArray[i].height < this.player.position[1]  - 10) {
                    res = false;
                } 
                else {                    
                    this[prop].creatureArray.splice(i, 1);
                    return this[prop].type;
                }
            }
        }
    }
    return res;
}

module.exports = check;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function player(sprite, position, width, height) {

    this.sprite = sprite;
    this.position = position;
    this.gravity = 10;
    this.speedOfFalling = 0;
    this.step = 0;

    this.onFly = false;
    this.num = 1;

    this.width = width;
    this.height = height;

}

player.prototype.updatePlayer = function (diff) {

    this.speedOfFalling = Math.pow(2 * this.gravity * this.step, 1 / 2);

    if (this.onFly) {
        this.step += 100;
        this.position[1] -= this.speedOfFalling * diff;
    } else {
        this.step += 60;
        this.position[1] += this.speedOfFalling * diff;
    }

    this.sprite.update(diff);
}

player.prototype.renderPlayer = function () {

    this.sprite.context.save();
    this.sprite.context.translate(0, this.position[1]);
    this.sprite.render(this.num);
    this.sprite.context.restore();
}

player.prototype.fly = function (arg) {

    if (!this.onFly) {
        this.step = 0;
        this.num = 4;
    } 
    if (!arg) {
        this.step = 0;
        this.num = 1;
    }
    this.onFly = arg;
}


module.exports = player;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

function Sprite(context, width, height, image, speed, frames) {

    this.context = context;
    this.width = width;
    this.height = height;
    this.image = image;
    this.speed = speed;
    this.frames = frames;
    this.duration = 0;

};

Sprite.prototype.render = function (num) {

    let roundedDuration = Math.round(this.duration);
    let frame = this.frames[roundedDuration % num];
    let x = frame * this.width;
    let y = 0;

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

Sprite.prototype.update = function (diff) {
    this.duration += this.speed * diff;
};

module.exports = Sprite;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

getRandomInt = __webpack_require__(0);

function walls(context) {
    this.context = context;
    this.wallArray = [];
    this.image = new Image();
    this.image.src = 'img/wall.png';
    this.spaceHeigth = 100;
    this.widthOfWall = 50;
    this.time = 75;
}

function wall(pos, width, heigth) {
    this.position = pos;
    this.width = width;
    this.heigth = heigth;
}

walls.prototype.renderWalls = function () {

    for (let i = 0; i < this.wallArray.length; i++) {
        this.context.drawImage(
            this.image,
            0,
            0,
            this.wallArray[i].width,
            this.wallArray[i].heigth,
            this.wallArray[i].position[0],
            this.wallArray[i].position[1],
            this.wallArray[i].width,
            this.wallArray[i].heigth);
    }
}

walls.prototype.updateWalls = function (diff) {

    this.time += Math.round(diff * 60);

    if (this.time % 150 == 149) {

        let randomSpacePosition = getRandomInt(0, 100);

        this.wallArray.push(new wall([910, randomSpacePosition], this.widthOfWall, 110));
        this.wallArray.push(new wall([910, randomSpacePosition + getRandomInt(100, 200) + 110], this.widthOfWall, 110));
    }

    this.wallArray.forEach((value) => {
        value.position[0] -= 2;
    });

    this.wallArray.forEach((value, index, array) => {
        if (value.position[0] < -100) {
            array.shift();
        }
    });
}

module.exports = walls;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

getRandomInt = __webpack_require__(0);

function creatures(sprite, type, timeOfAppearing, speed, width, height) {

    this.sprite = sprite;
    this.creatureArray = [];

    this.width = width;
    this.height = height;

    this.type = type;
    this.speed = speed;
    this.timeOfAppearing = timeOfAppearing;
    this.time = 50;
}

function creature(position, sprite, width, height) {

    this.width = width;
    this.height = height;
    
    this.sprite = sprite;
    this.position = position;
}

creatures.prototype.updateCreatures = function (diff) {

    this.time += Math.round(diff * 60);
    if (this.time % this.timeOfAppearing == (this.timeOfAppearing - 1)) {
        
        this.creatureArray.push(new creature([830, getRandomInt(0, 480)], this.sprite, this.width, this.height));
    }

    this.creatureArray.forEach((value) => {
        value.position[0] -= this.speed;
        value.sprite.update(diff);
    });

    this.creatureArray.forEach((value, index, array) => {
        if (value.position[0] < -100) {
            array.shift();
        }
    });

}

creatures.prototype.renderCreatures = function (numOfFrames) {

    this.creatureArray.forEach((value, index, array) => {

        value.sprite.context.save();
        value.sprite.context.translate(value.position[0], value.position[1]);
        value.sprite.render(numOfFrames);
        value.sprite.context.restore();

    });
}
module.exports = creatures;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// const $ = require('jquery');
const Sprite = __webpack_require__(4);
const player = __webpack_require__(3);
const background = __webpack_require__(1);
const walls = __webpack_require__(5);
const check = __webpack_require__(2);
// const bootstrap = require('bootstrap');

let requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

let lastTime = Date.now();
let dragon, wallArray, coinArray, chikenArray, backgroundImage, fireBallArray, checkObj;
let isGameOver = false;
let gameStarted = false;
let isProgressBarEnd = false;
let gameTime = 0;
let gameTimeRec = 1;

let pickChicken;
let pickCoin;
let crash;
let music = new Audio('./msc/grieg_in_the_hal_ of_the_mountain_king.mp3');

let currentProgres;
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 908;
canvas.height = 512;

$('.play').after(canvas);
// document.body.appendChild(canvas);

let progressStripe = document.getElementById('tirednessStripe');

function updateProgressBar() {

    let currentTime = Math.floor(gameTime);

    if (currentTime > gameTimeRec) {
        gameTimeRec = currentTime;
        currentProgres = parseInt(progressStripe.style.width);

        if (currentProgres == 0) {
            return true;
        }
        currentProgres -= 1;
        moreFireBalls();
        progressStripe.style.width = currentProgres + '%';
    }
    return false;
}

function updateScores() {

    pickCoin.play();
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

        pickChicken.play();
        currentProgres = parseInt(progressStripe.style.width);
        currentProgres += 10;
        moreFireBalls();
        progressStripe.style.width = currentProgres + '%';
    } else if (collected == 'fire') {
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
    } else {
        music.pause();
        gameOver();
    }
}

function loadContent() {

    pickChicken = new Audio('./msc/sfx_pick.flac');
    pickCoin = new Audio('./msc/coins_5.wav');
    crash = new Audio('./msc/qubodup-crash.ogg');

    const dragonImg = new Image('img/dragon-fly.png');
    dragonImg.src = 'img/dragon-fly.png';

    const coinImg = new Image();
    coinImg.src = 'img/coin.png';

    const chikenImg = new Image();
    chikenImg.src = 'img/chicken.png';

    const fireBallImg = new Image();
    fireBallImg.src = 'img/fireBall.png';

    backgroundImage = new background(ctx);

    dragon = new player(new Sprite(ctx, 94, 67, dragonImg, 16, [0, 1, 2, 3]), [0, 0], 80, 40);

    wallArray = new walls(ctx);

    chikenArray = new creatures(new Sprite(ctx, 45.33, 55, chikenImg, 6, [0, 1, 2]), 'chicken', 700, 2, 46, 55)

    coinArray = new creatures(new Sprite(ctx, 50, 50, coinImg, 6, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), 'coin', 100, 2, 50, 50);

    fireBallArray = new creatures(new Sprite(ctx, 143, 55, fireBallImg, 6, [0, 1, 2, 3, 4, 5]), 'fire', 100, 5, 25, 25);

    checkObj = new check(canvas, dragon, wallArray, coinArray, chikenArray, fireBallArray);

    //event when flying up
    document.addEventListener('keydown', function(event) {
        dragon.fly(true);
    });

    //event when stop flying up
    document.addEventListener('keyup', function(event) {
        dragon.fly(false);
    });
}

function gameOver() {
    crash.play();
    gameStarted = false;
    isGameOver = true;
    $('.play').show();
    $('#gameOver').show();
}

function moreFireBalls() {

    if (!currentProgres < 20) {
        fireBallArray.timeOfAppearing = currentProgres;
    }
}

function startGame() {
    let scores = document.body.getElementsByClassName('scores')[0].getElementsByTagName('strong');
    scores[0].innerHTML = '0';
    gameStarted = true;
    ctx.clearRect(0, 0, 908, 512);
    loadContent();
    isGameOver = false;
    music = new Audio('./msc/grieg_in_the_hal_ of_the_mountain_king.mp3');
    progressStripe.style.width = '100%';
    music.play();
    main();
}

music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

$('.play').click(function() {
    $('.play').hide();
    $('#gameOver').hide();
    startGame();
});

$(document).keypress(function(e) {
    if (e.which == 13) {
        if (!gameStarted) {
            $('.play').click();
        }
    }
});


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDlhOTg5NjJjNDc4OTUzZTM0ZjEiLCJ3ZWJwYWNrOi8vLy4vanMvZ2V0UmFuZG9tSW50LmpzIiwid2VicGFjazovLy8uL2pzL2JhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vanMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL2pzL3Nwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy93YWxscy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jcmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNuQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsbUJBQW1CLGlDQUFpQztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSwyQkFBMkIscUNBQXFDO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQjtBQUNBLHNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ25FQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7Ozs7OztBQ3JEQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ25DQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7Ozs7Ozs7QUN6REE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQ5YTk4OTYyYzQ3ODk1M2UzNGYxIiwiZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1pbiwgbWF4KSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGdldFJhbmRvbUludDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9nZXRSYW5kb21JbnQuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gYmFja2dyb3VuZChjb250ZXh0KSB7XHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgdGhpcy5pbWFnZS5zcmMgPSAnaW1nL2JhY2tncm91bmQyLnBuZyc7XHJcbiAgICB0aGlzLndpZHRoID0gOTA4O1xyXG4gICAgdGhpcy5oZWlndGggPSA1MTI7XHJcbiAgICB0aGlzLnN0ZXAgPSAwO1xyXG59O1xyXG5cclxuYmFja2dyb3VuZC5wcm90b3R5cGUucmVuZGVyQmFja2dyb3VuZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICArK3RoaXMuc3RlcDtcclxuICAgIGlmICh0aGlzLnN0ZXAgPT0gdGhpcy53aWR0aCkge1xyXG4gICAgICAgIHRoaXMuc3RlcCA9IDA7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDAsIDAsIHRoaXMuc3RlcCwgdGhpcy5oZWlndGgsIHRoaXMud2lkdGggLSB0aGlzLnN0ZXAsIDAsIHRoaXMuc3RlcCwgdGhpcy5oZWlndGgpO1xyXG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnN0ZXAsIDAsIHRoaXMud2lkdGggLSB0aGlzLnN0ZXAsIHRoaXMuaGVpZ3RoLCAwLCAwLCB0aGlzLndpZHRoIC0gdGhpcy5zdGVwLCB0aGlzLmhlaWd0aCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJhY2tncm91bmQ7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvYmFja2dyb3VuZC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjcmVhdHVyZXMgPSByZXF1aXJlKCcuL2NyZWF0dXJlcy5qcycpO1xyXG5cclxuZnVuY3Rpb24gY2hlY2soY2FudmFzLCBwbGF5ZXIsIHdhbGxzLCBjb2lucywgY2hpa2VucywgZmlyZUJhbGxzKSB7XHJcbiAgICB0aGlzLmZpZWxkID0gY2FudmFzO1xyXG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICB0aGlzLndhbGxzID0gd2FsbHM7XHJcbiAgICB0aGlzLmNvaW5zID0gY29pbnM7XHJcbiAgICB0aGlzLmNoaWtlbnMgPSBjaGlrZW5zO1xyXG4gICAgdGhpcy5maXJlQmFsbHMgPSBmaXJlQmFsbHM7XHJcbn1cclxuXHJcbmNoZWNrLnByb3RvdHlwZS5jaGVja0ludGVyc2VjdGlvbnMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaWZPdXRPZkZpZWxkKCkgfHwgdGhpcy5pZldhbGwoKTtcclxufVxyXG5cclxuY2hlY2sucHJvdG90eXBlLmlmT3V0T2ZGaWVsZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBpZiAodGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gPCAtMTApIHtcclxuICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvblsxXSA9IC0xMDtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gPiA1MTIpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuY2hlY2sucHJvdG90eXBlLmlmV2FsbCA9IGZ1bmN0aW9uIChhcmcpIHtcclxuXHJcbiAgICBsZXQgcmVzID0gZmFsc2U7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndhbGxzLndhbGxBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllci5wb3NpdGlvblswXSArIHRoaXMucGxheWVyLnNwcml0ZS53aWR0aCAtIDEwIDwgdGhpcy53YWxscy53YWxsQXJyYXlbaV0ucG9zaXRpb25bMF0gLSAxMCB8fFxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvblsxXSArIHRoaXMucGxheWVyLnNwcml0ZS5oZWlnaHQgLSAyMCA8IHRoaXMud2FsbHMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzFdIC0gMTAgfHxcclxuICAgICAgICAgICAgdGhpcy53YWxscy53YWxsQXJyYXlbaV0ucG9zaXRpb25bMF0gKyB0aGlzLndhbGxzLndhbGxBcnJheVtpXS53aWR0aCAtIDEwIDwgdGhpcy5wbGF5ZXIucG9zaXRpb25bMF0gKyAxMCB8fFxyXG4gICAgICAgICAgICB0aGlzLndhbGxzLndhbGxBcnJheVtpXS5wb3NpdGlvblsxXSArIHRoaXMud2FsbHMud2FsbEFycmF5W2ldLmhlaWd0aCAtIDEwIDwgdGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gKyAyMCkge1xyXG4gICAgICAgICAgICByZXMgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzO1xyXG59XHJcblxyXG5jaGVjay5wcm90b3R5cGUuaWZDcmVhdHVyZVRvQ29sbGVjdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBsZXQgcmVzID0gZmFsc2U7XHJcbiAgICBmb3IgKHByb3AgaW4gdGhpcykge1xyXG5cclxuICAgICAgICBpZiAodGhpc1twcm9wXSBpbnN0YW5jZW9mIGNyZWF0dXJlcykge1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzW3Byb3BdLmNyZWF0dXJlQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci5wb3NpdGlvblswXSArIHRoaXMucGxheWVyLndpZHRoIDwgdGhpc1twcm9wXS5jcmVhdHVyZUFycmF5W2ldLnBvc2l0aW9uWzBdIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gLSAxMCArIHRoaXMucGxheWVyLmhlaWdodCA8IHRoaXNbcHJvcF0uY3JlYXR1cmVBcnJheVtpXS5wb3NpdGlvblsxXSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbcHJvcF0uY3JlYXR1cmVBcnJheVtpXS5wb3NpdGlvblswXSArIHRoaXNbcHJvcF0uY3JlYXR1cmVBcnJheVtpXS53aWR0aCA8IHRoaXMucGxheWVyLnBvc2l0aW9uWzBdIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1twcm9wXS5jcmVhdHVyZUFycmF5W2ldLnBvc2l0aW9uWzFdICsgdGhpc1twcm9wXS5jcmVhdHVyZUFycmF5W2ldLmhlaWdodCA8IHRoaXMucGxheWVyLnBvc2l0aW9uWzFdICAtIDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgZWxzZSB7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW3Byb3BdLmNyZWF0dXJlQXJyYXkuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW3Byb3BdLnR5cGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NoZWNrLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIHBsYXllcihzcHJpdGUsIHBvc2l0aW9uLCB3aWR0aCwgaGVpZ2h0KSB7XG5cbiAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZTtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5ncmF2aXR5ID0gMTA7XG4gICAgdGhpcy5zcGVlZE9mRmFsbGluZyA9IDA7XG4gICAgdGhpcy5zdGVwID0gMDtcblxuICAgIHRoaXMub25GbHkgPSBmYWxzZTtcbiAgICB0aGlzLm51bSA9IDE7XG5cbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbn1cblxucGxheWVyLnByb3RvdHlwZS51cGRhdGVQbGF5ZXIgPSBmdW5jdGlvbiAoZGlmZikge1xuXG4gICAgdGhpcy5zcGVlZE9mRmFsbGluZyA9IE1hdGgucG93KDIgKiB0aGlzLmdyYXZpdHkgKiB0aGlzLnN0ZXAsIDEgLyAyKTtcblxuICAgIGlmICh0aGlzLm9uRmx5KSB7XG4gICAgICAgIHRoaXMuc3RlcCArPSAxMDA7XG4gICAgICAgIHRoaXMucG9zaXRpb25bMV0gLT0gdGhpcy5zcGVlZE9mRmFsbGluZyAqIGRpZmY7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGVwICs9IDYwO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWzFdICs9IHRoaXMuc3BlZWRPZkZhbGxpbmcgKiBkaWZmO1xuICAgIH1cblxuICAgIHRoaXMuc3ByaXRlLnVwZGF0ZShkaWZmKTtcbn1cblxucGxheWVyLnByb3RvdHlwZS5yZW5kZXJQbGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLnNwcml0ZS5jb250ZXh0LnNhdmUoKTtcbiAgICB0aGlzLnNwcml0ZS5jb250ZXh0LnRyYW5zbGF0ZSgwLCB0aGlzLnBvc2l0aW9uWzFdKTtcbiAgICB0aGlzLnNwcml0ZS5yZW5kZXIodGhpcy5udW0pO1xuICAgIHRoaXMuc3ByaXRlLmNvbnRleHQucmVzdG9yZSgpO1xufVxuXG5wbGF5ZXIucHJvdG90eXBlLmZseSA9IGZ1bmN0aW9uIChhcmcpIHtcblxuICAgIGlmICghdGhpcy5vbkZseSkge1xuICAgICAgICB0aGlzLnN0ZXAgPSAwO1xuICAgICAgICB0aGlzLm51bSA9IDQ7XG4gICAgfSBcbiAgICBpZiAoIWFyZykge1xuICAgICAgICB0aGlzLnN0ZXAgPSAwO1xuICAgICAgICB0aGlzLm51bSA9IDE7XG4gICAgfVxuICAgIHRoaXMub25GbHkgPSBhcmc7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBwbGF5ZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL3BsYXllci5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBTcHJpdGUoY29udGV4dCwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIHNwZWVkLCBmcmFtZXMpIHtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB0aGlzLmltYWdlID0gaW1hZ2U7XHJcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcbiAgICB0aGlzLmZyYW1lcyA9IGZyYW1lcztcclxuICAgIHRoaXMuZHVyYXRpb24gPSAwO1xyXG5cclxufTtcclxuXHJcblNwcml0ZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKG51bSkge1xyXG5cclxuICAgIGxldCByb3VuZGVkRHVyYXRpb24gPSBNYXRoLnJvdW5kKHRoaXMuZHVyYXRpb24pO1xyXG4gICAgbGV0IGZyYW1lID0gdGhpcy5mcmFtZXNbcm91bmRlZER1cmF0aW9uICUgbnVtXTtcclxuICAgIGxldCB4ID0gZnJhbWUgKiB0aGlzLndpZHRoO1xyXG4gICAgbGV0IHkgPSAwO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgdGhpcy5pbWFnZSxcclxuICAgICAgICB4LFxyXG4gICAgICAgIHksXHJcbiAgICAgICAgdGhpcy53aWR0aCxcclxuICAgICAgICB0aGlzLmhlaWdodCxcclxuICAgICAgICAwLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgdGhpcy53aWR0aCxcclxuICAgICAgICB0aGlzLmhlaWdodCk7XHJcbn07XHJcblxyXG5TcHJpdGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkaWZmKSB7XHJcbiAgICB0aGlzLmR1cmF0aW9uICs9IHRoaXMuc3BlZWQgKiBkaWZmO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTcHJpdGU7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvc3ByaXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImdldFJhbmRvbUludCA9IHJlcXVpcmUoJy4vZ2V0UmFuZG9tSW50LmpzJyk7XHJcblxyXG5mdW5jdGlvbiB3YWxscyhjb250ZXh0KSB7XHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgdGhpcy53YWxsQXJyYXkgPSBbXTtcclxuICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgIHRoaXMuaW1hZ2Uuc3JjID0gJ2ltZy93YWxsLnBuZyc7XHJcbiAgICB0aGlzLnNwYWNlSGVpZ3RoID0gMTAwO1xyXG4gICAgdGhpcy53aWR0aE9mV2FsbCA9IDUwO1xyXG4gICAgdGhpcy50aW1lID0gNzU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdhbGwocG9zLCB3aWR0aCwgaGVpZ3RoKSB7XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zO1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlndGggPSBoZWlndGg7XHJcbn1cclxuXHJcbndhbGxzLnByb3RvdHlwZS5yZW5kZXJXYWxscyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMud2FsbEFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgICAgdGhpcy5pbWFnZSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0ud2lkdGgsXHJcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLmhlaWd0aCxcclxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0ucG9zaXRpb25bMF0sXHJcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzFdLFxyXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS53aWR0aCxcclxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0uaGVpZ3RoKTtcclxuICAgIH1cclxufVxyXG5cclxud2FsbHMucHJvdG90eXBlLnVwZGF0ZVdhbGxzID0gZnVuY3Rpb24gKGRpZmYpIHtcclxuXHJcbiAgICB0aGlzLnRpbWUgKz0gTWF0aC5yb3VuZChkaWZmICogNjApO1xyXG5cclxuICAgIGlmICh0aGlzLnRpbWUgJSAxNTAgPT0gMTQ5KSB7XHJcblxyXG4gICAgICAgIGxldCByYW5kb21TcGFjZVBvc2l0aW9uID0gZ2V0UmFuZG9tSW50KDAsIDEwMCk7XHJcblxyXG4gICAgICAgIHRoaXMud2FsbEFycmF5LnB1c2gobmV3IHdhbGwoWzkxMCwgcmFuZG9tU3BhY2VQb3NpdGlvbl0sIHRoaXMud2lkdGhPZldhbGwsIDExMCkpO1xyXG4gICAgICAgIHRoaXMud2FsbEFycmF5LnB1c2gobmV3IHdhbGwoWzkxMCwgcmFuZG9tU3BhY2VQb3NpdGlvbiArIGdldFJhbmRvbUludCgxMDAsIDIwMCkgKyAxMTBdLCB0aGlzLndpZHRoT2ZXYWxsLCAxMTApKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLndhbGxBcnJheS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHZhbHVlLnBvc2l0aW9uWzBdIC09IDI7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLndhbGxBcnJheS5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgaWYgKHZhbHVlLnBvc2l0aW9uWzBdIDwgLTEwMCkge1xyXG4gICAgICAgICAgICBhcnJheS5zaGlmdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHdhbGxzO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL3dhbGxzLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImdldFJhbmRvbUludCA9IHJlcXVpcmUoJy4vZ2V0UmFuZG9tSW50LmpzJyk7XHJcblxyXG5mdW5jdGlvbiBjcmVhdHVyZXMoc3ByaXRlLCB0eXBlLCB0aW1lT2ZBcHBlYXJpbmcsIHNwZWVkLCB3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG4gICAgdGhpcy5zcHJpdGUgPSBzcHJpdGU7XHJcbiAgICB0aGlzLmNyZWF0dXJlQXJyYXkgPSBbXTtcclxuXHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgdGhpcy50aW1lT2ZBcHBlYXJpbmcgPSB0aW1lT2ZBcHBlYXJpbmc7XHJcbiAgICB0aGlzLnRpbWUgPSA1MDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXR1cmUocG9zaXRpb24sIHNwcml0ZSwgd2lkdGgsIGhlaWdodCkge1xyXG5cclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgXHJcbiAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZTtcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxufVxyXG5cclxuY3JlYXR1cmVzLnByb3RvdHlwZS51cGRhdGVDcmVhdHVyZXMgPSBmdW5jdGlvbiAoZGlmZikge1xyXG5cclxuICAgIHRoaXMudGltZSArPSBNYXRoLnJvdW5kKGRpZmYgKiA2MCk7XHJcbiAgICBpZiAodGhpcy50aW1lICUgdGhpcy50aW1lT2ZBcHBlYXJpbmcgPT0gKHRoaXMudGltZU9mQXBwZWFyaW5nIC0gMSkpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNyZWF0dXJlQXJyYXkucHVzaChuZXcgY3JlYXR1cmUoWzgzMCwgZ2V0UmFuZG9tSW50KDAsIDQ4MCldLCB0aGlzLnNwcml0ZSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNyZWF0dXJlQXJyYXkuZm9yRWFjaCgodmFsdWUpID0+IHtcclxuICAgICAgICB2YWx1ZS5wb3NpdGlvblswXSAtPSB0aGlzLnNwZWVkO1xyXG4gICAgICAgIHZhbHVlLnNwcml0ZS51cGRhdGUoZGlmZik7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNyZWF0dXJlQXJyYXkuZm9yRWFjaCgodmFsdWUsIGluZGV4LCBhcnJheSkgPT4ge1xyXG4gICAgICAgIGlmICh2YWx1ZS5wb3NpdGlvblswXSA8IC0xMDApIHtcclxuICAgICAgICAgICAgYXJyYXkuc2hpZnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbmNyZWF0dXJlcy5wcm90b3R5cGUucmVuZGVyQ3JlYXR1cmVzID0gZnVuY3Rpb24gKG51bU9mRnJhbWVzKSB7XHJcblxyXG4gICAgdGhpcy5jcmVhdHVyZUFycmF5LmZvckVhY2goKHZhbHVlLCBpbmRleCwgYXJyYXkpID0+IHtcclxuXHJcbiAgICAgICAgdmFsdWUuc3ByaXRlLmNvbnRleHQuc2F2ZSgpO1xyXG4gICAgICAgIHZhbHVlLnNwcml0ZS5jb250ZXh0LnRyYW5zbGF0ZSh2YWx1ZS5wb3NpdGlvblswXSwgdmFsdWUucG9zaXRpb25bMV0pO1xyXG4gICAgICAgIHZhbHVlLnNwcml0ZS5yZW5kZXIobnVtT2ZGcmFtZXMpO1xyXG4gICAgICAgIHZhbHVlLnNwcml0ZS5jb250ZXh0LnJlc3RvcmUoKTtcclxuXHJcbiAgICB9KTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0dXJlcztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jcmVhdHVyZXMuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gY29uc3QgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5jb25zdCBTcHJpdGUgPSByZXF1aXJlKCcuL3Nwcml0ZS5qcycpO1xyXG5jb25zdCBwbGF5ZXIgPSByZXF1aXJlKCcuL3BsYXllci5qcycpO1xyXG5jb25zdCBiYWNrZ3JvdW5kID0gcmVxdWlyZSgnLi9iYWNrZ3JvdW5kLmpzJyk7XHJcbmNvbnN0IHdhbGxzID0gcmVxdWlyZSgnLi93YWxscy5qcycpO1xyXG5jb25zdCBjaGVjayA9IHJlcXVpcmUoJy4vY2hlY2suanMnKTtcclxuLy8gY29uc3QgYm9vdHN0cmFwID0gcmVxdWlyZSgnYm9vdHN0cmFwJyk7XHJcblxyXG5sZXQgcmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xyXG4gICAgICAgIH07XHJcbn0pKCk7XHJcblxyXG5sZXQgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xyXG5sZXQgZHJhZ29uLCB3YWxsQXJyYXksIGNvaW5BcnJheSwgY2hpa2VuQXJyYXksIGJhY2tncm91bmRJbWFnZSwgZmlyZUJhbGxBcnJheSwgY2hlY2tPYmo7XHJcbmxldCBpc0dhbWVPdmVyID0gZmFsc2U7XHJcbmxldCBnYW1lU3RhcnRlZCA9IGZhbHNlO1xyXG5sZXQgaXNQcm9ncmVzc0JhckVuZCA9IGZhbHNlO1xyXG5sZXQgZ2FtZVRpbWUgPSAwO1xyXG5sZXQgZ2FtZVRpbWVSZWMgPSAxO1xyXG5cclxubGV0IHBpY2tDaGlja2VuO1xyXG5sZXQgcGlja0NvaW47XHJcbmxldCBjcmFzaDtcclxubGV0IG11c2ljID0gbmV3IEF1ZGlvKCcuL21zYy9ncmllZ19pbl90aGVfaGFsXyBvZl90aGVfbW91bnRhaW5fa2luZy5tcDMnKTtcclxuXHJcbmxldCBjdXJyZW50UHJvZ3JlcztcclxubGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbmxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuY2FudmFzLndpZHRoID0gOTA4O1xyXG5jYW52YXMuaGVpZ2h0ID0gNTEyO1xyXG5cclxuJCgnLnBsYXknKS5hZnRlcihjYW52YXMpO1xyXG4vLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XHJcblxyXG5sZXQgcHJvZ3Jlc3NTdHJpcGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGlyZWRuZXNzU3RyaXBlJyk7XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVQcm9ncmVzc0JhcigpIHtcclxuXHJcbiAgICBsZXQgY3VycmVudFRpbWUgPSBNYXRoLmZsb29yKGdhbWVUaW1lKTtcclxuXHJcbiAgICBpZiAoY3VycmVudFRpbWUgPiBnYW1lVGltZVJlYykge1xyXG4gICAgICAgIGdhbWVUaW1lUmVjID0gY3VycmVudFRpbWU7XHJcbiAgICAgICAgY3VycmVudFByb2dyZXMgPSBwYXJzZUludChwcm9ncmVzc1N0cmlwZS5zdHlsZS53aWR0aCk7XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50UHJvZ3JlcyA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdXJyZW50UHJvZ3JlcyAtPSAxO1xyXG4gICAgICAgIG1vcmVGaXJlQmFsbHMoKTtcclxuICAgICAgICBwcm9ncmVzc1N0cmlwZS5zdHlsZS53aWR0aCA9IGN1cnJlbnRQcm9ncmVzICsgJyUnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTY29yZXMoKSB7XHJcblxyXG4gICAgcGlja0NvaW4ucGxheSgpO1xyXG4gICAgbGV0IHNjb3JlcyA9IGRvY3VtZW50LmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2NvcmVzJylbMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0cm9uZycpO1xyXG4gICAgbGV0IHNjb3JlID0gcGFyc2VJbnQoc2NvcmVzWzBdLmlubmVySFRNTCk7XHJcbiAgICBzY29yZXNbMF0uaW5uZXJIVE1MID0gc2NvcmUgKyAxO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJBbGwoKSB7XHJcblxyXG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCA5MDgsIDUxMik7XHJcbiAgICBiYWNrZ3JvdW5kSW1hZ2UucmVuZGVyQmFja2dyb3VuZCgpO1xyXG4gICAgZHJhZ29uLnJlbmRlclBsYXllcigpO1xyXG4gICAgd2FsbEFycmF5LnJlbmRlcldhbGxzKCk7XHJcbiAgICBjaGlrZW5BcnJheS5yZW5kZXJDcmVhdHVyZXMoMyk7XHJcbiAgICBjb2luQXJyYXkucmVuZGVyQ3JlYXR1cmVzKDkpO1xyXG4gICAgZmlyZUJhbGxBcnJheS5yZW5kZXJDcmVhdHVyZXMoNik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUFsbChkaWZmKSB7XHJcblxyXG4gICAgZHJhZ29uLnVwZGF0ZVBsYXllcihkaWZmKTtcclxuICAgIHdhbGxBcnJheS51cGRhdGVXYWxscyhkaWZmKTtcclxuICAgIGNoaWtlbkFycmF5LnVwZGF0ZUNyZWF0dXJlcyhkaWZmKTtcclxuICAgIGNvaW5BcnJheS51cGRhdGVDcmVhdHVyZXMoZGlmZik7XHJcbiAgICBmaXJlQmFsbEFycmF5LnVwZGF0ZUNyZWF0dXJlcyhkaWZmKTtcclxuXHJcbiAgICBpc1Byb2dyZXNzQmFyRW5kID0gdXBkYXRlUHJvZ3Jlc3NCYXIoKTtcclxuXHJcbiAgICBpc0dhbWVPdmVyID0gY2hlY2tPYmouY2hlY2tJbnRlcnNlY3Rpb25zKCk7XHJcblxyXG4gICAgbGV0IGNvbGxlY3RlZCA9IGNoZWNrT2JqLmlmQ3JlYXR1cmVUb0NvbGxlY3QoKTtcclxuICAgIGlmIChjb2xsZWN0ZWQgPT0gJ2NvaW4nKSB7XHJcblxyXG4gICAgICAgIHVwZGF0ZVNjb3JlcygpO1xyXG4gICAgfSBlbHNlIGlmIChjb2xsZWN0ZWQgPT0gJ2NoaWNrZW4nKSB7XHJcblxyXG4gICAgICAgIHBpY2tDaGlja2VuLnBsYXkoKTtcclxuICAgICAgICBjdXJyZW50UHJvZ3JlcyA9IHBhcnNlSW50KHByb2dyZXNzU3RyaXBlLnN0eWxlLndpZHRoKTtcclxuICAgICAgICBjdXJyZW50UHJvZ3JlcyArPSAxMDtcclxuICAgICAgICBtb3JlRmlyZUJhbGxzKCk7XHJcbiAgICAgICAgcHJvZ3Jlc3NTdHJpcGUuc3R5bGUud2lkdGggPSBjdXJyZW50UHJvZ3JlcyArICclJztcclxuICAgIH0gZWxzZSBpZiAoY29sbGVjdGVkID09ICdmaXJlJykge1xyXG4gICAgICAgIGdhbWVPdmVyKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vbWFpbiBsb29wXHJcbmZ1bmN0aW9uIG1haW4oKSB7XHJcblxyXG4gICAgbGV0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgICBsZXQgZGlmZiA9IChub3cgLSBsYXN0VGltZSkgLyAxMDAwO1xyXG4gICAgdXBkYXRlQWxsKGRpZmYpO1xyXG4gICAgcmVuZGVyQWxsKCk7XHJcbiAgICBsYXN0VGltZSA9IG5vdztcclxuICAgIGdhbWVUaW1lICs9IGRpZmY7XHJcbiAgICBpZiAoIWlzR2FtZU92ZXIgJiYgIWlzUHJvZ3Jlc3NCYXJFbmQpIHtcclxuICAgICAgICByZXF1ZXN0QW5pbUZyYW1lKG1haW4pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBtdXNpYy5wYXVzZSgpO1xyXG4gICAgICAgIGdhbWVPdmVyKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRDb250ZW50KCkge1xyXG5cclxuICAgIHBpY2tDaGlja2VuID0gbmV3IEF1ZGlvKCcuL21zYy9zZnhfcGljay5mbGFjJyk7XHJcbiAgICBwaWNrQ29pbiA9IG5ldyBBdWRpbygnLi9tc2MvY29pbnNfNS53YXYnKTtcclxuICAgIGNyYXNoID0gbmV3IEF1ZGlvKCcuL21zYy9xdWJvZHVwLWNyYXNoLm9nZycpO1xyXG5cclxuICAgIGNvbnN0IGRyYWdvbkltZyA9IG5ldyBJbWFnZSgnaW1nL2RyYWdvbi1mbHkucG5nJyk7XHJcbiAgICBkcmFnb25JbWcuc3JjID0gJ2ltZy9kcmFnb24tZmx5LnBuZyc7XHJcblxyXG4gICAgY29uc3QgY29pbkltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgY29pbkltZy5zcmMgPSAnaW1nL2NvaW4ucG5nJztcclxuXHJcbiAgICBjb25zdCBjaGlrZW5JbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGNoaWtlbkltZy5zcmMgPSAnaW1nL2NoaWNrZW4ucG5nJztcclxuXHJcbiAgICBjb25zdCBmaXJlQmFsbEltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgZmlyZUJhbGxJbWcuc3JjID0gJ2ltZy9maXJlQmFsbC5wbmcnO1xyXG5cclxuICAgIGJhY2tncm91bmRJbWFnZSA9IG5ldyBiYWNrZ3JvdW5kKGN0eCk7XHJcblxyXG4gICAgZHJhZ29uID0gbmV3IHBsYXllcihuZXcgU3ByaXRlKGN0eCwgOTQsIDY3LCBkcmFnb25JbWcsIDE2LCBbMCwgMSwgMiwgM10pLCBbMCwgMF0sIDgwLCA0MCk7XHJcblxyXG4gICAgd2FsbEFycmF5ID0gbmV3IHdhbGxzKGN0eCk7XHJcblxyXG4gICAgY2hpa2VuQXJyYXkgPSBuZXcgY3JlYXR1cmVzKG5ldyBTcHJpdGUoY3R4LCA0NS4zMywgNTUsIGNoaWtlbkltZywgNiwgWzAsIDEsIDJdKSwgJ2NoaWNrZW4nLCA3MDAsIDIsIDQ2LCA1NSlcclxuXHJcbiAgICBjb2luQXJyYXkgPSBuZXcgY3JlYXR1cmVzKG5ldyBTcHJpdGUoY3R4LCA1MCwgNTAsIGNvaW5JbWcsIDYsIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XSksICdjb2luJywgMTAwLCAyLCA1MCwgNTApO1xyXG5cclxuICAgIGZpcmVCYWxsQXJyYXkgPSBuZXcgY3JlYXR1cmVzKG5ldyBTcHJpdGUoY3R4LCAxNDMsIDU1LCBmaXJlQmFsbEltZywgNiwgWzAsIDEsIDIsIDMsIDQsIDVdKSwgJ2ZpcmUnLCAxMDAsIDUsIDI1LCAyNSk7XHJcblxyXG4gICAgY2hlY2tPYmogPSBuZXcgY2hlY2soY2FudmFzLCBkcmFnb24sIHdhbGxBcnJheSwgY29pbkFycmF5LCBjaGlrZW5BcnJheSwgZmlyZUJhbGxBcnJheSk7XHJcblxyXG4gICAgLy9ldmVudCB3aGVuIGZseWluZyB1cFxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgZHJhZ29uLmZseSh0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vZXZlbnQgd2hlbiBzdG9wIGZseWluZyB1cFxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGRyYWdvbi5mbHkoZmFsc2UpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdhbWVPdmVyKCkge1xyXG4gICAgY3Jhc2gucGxheSgpO1xyXG4gICAgZ2FtZVN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgJCgnLnBsYXknKS5zaG93KCk7XHJcbiAgICAkKCcjZ2FtZU92ZXInKS5zaG93KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vcmVGaXJlQmFsbHMoKSB7XHJcblxyXG4gICAgaWYgKCFjdXJyZW50UHJvZ3JlcyA8IDIwKSB7XHJcbiAgICAgICAgZmlyZUJhbGxBcnJheS50aW1lT2ZBcHBlYXJpbmcgPSBjdXJyZW50UHJvZ3JlcztcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xyXG4gICAgbGV0IHNjb3JlcyA9IGRvY3VtZW50LmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2NvcmVzJylbMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0cm9uZycpO1xyXG4gICAgc2NvcmVzWzBdLmlubmVySFRNTCA9ICcwJztcclxuICAgIGdhbWVTdGFydGVkID0gdHJ1ZTtcclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgOTA4LCA1MTIpO1xyXG4gICAgbG9hZENvbnRlbnQoKTtcclxuICAgIGlzR2FtZU92ZXIgPSBmYWxzZTtcclxuICAgIG11c2ljID0gbmV3IEF1ZGlvKCcuL21zYy9ncmllZ19pbl90aGVfaGFsXyBvZl90aGVfbW91bnRhaW5fa2luZy5tcDMnKTtcclxuICAgIHByb2dyZXNzU3RyaXBlLnN0eWxlLndpZHRoID0gJzEwMCUnO1xyXG4gICAgbXVzaWMucGxheSgpO1xyXG4gICAgbWFpbigpO1xyXG59XHJcblxyXG5tdXNpYy5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5jdXJyZW50VGltZSA9IDA7XHJcbiAgICB0aGlzLnBsYXkoKTtcclxufSwgZmFsc2UpO1xyXG5cclxuJCgnLnBsYXknKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICQoJy5wbGF5JykuaGlkZSgpO1xyXG4gICAgJCgnI2dhbWVPdmVyJykuaGlkZSgpO1xyXG4gICAgc3RhcnRHYW1lKCk7XHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkua2V5cHJlc3MoZnVuY3Rpb24oZSkge1xyXG4gICAgaWYgKGUud2hpY2ggPT0gMTMpIHtcclxuICAgICAgICBpZiAoIWdhbWVTdGFydGVkKSB7XHJcbiAgICAgICAgICAgICQoJy5wbGF5JykuY2xpY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=