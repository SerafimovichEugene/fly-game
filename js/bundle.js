/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/***/ (function(module, exports, __webpack_require__) {

getRandomInt = __webpack_require__(1);

function creatures(sprite, type, tiks, speed) {

    this.sprite = sprite;
    this.creatureArray = [];
    this.type = type;
    this.speed = speed;
    this.tiks = tiks;
    this.time = 149;
}

function creature(position, sprite) {

    this.sprite = sprite;
    this.position = position;
}

creatures.prototype.updateCreatures = function (diff) {

    this.time += Math.round(diff * 60);

    if (this.time % this.tiks == (this.tiks - 1)) {
        this.creatureArray.push(new creature([810, getRandomInt(0, 450)], this.sprite));
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
/* 1 */
/***/ (function(module, exports) {

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = getRandomInt;


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

creatures = __webpack_require__(0);

function check(canvas, player, walls, coins, chikens, fireBalls) {
    this.field = canvas;
    this.player = player;
    this.walls = walls;
    this.coins = coins;
    this.chikens = chikens;
    this.fireBalls = fireBalls;
    this.pickSound = new Audio('./msc/sfx_pick.flac');
}

check.prototype.checkIntersections = function () {

    return this.ifOutOfField() || this.ifWall();
}

check.prototype.ifOutOfField = function () {

    if (this.player.position[1] < -10) {
        this.player.position[1] = -10;
    } else if (this.player.position[1] > 512) {
        // this.player.position[1] = 350;
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
                if (this.player.position[0] + this.player.sprite.width < this[prop].creatureArray[i].position[0] ||
                    this.player.position[1] + this.player.sprite.height < this[prop].creatureArray[i].position[1] ||
                    this[prop].creatureArray[i].position[0] + this[prop].creatureArray[i].sprite.width < this.player.position[0] ||
                    this[prop].creatureArray[i].position[1] + this[prop].creatureArray[i].sprite.width < this.player.position[1]) {
                    res = false;
                } else {
                    this.pickSound.play();
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
/* 4 */
/***/ (function(module, exports) {

function player(sprite, position) {

    this.sprite = sprite;
    this.position = position;
    this.gravity = 10;
    this.speedOfFalling = 0;
    this.step = 0;

    this.onFly = false;
    this.num = 1;

}

player.prototype.updatePlayer = function (diff) {

    this.speedOfFalling = Math.pow(2 * this.gravity * this.step, 1 / 2);

    if (this.onFly) {
        this.step += 100;
        this.position[1] -= this.speedOfFalling * diff;
        // console.log(this.position[1]);
    } else {
        this.step += 60;
        this.position[1] += this.speedOfFalling * diff;
        // console.log(this.position[1]);
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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

getRandomInt = __webpack_require__(1);

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

        this.wallArray.push(new wall([910, randomSpacePosition], this.widthOfWall, 156));
        this.wallArray.push(new wall([910, randomSpacePosition + getRandomInt(100, 170) + 156], this.widthOfWall, 156));
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Sprite = __webpack_require__(5);
const player = __webpack_require__(4);
const background = __webpack_require__(2);
const walls = __webpack_require__(6);
const check = __webpack_require__(3);
const creatures = __webpack_require__(0);

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

    dragon = new player(new Sprite(ctx, 94, 67, dragonImg, 16, [0, 1, 2, 3]), [0, 0]);

    wallArray = new walls(ctx);

    chikenArray = new creatures(new Sprite(ctx, 45.33, 55, chikenImg, 6, [0, 1, 2]), 'chicken', 700, 2)

    coinArray = new creatures(new Sprite(ctx, 50, 50, coinImg, 6, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), 'coin', 200, 2);

    fireBallArray = new creatures(new Sprite(ctx, 143, 55, fireBallImg, 6, [0, 1, 2, 3, 4, 5]), 'fire', 100, 5);

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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzhmMWFiMmZiZWI4YjBkYjAzOTEiLCJ3ZWJwYWNrOi8vLy4vanMvY3JlYXR1cmVzLmpzIiwid2VicGFjazovLy8uL2pzL2dldFJhbmRvbUludC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9iYWNrZ3JvdW5kLmpzIiwid2VicGFjazovLy8uL2pzL2NoZWNrLmpzIiwid2VicGFjazovLy8uL2pzL3BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9zcHJpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vanMvd2FsbHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNoRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7OztBQ2xEQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDbkJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxtQkFBbUIsaUNBQWlDO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLDJCQUEyQixxQ0FBcUM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNyRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7Ozs7Ozs7QUNuREE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNuQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLDJCQUEyQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOzs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0Esb0Q7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7Ozs7QUFJSiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjOGYxYWIyZmJlYjhiMGRiMDM5MSIsImdldFJhbmRvbUludCA9IHJlcXVpcmUoJy4vZ2V0UmFuZG9tSW50LmpzJyk7XG5cbmZ1bmN0aW9uIGNyZWF0dXJlcyhzcHJpdGUsIHR5cGUsIHRpa3MsIHNwZWVkKSB7XG5cbiAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZTtcbiAgICB0aGlzLmNyZWF0dXJlQXJyYXkgPSBbXTtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLnRpa3MgPSB0aWtzO1xuICAgIHRoaXMudGltZSA9IDE0OTtcbn1cblxuZnVuY3Rpb24gY3JlYXR1cmUocG9zaXRpb24sIHNwcml0ZSkge1xuXG4gICAgdGhpcy5zcHJpdGUgPSBzcHJpdGU7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xufVxuXG5jcmVhdHVyZXMucHJvdG90eXBlLnVwZGF0ZUNyZWF0dXJlcyA9IGZ1bmN0aW9uIChkaWZmKSB7XG5cbiAgICB0aGlzLnRpbWUgKz0gTWF0aC5yb3VuZChkaWZmICogNjApO1xuXG4gICAgaWYgKHRoaXMudGltZSAlIHRoaXMudGlrcyA9PSAodGhpcy50aWtzIC0gMSkpIHtcbiAgICAgICAgdGhpcy5jcmVhdHVyZUFycmF5LnB1c2gobmV3IGNyZWF0dXJlKFs4MTAsIGdldFJhbmRvbUludCgwLCA0NTApXSwgdGhpcy5zcHJpdGUpKTtcbiAgICB9XG5cbiAgICB0aGlzLmNyZWF0dXJlQXJyYXkuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgdmFsdWUucG9zaXRpb25bMF0gLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgdmFsdWUuc3ByaXRlLnVwZGF0ZShkaWZmKTtcbiAgICB9KTtcblxuICAgIHRoaXMuY3JlYXR1cmVBcnJheS5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZS5wb3NpdGlvblswXSA8IC0xMDApIHtcbiAgICAgICAgICAgIGFycmF5LnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufVxuXG5jcmVhdHVyZXMucHJvdG90eXBlLnJlbmRlckNyZWF0dXJlcyA9IGZ1bmN0aW9uIChudW1PZkZyYW1lcykge1xuXG4gICAgdGhpcy5jcmVhdHVyZUFycmF5LmZvckVhY2goKHZhbHVlLCBpbmRleCwgYXJyYXkpID0+IHtcblxuICAgICAgICB2YWx1ZS5zcHJpdGUuY29udGV4dC5zYXZlKCk7XG4gICAgICAgIHZhbHVlLnNwcml0ZS5jb250ZXh0LnRyYW5zbGF0ZSh2YWx1ZS5wb3NpdGlvblswXSwgdmFsdWUucG9zaXRpb25bMV0pO1xuICAgICAgICB2YWx1ZS5zcHJpdGUucmVuZGVyKG51bU9mRnJhbWVzKTtcbiAgICAgICAgdmFsdWUuc3ByaXRlLmNvbnRleHQucmVzdG9yZSgpO1xuXG4gICAgfSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0dXJlcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY3JlYXR1cmVzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIGdldFJhbmRvbUludChtaW4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UmFuZG9tSW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9nZXRSYW5kb21JbnQuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gYmFja2dyb3VuZChjb250ZXh0KSB7XHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgdGhpcy5pbWFnZS5zcmMgPSAnaW1nL2JhY2tncm91bmQyLnBuZyc7XHJcbiAgICB0aGlzLndpZHRoID0gOTA4O1xyXG4gICAgdGhpcy5oZWlndGggPSA1MTI7XHJcbiAgICB0aGlzLnN0ZXAgPSAwO1xyXG59O1xyXG5cclxuYmFja2dyb3VuZC5wcm90b3R5cGUucmVuZGVyQmFja2dyb3VuZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICArK3RoaXMuc3RlcDtcclxuICAgIGlmICh0aGlzLnN0ZXAgPT0gdGhpcy53aWR0aCkge1xyXG4gICAgICAgIHRoaXMuc3RlcCA9IDA7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDAsIDAsIHRoaXMuc3RlcCwgdGhpcy5oZWlndGgsIHRoaXMud2lkdGggLSB0aGlzLnN0ZXAsIDAsIHRoaXMuc3RlcCwgdGhpcy5oZWlndGgpO1xyXG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnN0ZXAsIDAsIHRoaXMud2lkdGggLSB0aGlzLnN0ZXAsIHRoaXMuaGVpZ3RoLCAwLCAwLCB0aGlzLndpZHRoIC0gdGhpcy5zdGVwLCB0aGlzLmhlaWd0aCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJhY2tncm91bmQ7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvYmFja2dyb3VuZC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjcmVhdHVyZXMgPSByZXF1aXJlKCcuL2NyZWF0dXJlcy5qcycpO1xuXG5mdW5jdGlvbiBjaGVjayhjYW52YXMsIHBsYXllciwgd2FsbHMsIGNvaW5zLCBjaGlrZW5zLCBmaXJlQmFsbHMpIHtcbiAgICB0aGlzLmZpZWxkID0gY2FudmFzO1xuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICAgIHRoaXMud2FsbHMgPSB3YWxscztcbiAgICB0aGlzLmNvaW5zID0gY29pbnM7XG4gICAgdGhpcy5jaGlrZW5zID0gY2hpa2VucztcbiAgICB0aGlzLmZpcmVCYWxscyA9IGZpcmVCYWxscztcbiAgICB0aGlzLnBpY2tTb3VuZCA9IG5ldyBBdWRpbygnLi9tc2Mvc2Z4X3BpY2suZmxhYycpO1xufVxuXG5jaGVjay5wcm90b3R5cGUuY2hlY2tJbnRlcnNlY3Rpb25zID0gZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHRoaXMuaWZPdXRPZkZpZWxkKCkgfHwgdGhpcy5pZldhbGwoKTtcbn1cblxuY2hlY2sucHJvdG90eXBlLmlmT3V0T2ZGaWVsZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGlmICh0aGlzLnBsYXllci5wb3NpdGlvblsxXSA8IC0xMCkge1xuICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvblsxXSA9IC0xMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMucGxheWVyLnBvc2l0aW9uWzFdID4gNTEyKSB7XG4gICAgICAgIC8vIHRoaXMucGxheWVyLnBvc2l0aW9uWzFdID0gMzUwO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5jaGVjay5wcm90b3R5cGUuaWZXYWxsID0gZnVuY3Rpb24gKGFyZykge1xuXG4gICAgbGV0IHJlcyA9IGZhbHNlO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndhbGxzLndhbGxBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIucG9zaXRpb25bMF0gKyB0aGlzLnBsYXllci5zcHJpdGUud2lkdGggLSAxMCA8IHRoaXMud2FsbHMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzBdIC0gMTAgfHxcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc2l0aW9uWzFdICsgdGhpcy5wbGF5ZXIuc3ByaXRlLmhlaWdodCAtIDIwIDwgdGhpcy53YWxscy53YWxsQXJyYXlbaV0ucG9zaXRpb25bMV0gLSAxMCB8fFxuICAgICAgICAgICAgdGhpcy53YWxscy53YWxsQXJyYXlbaV0ucG9zaXRpb25bMF0gKyB0aGlzLndhbGxzLndhbGxBcnJheVtpXS53aWR0aCAtIDEwIDwgdGhpcy5wbGF5ZXIucG9zaXRpb25bMF0gKyAxMCB8fFxuICAgICAgICAgICAgdGhpcy53YWxscy53YWxsQXJyYXlbaV0ucG9zaXRpb25bMV0gKyB0aGlzLndhbGxzLndhbGxBcnJheVtpXS5oZWlndGggLSAxMCA8IHRoaXMucGxheWVyLnBvc2l0aW9uWzFdICsgMjApIHtcbiAgICAgICAgICAgIHJlcyA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuY2hlY2sucHJvdG90eXBlLmlmQ3JlYXR1cmVUb0NvbGxlY3QgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBsZXQgcmVzID0gZmFsc2U7XG4gICAgZm9yIChwcm9wIGluIHRoaXMpIHtcblxuICAgICAgICBpZiAodGhpc1twcm9wXSBpbnN0YW5jZW9mIGNyZWF0dXJlcykge1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXNbcHJvcF0uY3JlYXR1cmVBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci5wb3NpdGlvblswXSArIHRoaXMucGxheWVyLnNwcml0ZS53aWR0aCA8IHRoaXNbcHJvcF0uY3JlYXR1cmVBcnJheVtpXS5wb3NpdGlvblswXSB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvblsxXSArIHRoaXMucGxheWVyLnNwcml0ZS5oZWlnaHQgPCB0aGlzW3Byb3BdLmNyZWF0dXJlQXJyYXlbaV0ucG9zaXRpb25bMV0gfHxcbiAgICAgICAgICAgICAgICAgICAgdGhpc1twcm9wXS5jcmVhdHVyZUFycmF5W2ldLnBvc2l0aW9uWzBdICsgdGhpc1twcm9wXS5jcmVhdHVyZUFycmF5W2ldLnNwcml0ZS53aWR0aCA8IHRoaXMucGxheWVyLnBvc2l0aW9uWzBdIHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbcHJvcF0uY3JlYXR1cmVBcnJheVtpXS5wb3NpdGlvblsxXSArIHRoaXNbcHJvcF0uY3JlYXR1cmVBcnJheVtpXS5zcHJpdGUud2lkdGggPCB0aGlzLnBsYXllci5wb3NpdGlvblsxXSkge1xuICAgICAgICAgICAgICAgICAgICByZXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tTb3VuZC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbcHJvcF0uY3JlYXR1cmVBcnJheS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW3Byb3BdLnR5cGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2s7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NoZWNrLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIHBsYXllcihzcHJpdGUsIHBvc2l0aW9uKSB7XG5cbiAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZTtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5ncmF2aXR5ID0gMTA7XG4gICAgdGhpcy5zcGVlZE9mRmFsbGluZyA9IDA7XG4gICAgdGhpcy5zdGVwID0gMDtcblxuICAgIHRoaXMub25GbHkgPSBmYWxzZTtcbiAgICB0aGlzLm51bSA9IDE7XG5cbn1cblxucGxheWVyLnByb3RvdHlwZS51cGRhdGVQbGF5ZXIgPSBmdW5jdGlvbiAoZGlmZikge1xuXG4gICAgdGhpcy5zcGVlZE9mRmFsbGluZyA9IE1hdGgucG93KDIgKiB0aGlzLmdyYXZpdHkgKiB0aGlzLnN0ZXAsIDEgLyAyKTtcblxuICAgIGlmICh0aGlzLm9uRmx5KSB7XG4gICAgICAgIHRoaXMuc3RlcCArPSAxMDA7XG4gICAgICAgIHRoaXMucG9zaXRpb25bMV0gLT0gdGhpcy5zcGVlZE9mRmFsbGluZyAqIGRpZmY7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucG9zaXRpb25bMV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RlcCArPSA2MDtcbiAgICAgICAgdGhpcy5wb3NpdGlvblsxXSArPSB0aGlzLnNwZWVkT2ZGYWxsaW5nICogZGlmZjtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wb3NpdGlvblsxXSk7XG4gICAgfVxuXG4gICAgdGhpcy5zcHJpdGUudXBkYXRlKGRpZmYpO1xufVxuXG5wbGF5ZXIucHJvdG90eXBlLnJlbmRlclBsYXllciA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuc3ByaXRlLmNvbnRleHQuc2F2ZSgpO1xuICAgIHRoaXMuc3ByaXRlLmNvbnRleHQudHJhbnNsYXRlKDAsIHRoaXMucG9zaXRpb25bMV0pO1xuICAgIHRoaXMuc3ByaXRlLnJlbmRlcih0aGlzLm51bSk7XG4gICAgdGhpcy5zcHJpdGUuY29udGV4dC5yZXN0b3JlKCk7XG59XG5cbnBsYXllci5wcm90b3R5cGUuZmx5ID0gZnVuY3Rpb24gKGFyZykge1xuXG4gICAgaWYgKCF0aGlzLm9uRmx5KSB7XG4gICAgICAgIHRoaXMuc3RlcCA9IDA7XG4gICAgICAgIHRoaXMubnVtID0gNDtcbiAgICB9IGVsc2UgaWYgKCFhcmcpIHtcbiAgICAgICAgdGhpcy5zdGVwID0gMDtcbiAgICAgICAgdGhpcy5udW0gPSAxO1xuICAgIH1cbiAgICB0aGlzLm9uRmx5ID0gYXJnO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gcGxheWVyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9wbGF5ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gU3ByaXRlKGNvbnRleHQsIHdpZHRoLCBoZWlnaHQsIGltYWdlLCBzcGVlZCwgZnJhbWVzKSB7XG5cbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmltYWdlID0gaW1hZ2U7XG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIHRoaXMuZnJhbWVzID0gZnJhbWVzO1xuICAgIHRoaXMuZHVyYXRpb24gPSAwO1xuXG59O1xuXG5TcHJpdGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChudW0pIHtcblxuICAgIGxldCByb3VuZGVkRHVyYXRpb24gPSBNYXRoLnJvdW5kKHRoaXMuZHVyYXRpb24pO1xuICAgIGxldCBmcmFtZSA9IHRoaXMuZnJhbWVzW3JvdW5kZWREdXJhdGlvbiAlIG51bV07XG4gICAgbGV0IHggPSBmcmFtZSAqIHRoaXMud2lkdGg7XG4gICAgbGV0IHkgPSAwO1xuXG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShcbiAgICAgICAgdGhpcy5pbWFnZSxcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgdGhpcy53aWR0aCxcbiAgICAgICAgdGhpcy5oZWlnaHQsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIHRoaXMud2lkdGgsXG4gICAgICAgIHRoaXMuaGVpZ2h0KTtcbn07XG5cblNwcml0ZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRpZmYpIHtcbiAgICB0aGlzLmR1cmF0aW9uICs9IHRoaXMuc3BlZWQgKiBkaWZmO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTcHJpdGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL3Nwcml0ZS5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJnZXRSYW5kb21JbnQgPSByZXF1aXJlKCcuL2dldFJhbmRvbUludC5qcycpO1xuXG5mdW5jdGlvbiB3YWxscyhjb250ZXh0KSB7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLndhbGxBcnJheSA9IFtdO1xuICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICB0aGlzLmltYWdlLnNyYyA9ICdpbWcvd2FsbC5wbmcnO1xuICAgIHRoaXMuc3BhY2VIZWlndGggPSAxMDA7XG4gICAgdGhpcy53aWR0aE9mV2FsbCA9IDUwO1xuICAgIHRoaXMudGltZSA9IDc1O1xufVxuXG5mdW5jdGlvbiB3YWxsKHBvcywgd2lkdGgsIGhlaWd0aCkge1xuICAgIHRoaXMucG9zaXRpb24gPSBwb3M7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ3RoID0gaGVpZ3RoO1xufVxuXG53YWxscy5wcm90b3R5cGUucmVuZGVyV2FsbHMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMud2FsbEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICB0aGlzLmltYWdlLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS53aWR0aCxcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLmhlaWd0aCxcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzBdLFxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0ucG9zaXRpb25bMV0sXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS53aWR0aCxcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLmhlaWd0aCk7XG4gICAgfVxufVxuXG53YWxscy5wcm90b3R5cGUudXBkYXRlV2FsbHMgPSBmdW5jdGlvbiAoZGlmZikge1xuXG4gICAgdGhpcy50aW1lICs9IE1hdGgucm91bmQoZGlmZiAqIDYwKTtcblxuICAgIGlmICh0aGlzLnRpbWUgJSAxNTAgPT0gMTQ5KSB7XG5cbiAgICAgICAgbGV0IHJhbmRvbVNwYWNlUG9zaXRpb24gPSBnZXRSYW5kb21JbnQoMCwgMTAwKTtcblxuICAgICAgICB0aGlzLndhbGxBcnJheS5wdXNoKG5ldyB3YWxsKFs5MTAsIHJhbmRvbVNwYWNlUG9zaXRpb25dLCB0aGlzLndpZHRoT2ZXYWxsLCAxNTYpKTtcbiAgICAgICAgdGhpcy53YWxsQXJyYXkucHVzaChuZXcgd2FsbChbOTEwLCByYW5kb21TcGFjZVBvc2l0aW9uICsgZ2V0UmFuZG9tSW50KDEwMCwgMTcwKSArIDE1Nl0sIHRoaXMud2lkdGhPZldhbGwsIDE1NikpO1xuICAgIH1cblxuICAgIHRoaXMud2FsbEFycmF5LmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgIHZhbHVlLnBvc2l0aW9uWzBdIC09IDI7XG4gICAgfSk7XG5cbiAgICB0aGlzLndhbGxBcnJheS5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZS5wb3NpdGlvblswXSA8IC0xMDApIHtcbiAgICAgICAgICAgIGFycmF5LnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YWxscztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvd2FsbHMuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgU3ByaXRlID0gcmVxdWlyZSgnLi9zcHJpdGUuanMnKTtcbmNvbnN0IHBsYXllciA9IHJlcXVpcmUoJy4vcGxheWVyLmpzJyk7XG5jb25zdCBiYWNrZ3JvdW5kID0gcmVxdWlyZSgnLi9iYWNrZ3JvdW5kLmpzJyk7XG5jb25zdCB3YWxscyA9IHJlcXVpcmUoJy4vd2FsbHMuanMnKTtcbmNvbnN0IGNoZWNrID0gcmVxdWlyZSgnLi9jaGVjay5qcycpO1xuY29uc3QgY3JlYXR1cmVzID0gcmVxdWlyZSgnLi9jcmVhdHVyZXMuanMnKTtcblxubGV0IHJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgfTtcbn0pKCk7XG5cbmxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xubGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5jYW52YXMud2lkdGggPSA5MDg7XG5jYW52YXMuaGVpZ2h0ID0gNTEyO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG5sZXQgcHJvZ3Jlc3NPZlRpcmVkbmVzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5sZXQgcHJvZ3Jlc3NTdHJpcGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbnByb2dyZXNzT2ZUaXJlZG5lc3MuY2xhc3NOYW1lID0gJ3RpcmVkbmVzcyc7XG5wcm9ncmVzc1N0cmlwZS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbnByb2dyZXNzT2ZUaXJlZG5lc3MuYXBwZW5kQ2hpbGQocHJvZ3Jlc3NTdHJpcGUpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwcm9ncmVzc09mVGlyZWRuZXNzKTtcblxuZnVuY3Rpb24gdXBkYXRlUHJvZ3Jlc3NCYXIoKSB7XG5cbiAgICBsZXQgY3VycmVudFRpbWUgPSBNYXRoLmZsb29yKGdhbWVUaW1lKTtcblxuICAgIGlmIChjdXJyZW50VGltZSA+IGdhbWVUaW1lUmVjKSB7XG4gICAgICAgIGdhbWVUaW1lUmVjID0gY3VycmVudFRpbWU7XG4gICAgICAgIGxldCBjdXJyZW50UHJvZ3JlcyA9IHBhcnNlSW50KHByb2dyZXNzU3RyaXBlLnN0eWxlLndpZHRoKTtcblxuICAgICAgICBpZiAoY3VycmVudFByb2dyZXMgPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFByb2dyZXMgLT0gMTtcbiAgICAgICAgcHJvZ3Jlc3NTdHJpcGUuc3R5bGUud2lkdGggPSBjdXJyZW50UHJvZ3JlcyArICclJztcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVTY29yZXMoKSB7XG5cbiAgICBsZXQgc2NvcmVzID0gZG9jdW1lbnQuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzY29yZXMnKVswXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3Ryb25nJyk7XG4gICAgbGV0IHNjb3JlID0gcGFyc2VJbnQoc2NvcmVzWzBdLmlubmVySFRNTCk7XG4gICAgc2NvcmVzWzBdLmlubmVySFRNTCA9IHNjb3JlICsgMTtcblxufVxuXG5mdW5jdGlvbiByZW5kZXJBbGwoKSB7XG5cbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDkwOCwgNTEyKTtcbiAgICBiYWNrZ3JvdW5kSW1hZ2UucmVuZGVyQmFja2dyb3VuZCgpO1xuICAgIGRyYWdvbi5yZW5kZXJQbGF5ZXIoKTtcbiAgICB3YWxsQXJyYXkucmVuZGVyV2FsbHMoKTtcbiAgICBjaGlrZW5BcnJheS5yZW5kZXJDcmVhdHVyZXMoMyk7XG4gICAgY29pbkFycmF5LnJlbmRlckNyZWF0dXJlcyg5KTtcbiAgICBmaXJlQmFsbEFycmF5LnJlbmRlckNyZWF0dXJlcyg2KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQWxsKGRpZmYpIHtcblxuICAgIGRyYWdvbi51cGRhdGVQbGF5ZXIoZGlmZik7XG4gICAgd2FsbEFycmF5LnVwZGF0ZVdhbGxzKGRpZmYpO1xuICAgIGNoaWtlbkFycmF5LnVwZGF0ZUNyZWF0dXJlcyhkaWZmKTtcbiAgICBjb2luQXJyYXkudXBkYXRlQ3JlYXR1cmVzKGRpZmYpO1xuICAgIGZpcmVCYWxsQXJyYXkudXBkYXRlQ3JlYXR1cmVzKGRpZmYpO1xuXG4gICAgaXNQcm9ncmVzc0JhckVuZCA9IHVwZGF0ZVByb2dyZXNzQmFyKCk7XG5cbiAgICBpc0dhbWVPdmVyID0gY2hlY2tPYmouY2hlY2tJbnRlcnNlY3Rpb25zKCk7XG5cbiAgICBsZXQgY29sbGVjdGVkID0gY2hlY2tPYmouaWZDcmVhdHVyZVRvQ29sbGVjdCgpO1xuICAgIGlmIChjb2xsZWN0ZWQgPT0gJ2NvaW4nKSB7XG4gICAgICAgIHVwZGF0ZVNjb3JlcygpO1xuICAgIH0gZWxzZSBpZiAoY29sbGVjdGVkID09ICdjaGlja2VuJykge1xuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBwYXJzZUludChwcm9ncmVzc1N0cmlwZS5zdHlsZS53aWR0aCk7XG4gICAgICAgIHByb2dyZXNzICs9IDEwO1xuICAgICAgICBwcm9ncmVzc1N0cmlwZS5zdHlsZS53aWR0aCA9IHByb2dyZXNzICsgJyUnO1xuICAgICAgICBjb25zb2xlLmxvZyhjb2xsZWN0ZWQpO1xuICAgIH1cbiAgICBlbHNlIGlmKGNvbGxlY3RlZCA9PSAnZmlyZScpIHtcbiAgICAgICAgY29uc29sZS5sb2coY29sbGVjdGVkKTtcbiAgICAgICAgZ2FtZU92ZXIoKTtcbiAgICB9XG59XG5cbi8vbWFpbiBsb29wXG5mdW5jdGlvbiBtYWluKCkge1xuXG4gICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgbGV0IGRpZmYgPSAobm93IC0gbGFzdFRpbWUpIC8gMTAwMDtcbiAgICB1cGRhdGVBbGwoZGlmZik7XG4gICAgcmVuZGVyQWxsKCk7XG4gICAgbGFzdFRpbWUgPSBub3c7XG4gICAgZ2FtZVRpbWUgKz0gZGlmZjtcbiAgICBpZiAoIWlzR2FtZU92ZXIgJiYgIWlzUHJvZ3Jlc3NCYXJFbmQpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1GcmFtZShtYWluKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIG11c2ljLnBhdXNlKCk7XG4gICAgICAgIGdhbWVPdmVyKCk7XG4gICAgfVxufVxuXG5sZXQgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xubGV0IGRyYWdvbiwgd2FsbEFycmF5LCBjb2luQXJyYXksIGNoaWtlbkFycmF5LCBiYWNrZ3JvdW5kSW1hZ2UsIGZpcmVCYWxsQXJyYXksIGNoZWNrT2JqO1xubGV0IGlzR2FtZU92ZXIgPSBmYWxzZTtcbmxldCBpc1Byb2dyZXNzQmFyRW5kID0gZmFsc2U7XG5sZXQgZ2FtZVRpbWUgPSAwO1xubGV0IGdhbWVUaW1lUmVjID0gMTtcblxuXG4vLyBsZXQgbXVzaWMgPSBuZXcgQXVkaW8oJy4vbXNjL0ZseWluZ19zb2Z0bHkubXAzJyk7IFxuXG5cbmZ1bmN0aW9uIGxvYWRDb250ZW50KCkge1xuXG4gICAgY29uc3QgZHJhZ29uSW1nID0gbmV3IEltYWdlKCdpbWcvZHJhZ29uLWZseS5wbmcnKTtcbiAgICBkcmFnb25JbWcuc3JjID0gJ2ltZy9kcmFnb24tZmx5LnBuZyc7XG5cbiAgICBjb25zdCBjb2luSW1nID0gbmV3IEltYWdlKCk7XG4gICAgY29pbkltZy5zcmMgPSAnaW1nL2NvaW4ucG5nJztcblxuICAgIGNvbnN0IGNoaWtlbkltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGNoaWtlbkltZy5zcmMgPSAnaW1nL2NoaWNrZW4ucG5nJztcblxuICAgIGNvbnN0IGZpcmVCYWxsSW1nID0gbmV3IEltYWdlKCk7XG4gICAgZmlyZUJhbGxJbWcuc3JjID0gJ2ltZy9maXJlQmFsbC5wbmcnO1xuXG4gICAgYmFja2dyb3VuZEltYWdlID0gbmV3IGJhY2tncm91bmQoY3R4KTtcblxuICAgIGRyYWdvbiA9IG5ldyBwbGF5ZXIobmV3IFNwcml0ZShjdHgsIDk0LCA2NywgZHJhZ29uSW1nLCAxNiwgWzAsIDEsIDIsIDNdKSwgWzAsIDBdKTtcblxuICAgIHdhbGxBcnJheSA9IG5ldyB3YWxscyhjdHgpO1xuXG4gICAgY2hpa2VuQXJyYXkgPSBuZXcgY3JlYXR1cmVzKG5ldyBTcHJpdGUoY3R4LCA0NS4zMywgNTUsIGNoaWtlbkltZywgNiwgWzAsIDEsIDJdKSwgJ2NoaWNrZW4nLCA3MDAsIDIpXG5cbiAgICBjb2luQXJyYXkgPSBuZXcgY3JlYXR1cmVzKG5ldyBTcHJpdGUoY3R4LCA1MCwgNTAsIGNvaW5JbWcsIDYsIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XSksICdjb2luJywgMjAwLCAyKTtcblxuICAgIGZpcmVCYWxsQXJyYXkgPSBuZXcgY3JlYXR1cmVzKG5ldyBTcHJpdGUoY3R4LCAxNDMsIDU1LCBmaXJlQmFsbEltZywgNiwgWzAsIDEsIDIsIDMsIDQsIDVdKSwgJ2ZpcmUnLCAxMDAsIDUpO1xuXG4gICAgY2hlY2tPYmogPSBuZXcgY2hlY2soY2FudmFzLCBkcmFnb24sIHdhbGxBcnJheSwgY29pbkFycmF5LCBjaGlrZW5BcnJheSwgZmlyZUJhbGxBcnJheSk7XG4gICAgLy8gbXVzaWMucGxheSgpO1xuICAgIG1haW4oKTtcbn1cblxuLy9ldmVudCB3aGVuIGZseWluZyB1cFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGRyYWdvbi5mbHkodHJ1ZSk7XG59KTtcblxuLy9ldmVudCB3aGVuIHN0b3AgZmx5aW5nIHVwXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGRyYWdvbi5mbHkoZmFsc2UpO1xufSk7XG5cbmZ1bmN0aW9uIGdhbWVPdmVyKCkge1xuICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lT3ZlcicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufVxuXG4vLyBtdXNpYy5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGZ1bmN0aW9uKCkge1xuLy8gICAgIHRoaXMuY3VycmVudFRpbWUgPSAwO1xuLy8gICAgIHRoaXMucGxheSgpO1xuLy8gfSwgZmFsc2UpO1xuXG5cblxubG9hZENvbnRlbnQoKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==