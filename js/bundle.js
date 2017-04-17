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
    } else if (!arg) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWZhNjVhN2EzYjA3NTJlNzRkMDgiLCJ3ZWJwYWNrOi8vLy4vanMvZ2V0UmFuZG9tSW50LmpzIiwid2VicGFjazovLy8uL2pzL2JhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vanMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL2pzL3Nwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy93YWxscy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jcmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNuQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsbUJBQW1CLGlDQUFpQztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSwyQkFBMkIscUNBQXFDO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQjtBQUNBLHNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ25FQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7Ozs7Ozs7QUNwREE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNuQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLDJCQUEyQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOzs7Ozs7O0FDekRBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5ZmE2NWE3YTNiMDc1MmU3NGQwOCIsImZ1bmN0aW9uIGdldFJhbmRvbUludChtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYW5kb21JbnQ7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvZ2V0UmFuZG9tSW50LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIGJhY2tncm91bmQoY29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgIHRoaXMuaW1hZ2Uuc3JjID0gJ2ltZy9iYWNrZ3JvdW5kMi5wbmcnO1xyXG4gICAgdGhpcy53aWR0aCA9IDkwODtcclxuICAgIHRoaXMuaGVpZ3RoID0gNTEyO1xyXG4gICAgdGhpcy5zdGVwID0gMDtcclxufTtcclxuXHJcbmJhY2tncm91bmQucHJvdG90eXBlLnJlbmRlckJhY2tncm91bmQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgKyt0aGlzLnN0ZXA7XHJcbiAgICBpZiAodGhpcy5zdGVwID09IHRoaXMud2lkdGgpIHtcclxuICAgICAgICB0aGlzLnN0ZXAgPSAwO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAwLCAwLCB0aGlzLnN0ZXAsIHRoaXMuaGVpZ3RoLCB0aGlzLndpZHRoIC0gdGhpcy5zdGVwLCAwLCB0aGlzLnN0ZXAsIHRoaXMuaGVpZ3RoKTtcclxuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy5zdGVwLCAwLCB0aGlzLndpZHRoIC0gdGhpcy5zdGVwLCB0aGlzLmhlaWd0aCwgMCwgMCwgdGhpcy53aWR0aCAtIHRoaXMuc3RlcCwgdGhpcy5oZWlndGgpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBiYWNrZ3JvdW5kO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2JhY2tncm91bmQuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY3JlYXR1cmVzID0gcmVxdWlyZSgnLi9jcmVhdHVyZXMuanMnKTtcclxuXHJcbmZ1bmN0aW9uIGNoZWNrKGNhbnZhcywgcGxheWVyLCB3YWxscywgY29pbnMsIGNoaWtlbnMsIGZpcmVCYWxscykge1xyXG4gICAgdGhpcy5maWVsZCA9IGNhbnZhcztcclxuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgdGhpcy53YWxscyA9IHdhbGxzO1xyXG4gICAgdGhpcy5jb2lucyA9IGNvaW5zO1xyXG4gICAgdGhpcy5jaGlrZW5zID0gY2hpa2VucztcclxuICAgIHRoaXMuZmlyZUJhbGxzID0gZmlyZUJhbGxzO1xyXG59XHJcblxyXG5jaGVjay5wcm90b3R5cGUuY2hlY2tJbnRlcnNlY3Rpb25zID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHJldHVybiB0aGlzLmlmT3V0T2ZGaWVsZCgpIHx8IHRoaXMuaWZXYWxsKCk7XHJcbn1cclxuXHJcbmNoZWNrLnByb3RvdHlwZS5pZk91dE9mRmllbGQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgaWYgKHRoaXMucGxheWVyLnBvc2l0aW9uWzFdIDwgLTEwKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gPSAtMTA7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucGxheWVyLnBvc2l0aW9uWzFdID4gNTEyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbmNoZWNrLnByb3RvdHlwZS5pZldhbGwgPSBmdW5jdGlvbiAoYXJnKSB7XHJcblxyXG4gICAgbGV0IHJlcyA9IGZhbHNlO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53YWxscy53YWxsQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXIucG9zaXRpb25bMF0gKyB0aGlzLnBsYXllci5zcHJpdGUud2lkdGggLSAxMCA8IHRoaXMud2FsbHMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzBdIC0gMTAgfHxcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gKyB0aGlzLnBsYXllci5zcHJpdGUuaGVpZ2h0IC0gMjAgPCB0aGlzLndhbGxzLndhbGxBcnJheVtpXS5wb3NpdGlvblsxXSAtIDEwIHx8XHJcbiAgICAgICAgICAgIHRoaXMud2FsbHMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzBdICsgdGhpcy53YWxscy53YWxsQXJyYXlbaV0ud2lkdGggLSAxMCA8IHRoaXMucGxheWVyLnBvc2l0aW9uWzBdICsgMTAgfHxcclxuICAgICAgICAgICAgdGhpcy53YWxscy53YWxsQXJyYXlbaV0ucG9zaXRpb25bMV0gKyB0aGlzLndhbGxzLndhbGxBcnJheVtpXS5oZWlndGggLSAxMCA8IHRoaXMucGxheWVyLnBvc2l0aW9uWzFdICsgMjApIHtcclxuICAgICAgICAgICAgcmVzID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcztcclxufVxyXG5cclxuY2hlY2sucHJvdG90eXBlLmlmQ3JlYXR1cmVUb0NvbGxlY3QgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgbGV0IHJlcyA9IGZhbHNlO1xyXG4gICAgZm9yIChwcm9wIGluIHRoaXMpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXNbcHJvcF0gaW5zdGFuY2VvZiBjcmVhdHVyZXMpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpc1twcm9wXS5jcmVhdHVyZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIucG9zaXRpb25bMF0gKyB0aGlzLnBsYXllci53aWR0aCA8IHRoaXNbcHJvcF0uY3JlYXR1cmVBcnJheVtpXS5wb3NpdGlvblswXSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc2l0aW9uWzFdIC0gMTAgKyB0aGlzLnBsYXllci5oZWlnaHQgPCB0aGlzW3Byb3BdLmNyZWF0dXJlQXJyYXlbaV0ucG9zaXRpb25bMV0gfHxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW3Byb3BdLmNyZWF0dXJlQXJyYXlbaV0ucG9zaXRpb25bMF0gKyB0aGlzW3Byb3BdLmNyZWF0dXJlQXJyYXlbaV0ud2lkdGggPCB0aGlzLnBsYXllci5wb3NpdGlvblswXSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbcHJvcF0uY3JlYXR1cmVBcnJheVtpXS5wb3NpdGlvblsxXSArIHRoaXNbcHJvcF0uY3JlYXR1cmVBcnJheVtpXS5oZWlnaHQgPCB0aGlzLnBsYXllci5wb3NpdGlvblsxXSAgLSAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIGVsc2UgeyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1twcm9wXS5jcmVhdHVyZUFycmF5LnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1twcm9wXS50eXBlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcztcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjaGVjaztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBwbGF5ZXIoc3ByaXRlLCBwb3NpdGlvbiwgd2lkdGgsIGhlaWdodCkge1xyXG5cclxuICAgIHRoaXMuc3ByaXRlID0gc3ByaXRlO1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgdGhpcy5ncmF2aXR5ID0gMTA7XHJcbiAgICB0aGlzLnNwZWVkT2ZGYWxsaW5nID0gMDtcclxuICAgIHRoaXMuc3RlcCA9IDA7XHJcblxyXG4gICAgdGhpcy5vbkZseSA9IGZhbHNlO1xyXG4gICAgdGhpcy5udW0gPSAxO1xyXG5cclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxufVxyXG5cclxucGxheWVyLnByb3RvdHlwZS51cGRhdGVQbGF5ZXIgPSBmdW5jdGlvbiAoZGlmZikge1xyXG5cclxuICAgIHRoaXMuc3BlZWRPZkZhbGxpbmcgPSBNYXRoLnBvdygyICogdGhpcy5ncmF2aXR5ICogdGhpcy5zdGVwLCAxIC8gMik7XHJcblxyXG4gICAgaWYgKHRoaXMub25GbHkpIHtcclxuICAgICAgICB0aGlzLnN0ZXAgKz0gMTAwO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb25bMV0gLT0gdGhpcy5zcGVlZE9mRmFsbGluZyAqIGRpZmY7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3RlcCArPSA2MDtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uWzFdICs9IHRoaXMuc3BlZWRPZkZhbGxpbmcgKiBkaWZmO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3ByaXRlLnVwZGF0ZShkaWZmKTtcclxufVxyXG5cclxucGxheWVyLnByb3RvdHlwZS5yZW5kZXJQbGF5ZXIgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdGhpcy5zcHJpdGUuY29udGV4dC5zYXZlKCk7XHJcbiAgICB0aGlzLnNwcml0ZS5jb250ZXh0LnRyYW5zbGF0ZSgwLCB0aGlzLnBvc2l0aW9uWzFdKTtcclxuICAgIHRoaXMuc3ByaXRlLnJlbmRlcih0aGlzLm51bSk7XHJcbiAgICB0aGlzLnNwcml0ZS5jb250ZXh0LnJlc3RvcmUoKTtcclxufVxyXG5cclxucGxheWVyLnByb3RvdHlwZS5mbHkgPSBmdW5jdGlvbiAoYXJnKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLm9uRmx5KSB7XHJcbiAgICAgICAgdGhpcy5zdGVwID0gMDtcclxuICAgICAgICB0aGlzLm51bSA9IDQ7XHJcbiAgICB9IGVsc2UgaWYgKCFhcmcpIHtcclxuICAgICAgICB0aGlzLnN0ZXAgPSAwO1xyXG4gICAgICAgIHRoaXMubnVtID0gMTtcclxuICAgIH1cclxuICAgIHRoaXMub25GbHkgPSBhcmc7XHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHBsYXllcjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9wbGF5ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gU3ByaXRlKGNvbnRleHQsIHdpZHRoLCBoZWlnaHQsIGltYWdlLCBzcGVlZCwgZnJhbWVzKSB7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgdGhpcy5pbWFnZSA9IGltYWdlO1xyXG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgdGhpcy5mcmFtZXMgPSBmcmFtZXM7XHJcbiAgICB0aGlzLmR1cmF0aW9uID0gMDtcclxuXHJcbn07XHJcblxyXG5TcHJpdGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChudW0pIHtcclxuXHJcbiAgICBsZXQgcm91bmRlZER1cmF0aW9uID0gTWF0aC5yb3VuZCh0aGlzLmR1cmF0aW9uKTtcclxuICAgIGxldCBmcmFtZSA9IHRoaXMuZnJhbWVzW3JvdW5kZWREdXJhdGlvbiAlIG51bV07XHJcbiAgICBsZXQgeCA9IGZyYW1lICogdGhpcy53aWR0aDtcclxuICAgIGxldCB5ID0gMDtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICAgIHRoaXMuaW1hZ2UsXHJcbiAgICAgICAgeCxcclxuICAgICAgICB5LFxyXG4gICAgICAgIHRoaXMud2lkdGgsXHJcbiAgICAgICAgdGhpcy5oZWlnaHQsXHJcbiAgICAgICAgMCxcclxuICAgICAgICAwLFxyXG4gICAgICAgIHRoaXMud2lkdGgsXHJcbiAgICAgICAgdGhpcy5oZWlnaHQpO1xyXG59O1xyXG5cclxuU3ByaXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZGlmZikge1xyXG4gICAgdGhpcy5kdXJhdGlvbiArPSB0aGlzLnNwZWVkICogZGlmZjtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3ByaXRlO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL3Nwcml0ZS5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJnZXRSYW5kb21JbnQgPSByZXF1aXJlKCcuL2dldFJhbmRvbUludC5qcycpO1xyXG5cclxuZnVuY3Rpb24gd2FsbHMoY29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgIHRoaXMud2FsbEFycmF5ID0gW107XHJcbiAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICB0aGlzLmltYWdlLnNyYyA9ICdpbWcvd2FsbC5wbmcnO1xyXG4gICAgdGhpcy5zcGFjZUhlaWd0aCA9IDEwMDtcclxuICAgIHRoaXMud2lkdGhPZldhbGwgPSA1MDtcclxuICAgIHRoaXMudGltZSA9IDc1O1xyXG59XHJcblxyXG5mdW5jdGlvbiB3YWxsKHBvcywgd2lkdGgsIGhlaWd0aCkge1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvcztcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ3RoID0gaGVpZ3RoO1xyXG59XHJcblxyXG53YWxscy5wcm90b3R5cGUucmVuZGVyV2FsbHMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndhbGxBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLndpZHRoLFxyXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5oZWlndGgsXHJcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzBdLFxyXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5wb3NpdGlvblsxXSxcclxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0ud2lkdGgsXHJcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLmhlaWd0aCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbndhbGxzLnByb3RvdHlwZS51cGRhdGVXYWxscyA9IGZ1bmN0aW9uIChkaWZmKSB7XHJcblxyXG4gICAgdGhpcy50aW1lICs9IE1hdGgucm91bmQoZGlmZiAqIDYwKTtcclxuXHJcbiAgICBpZiAodGhpcy50aW1lICUgMTUwID09IDE0OSkge1xyXG5cclxuICAgICAgICBsZXQgcmFuZG9tU3BhY2VQb3NpdGlvbiA9IGdldFJhbmRvbUludCgwLCAxMDApO1xyXG5cclxuICAgICAgICB0aGlzLndhbGxBcnJheS5wdXNoKG5ldyB3YWxsKFs5MTAsIHJhbmRvbVNwYWNlUG9zaXRpb25dLCB0aGlzLndpZHRoT2ZXYWxsLCAxMTApKTtcclxuICAgICAgICB0aGlzLndhbGxBcnJheS5wdXNoKG5ldyB3YWxsKFs5MTAsIHJhbmRvbVNwYWNlUG9zaXRpb24gKyBnZXRSYW5kb21JbnQoMTAwLCAyMDApICsgMTEwXSwgdGhpcy53aWR0aE9mV2FsbCwgMTEwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy53YWxsQXJyYXkuZm9yRWFjaCgodmFsdWUpID0+IHtcclxuICAgICAgICB2YWx1ZS5wb3NpdGlvblswXSAtPSAyO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy53YWxsQXJyYXkuZm9yRWFjaCgodmFsdWUsIGluZGV4LCBhcnJheSkgPT4ge1xyXG4gICAgICAgIGlmICh2YWx1ZS5wb3NpdGlvblswXSA8IC0xMDApIHtcclxuICAgICAgICAgICAgYXJyYXkuc2hpZnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB3YWxscztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy93YWxscy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJnZXRSYW5kb21JbnQgPSByZXF1aXJlKCcuL2dldFJhbmRvbUludC5qcycpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXR1cmVzKHNwcml0ZSwgdHlwZSwgdGltZU9mQXBwZWFyaW5nLCBzcGVlZCwgd2lkdGgsIGhlaWdodCkge1xyXG5cclxuICAgIHRoaXMuc3ByaXRlID0gc3ByaXRlO1xyXG4gICAgdGhpcy5jcmVhdHVyZUFycmF5ID0gW107XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuICAgIHRoaXMudGltZU9mQXBwZWFyaW5nID0gdGltZU9mQXBwZWFyaW5nO1xyXG4gICAgdGhpcy50aW1lID0gNTA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0dXJlKHBvc2l0aW9uLCBzcHJpdGUsIHdpZHRoLCBoZWlnaHQpIHtcclxuXHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIFxyXG4gICAgdGhpcy5zcHJpdGUgPSBzcHJpdGU7XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbn1cclxuXHJcbmNyZWF0dXJlcy5wcm90b3R5cGUudXBkYXRlQ3JlYXR1cmVzID0gZnVuY3Rpb24gKGRpZmYpIHtcclxuXHJcbiAgICB0aGlzLnRpbWUgKz0gTWF0aC5yb3VuZChkaWZmICogNjApO1xyXG4gICAgaWYgKHRoaXMudGltZSAlIHRoaXMudGltZU9mQXBwZWFyaW5nID09ICh0aGlzLnRpbWVPZkFwcGVhcmluZyAtIDEpKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jcmVhdHVyZUFycmF5LnB1c2gobmV3IGNyZWF0dXJlKFs4MzAsIGdldFJhbmRvbUludCgwLCA0ODApXSwgdGhpcy5zcHJpdGUsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jcmVhdHVyZUFycmF5LmZvckVhY2goKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdmFsdWUucG9zaXRpb25bMF0gLT0gdGhpcy5zcGVlZDtcclxuICAgICAgICB2YWx1ZS5zcHJpdGUudXBkYXRlKGRpZmYpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jcmVhdHVyZUFycmF5LmZvckVhY2goKHZhbHVlLCBpbmRleCwgYXJyYXkpID0+IHtcclxuICAgICAgICBpZiAodmFsdWUucG9zaXRpb25bMF0gPCAtMTAwKSB7XHJcbiAgICAgICAgICAgIGFycmF5LnNoaWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5jcmVhdHVyZXMucHJvdG90eXBlLnJlbmRlckNyZWF0dXJlcyA9IGZ1bmN0aW9uIChudW1PZkZyYW1lcykge1xyXG5cclxuICAgIHRoaXMuY3JlYXR1cmVBcnJheS5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB7XHJcblxyXG4gICAgICAgIHZhbHVlLnNwcml0ZS5jb250ZXh0LnNhdmUoKTtcclxuICAgICAgICB2YWx1ZS5zcHJpdGUuY29udGV4dC50cmFuc2xhdGUodmFsdWUucG9zaXRpb25bMF0sIHZhbHVlLnBvc2l0aW9uWzFdKTtcclxuICAgICAgICB2YWx1ZS5zcHJpdGUucmVuZGVyKG51bU9mRnJhbWVzKTtcclxuICAgICAgICB2YWx1ZS5zcHJpdGUuY29udGV4dC5yZXN0b3JlKCk7XHJcblxyXG4gICAgfSk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdHVyZXM7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY3JlYXR1cmVzLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGNvbnN0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcbmNvbnN0IFNwcml0ZSA9IHJlcXVpcmUoJy4vc3ByaXRlLmpzJyk7XG5jb25zdCBwbGF5ZXIgPSByZXF1aXJlKCcuL3BsYXllci5qcycpO1xuY29uc3QgYmFja2dyb3VuZCA9IHJlcXVpcmUoJy4vYmFja2dyb3VuZC5qcycpO1xuY29uc3Qgd2FsbHMgPSByZXF1aXJlKCcuL3dhbGxzLmpzJyk7XG5jb25zdCBjaGVjayA9IHJlcXVpcmUoJy4vY2hlY2suanMnKTtcbi8vIGNvbnN0IGJvb3RzdHJhcCA9IHJlcXVpcmUoJ2Jvb3RzdHJhcCcpO1xuXG5sZXQgcmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgfTtcbn0pKCk7XG5cbmxldCBsYXN0VGltZSA9IERhdGUubm93KCk7XG5sZXQgZHJhZ29uLCB3YWxsQXJyYXksIGNvaW5BcnJheSwgY2hpa2VuQXJyYXksIGJhY2tncm91bmRJbWFnZSwgZmlyZUJhbGxBcnJheSwgY2hlY2tPYmo7XG5sZXQgaXNHYW1lT3ZlciA9IGZhbHNlO1xubGV0IGdhbWVTdGFydGVkID0gZmFsc2U7XG5sZXQgaXNQcm9ncmVzc0JhckVuZCA9IGZhbHNlO1xubGV0IGdhbWVUaW1lID0gMDtcbmxldCBnYW1lVGltZVJlYyA9IDE7XG5cbmxldCBwaWNrQ2hpY2tlbjtcbmxldCBwaWNrQ29pbjtcbmxldCBjcmFzaDtcbmxldCBtdXNpYyA9IG5ldyBBdWRpbygnLi9tc2MvZ3JpZWdfaW5fdGhlX2hhbF8gb2ZfdGhlX21vdW50YWluX2tpbmcubXAzJyk7XG5cbmxldCBjdXJyZW50UHJvZ3JlcztcbmxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xubGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbmNhbnZhcy53aWR0aCA9IDkwODtcbmNhbnZhcy5oZWlnaHQgPSA1MTI7XG5cbiQoJy5wbGF5JykuYWZ0ZXIoY2FudmFzKTtcbi8vIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxubGV0IHByb2dyZXNzU3RyaXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpcmVkbmVzc1N0cmlwZScpO1xuXG5mdW5jdGlvbiB1cGRhdGVQcm9ncmVzc0JhcigpIHtcblxuICAgIGxldCBjdXJyZW50VGltZSA9IE1hdGguZmxvb3IoZ2FtZVRpbWUpO1xuXG4gICAgaWYgKGN1cnJlbnRUaW1lID4gZ2FtZVRpbWVSZWMpIHtcbiAgICAgICAgZ2FtZVRpbWVSZWMgPSBjdXJyZW50VGltZTtcbiAgICAgICAgY3VycmVudFByb2dyZXMgPSBwYXJzZUludChwcm9ncmVzc1N0cmlwZS5zdHlsZS53aWR0aCk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRQcm9ncmVzID09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRQcm9ncmVzIC09IDE7XG4gICAgICAgIG1vcmVGaXJlQmFsbHMoKTtcbiAgICAgICAgcHJvZ3Jlc3NTdHJpcGUuc3R5bGUud2lkdGggPSBjdXJyZW50UHJvZ3JlcyArICclJztcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVTY29yZXMoKSB7XG5cbiAgICBwaWNrQ29pbi5wbGF5KCk7XG4gICAgbGV0IHNjb3JlcyA9IGRvY3VtZW50LmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2NvcmVzJylbMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0cm9uZycpO1xuICAgIGxldCBzY29yZSA9IHBhcnNlSW50KHNjb3Jlc1swXS5pbm5lckhUTUwpO1xuICAgIHNjb3Jlc1swXS5pbm5lckhUTUwgPSBzY29yZSArIDE7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckFsbCgpIHtcblxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgOTA4LCA1MTIpO1xuICAgIGJhY2tncm91bmRJbWFnZS5yZW5kZXJCYWNrZ3JvdW5kKCk7XG4gICAgZHJhZ29uLnJlbmRlclBsYXllcigpO1xuICAgIHdhbGxBcnJheS5yZW5kZXJXYWxscygpO1xuICAgIGNoaWtlbkFycmF5LnJlbmRlckNyZWF0dXJlcygzKTtcbiAgICBjb2luQXJyYXkucmVuZGVyQ3JlYXR1cmVzKDkpO1xuICAgIGZpcmVCYWxsQXJyYXkucmVuZGVyQ3JlYXR1cmVzKDYpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBbGwoZGlmZikge1xuXG4gICAgZHJhZ29uLnVwZGF0ZVBsYXllcihkaWZmKTtcbiAgICB3YWxsQXJyYXkudXBkYXRlV2FsbHMoZGlmZik7XG4gICAgY2hpa2VuQXJyYXkudXBkYXRlQ3JlYXR1cmVzKGRpZmYpO1xuICAgIGNvaW5BcnJheS51cGRhdGVDcmVhdHVyZXMoZGlmZik7XG4gICAgZmlyZUJhbGxBcnJheS51cGRhdGVDcmVhdHVyZXMoZGlmZik7XG5cbiAgICBpc1Byb2dyZXNzQmFyRW5kID0gdXBkYXRlUHJvZ3Jlc3NCYXIoKTtcblxuICAgIGlzR2FtZU92ZXIgPSBjaGVja09iai5jaGVja0ludGVyc2VjdGlvbnMoKTtcblxuICAgIGxldCBjb2xsZWN0ZWQgPSBjaGVja09iai5pZkNyZWF0dXJlVG9Db2xsZWN0KCk7XG4gICAgaWYgKGNvbGxlY3RlZCA9PSAnY29pbicpIHtcblxuICAgICAgICB1cGRhdGVTY29yZXMoKTtcbiAgICB9IGVsc2UgaWYgKGNvbGxlY3RlZCA9PSAnY2hpY2tlbicpIHtcblxuICAgICAgICBwaWNrQ2hpY2tlbi5wbGF5KCk7XG4gICAgICAgIGN1cnJlbnRQcm9ncmVzID0gcGFyc2VJbnQocHJvZ3Jlc3NTdHJpcGUuc3R5bGUud2lkdGgpO1xuICAgICAgICBjdXJyZW50UHJvZ3JlcyArPSAxMDtcbiAgICAgICAgbW9yZUZpcmVCYWxscygpO1xuICAgICAgICBwcm9ncmVzc1N0cmlwZS5zdHlsZS53aWR0aCA9IGN1cnJlbnRQcm9ncmVzICsgJyUnO1xuICAgIH0gZWxzZSBpZiAoY29sbGVjdGVkID09ICdmaXJlJykge1xuICAgICAgICBnYW1lT3ZlcigpO1xuICAgIH1cbn1cblxuLy9tYWluIGxvb3BcbmZ1bmN0aW9uIG1haW4oKSB7XG5cbiAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBsZXQgZGlmZiA9IChub3cgLSBsYXN0VGltZSkgLyAxMDAwO1xuICAgIHVwZGF0ZUFsbChkaWZmKTtcbiAgICByZW5kZXJBbGwoKTtcbiAgICBsYXN0VGltZSA9IG5vdztcbiAgICBnYW1lVGltZSArPSBkaWZmO1xuICAgIGlmICghaXNHYW1lT3ZlciAmJiAhaXNQcm9ncmVzc0JhckVuZCkge1xuICAgICAgICByZXF1ZXN0QW5pbUZyYW1lKG1haW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG11c2ljLnBhdXNlKCk7XG4gICAgICAgIGdhbWVPdmVyKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsb2FkQ29udGVudCgpIHtcblxuICAgIHBpY2tDaGlja2VuID0gbmV3IEF1ZGlvKCcuL21zYy9zZnhfcGljay5mbGFjJyk7XG4gICAgcGlja0NvaW4gPSBuZXcgQXVkaW8oJy4vbXNjL2NvaW5zXzUud2F2Jyk7XG4gICAgY3Jhc2ggPSBuZXcgQXVkaW8oJy4vbXNjL3F1Ym9kdXAtY3Jhc2gub2dnJyk7XG5cbiAgICBjb25zdCBkcmFnb25JbWcgPSBuZXcgSW1hZ2UoJ2ltZy9kcmFnb24tZmx5LnBuZycpO1xuICAgIGRyYWdvbkltZy5zcmMgPSAnaW1nL2RyYWdvbi1mbHkucG5nJztcblxuICAgIGNvbnN0IGNvaW5JbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBjb2luSW1nLnNyYyA9ICdpbWcvY29pbi5wbmcnO1xuXG4gICAgY29uc3QgY2hpa2VuSW1nID0gbmV3IEltYWdlKCk7XG4gICAgY2hpa2VuSW1nLnNyYyA9ICdpbWcvY2hpY2tlbi5wbmcnO1xuXG4gICAgY29uc3QgZmlyZUJhbGxJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBmaXJlQmFsbEltZy5zcmMgPSAnaW1nL2ZpcmVCYWxsLnBuZyc7XG5cbiAgICBiYWNrZ3JvdW5kSW1hZ2UgPSBuZXcgYmFja2dyb3VuZChjdHgpO1xuXG4gICAgZHJhZ29uID0gbmV3IHBsYXllcihuZXcgU3ByaXRlKGN0eCwgOTQsIDY3LCBkcmFnb25JbWcsIDE2LCBbMCwgMSwgMiwgM10pLCBbMCwgMF0sIDgwLCA0MCk7XG5cbiAgICB3YWxsQXJyYXkgPSBuZXcgd2FsbHMoY3R4KTtcblxuICAgIGNoaWtlbkFycmF5ID0gbmV3IGNyZWF0dXJlcyhuZXcgU3ByaXRlKGN0eCwgNDUuMzMsIDU1LCBjaGlrZW5JbWcsIDYsIFswLCAxLCAyXSksICdjaGlja2VuJywgNzAwLCAyLCA0NiwgNTUpXG5cbiAgICBjb2luQXJyYXkgPSBuZXcgY3JlYXR1cmVzKG5ldyBTcHJpdGUoY3R4LCA1MCwgNTAsIGNvaW5JbWcsIDYsIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XSksICdjb2luJywgMTAwLCAyLCA1MCwgNTApO1xuXG4gICAgZmlyZUJhbGxBcnJheSA9IG5ldyBjcmVhdHVyZXMobmV3IFNwcml0ZShjdHgsIDE0MywgNTUsIGZpcmVCYWxsSW1nLCA2LCBbMCwgMSwgMiwgMywgNCwgNV0pLCAnZmlyZScsIDEwMCwgNSwgMjUsIDI1KTtcblxuICAgIGNoZWNrT2JqID0gbmV3IGNoZWNrKGNhbnZhcywgZHJhZ29uLCB3YWxsQXJyYXksIGNvaW5BcnJheSwgY2hpa2VuQXJyYXksIGZpcmVCYWxsQXJyYXkpO1xuXG4gICAgLy9ldmVudCB3aGVuIGZseWluZyB1cFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBkcmFnb24uZmx5KHRydWUpO1xuICAgIH0pO1xuXG4gICAgLy9ldmVudCB3aGVuIHN0b3AgZmx5aW5nIHVwXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBkcmFnb24uZmx5KGZhbHNlKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZ2FtZU92ZXIoKSB7XG4gICAgY3Jhc2gucGxheSgpO1xuICAgIGdhbWVTdGFydGVkID0gZmFsc2U7XG4gICAgaXNHYW1lT3ZlciA9IHRydWU7XG4gICAgJCgnLnBsYXknKS5zaG93KCk7XG4gICAgJCgnI2dhbWVPdmVyJykuc2hvdygpO1xufVxuXG5mdW5jdGlvbiBtb3JlRmlyZUJhbGxzKCkge1xuXG4gICAgaWYgKCFjdXJyZW50UHJvZ3JlcyA8IDIwKSB7XG4gICAgICAgIGZpcmVCYWxsQXJyYXkudGltZU9mQXBwZWFyaW5nID0gY3VycmVudFByb2dyZXM7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gICAgbGV0IHNjb3JlcyA9IGRvY3VtZW50LmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2NvcmVzJylbMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0cm9uZycpO1xuICAgIHNjb3Jlc1swXS5pbm5lckhUTUwgPSAnMCc7XG4gICAgZ2FtZVN0YXJ0ZWQgPSB0cnVlO1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgOTA4LCA1MTIpO1xuICAgIGxvYWRDb250ZW50KCk7XG4gICAgaXNHYW1lT3ZlciA9IGZhbHNlO1xuICAgIG11c2ljID0gbmV3IEF1ZGlvKCcuL21zYy9ncmllZ19pbl90aGVfaGFsXyBvZl90aGVfbW91bnRhaW5fa2luZy5tcDMnKTtcbiAgICBwcm9ncmVzc1N0cmlwZS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBtdXNpYy5wbGF5KCk7XG4gICAgbWFpbigpO1xufVxuXG5tdXNpYy5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuY3VycmVudFRpbWUgPSAwO1xuICAgIHRoaXMucGxheSgpO1xufSwgZmFsc2UpO1xuXG4kKCcucGxheScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICQoJy5wbGF5JykuaGlkZSgpO1xuICAgICQoJyNnYW1lT3ZlcicpLmhpZGUoKTtcbiAgICBzdGFydEdhbWUoKTtcbn0pO1xuXG4kKGRvY3VtZW50KS5rZXlwcmVzcyhmdW5jdGlvbihlKSB7XG4gICAgaWYgKGUud2hpY2ggPT0gMTMpIHtcbiAgICAgICAgaWYgKCFnYW1lU3RhcnRlZCkge1xuICAgICAgICAgICAgJCgnLnBsYXknKS5jbGljaygpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=