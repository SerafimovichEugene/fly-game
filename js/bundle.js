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

function creatures(sprite, type, tiks) {

    this.sprite = sprite;
    this.creatureArray = [];
    this.type = type;
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
        this.creatureArray.push(new creature([810, getRandomInt(0, 300)], this.sprite));
    }

    this.creatureArray.forEach((value) => {
        value.position[0] -= 2;
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
    this.image.src = 'img/background1.png';
    this.width = 800;
    this.heigth = 400;
    this.step = 0;
};

background.prototype.renderBackground = function () {

    ++this.step;
    if (this.step == 800) {
        this.step = 0;
    }
    this.context.drawImage(this.image, 0, 0, this.step, 400, this.width - this.step, 0, this.step, 400);
    this.context.drawImage(this.image, this.step, 0, this.width - this.step, 400, 0, 0, this.width - this.step, 400);
};

module.exports = background;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

creatures = __webpack_require__(0);

function check(canvas, player, walls, coins, chikens) {
    this.field = canvas;
    this.player = player;
    this.walls = walls;
    this.coins = coins;
    this.chikens = chikens;

}

check.prototype.checkIntersections = function () {

    return this.ifOutOfField() || this.ifWall();
}

check.prototype.ifOutOfField = function () {

    if (this.player.position[1] < -10) {
        this.player.position[1] = -10;
    } else if (this.player.position[1] > 350) {
        this.player.position[1] = 350;
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
                if (this.player.position[0] + this.player.sprite.width < this[prop].creatureArray[i].position[0] + 10 ||
                    this.player.position[1] + this.player.sprite.height < this[prop].creatureArray[i].position[1] - 10 ||
                    this[prop].creatureArray[i].position[0] + 10 + this[prop].creatureArray[i].sprite.width < this.player.position[0] - 10 ||
                    this[prop].creatureArray[i].position[1] - 10 + this[prop].creatureArray[i].sprite.width < this.player.position[1] - 10) {
                    res = false;
                } else {
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
    this.spaceHeigth = 150;
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

        let randomSpacePosition = getRandomInt(0, 300);

        this.wallArray.push(new wall([810, 0], this.widthOfWall, randomSpacePosition));
        this.wallArray.push(new wall([810, randomSpacePosition + this.spaceHeigth], this.widthOfWall, 400 - randomSpacePosition - this.spaceHeigth));
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

    ctx.clearRect(0, 0, 800, 400);
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2U0NzQ1Yjg1ZTI4MzE0MjY4NmUiLCJ3ZWJwYWNrOi8vLy4vanMvY3JlYXR1cmVUb0NvbGxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vanMvZ2V0UmFuZG9tSW50LmpzIiwid2VicGFjazovLy8uL2pzL2JhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vanMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL2pzL3Nwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy93YWxscy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ2hFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7OztBQ2pEQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDbkJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxtQkFBbUIsaUNBQWlDO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLDJCQUEyQixxQ0FBcUM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDbkVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOzs7Ozs7O0FDbkRBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDbkNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7Ozs7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDdlNDc0NWI4NWUyODMxNDI2ODZlIiwiZ2V0UmFuZG9tSW50ID0gcmVxdWlyZSgnLi9nZXRSYW5kb21JbnQuanMnKTtcblxuZnVuY3Rpb24gY3JlYXR1cmVzKHNwcml0ZSwgdHlwZSwgdGlrcykge1xuXG4gICAgdGhpcy5zcHJpdGUgPSBzcHJpdGU7XG4gICAgdGhpcy5jcmVhdHVyZUFycmF5ID0gW107XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLnRpa3MgPSB0aWtzO1xuICAgIHRoaXMudGltZSA9IDE0OTtcbn1cblxuZnVuY3Rpb24gY3JlYXR1cmUocG9zaXRpb24sIHNwcml0ZSkge1xuXG4gICAgdGhpcy5zcHJpdGUgPSBzcHJpdGU7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xufVxuXG5jcmVhdHVyZXMucHJvdG90eXBlLnVwZGF0ZUNyZWF0dXJlcyA9IGZ1bmN0aW9uIChkaWZmKSB7XG5cbiAgICB0aGlzLnRpbWUgKz0gTWF0aC5yb3VuZChkaWZmICogNjApO1xuXG4gICAgaWYgKHRoaXMudGltZSAlIHRoaXMudGlrcyA9PSAodGhpcy50aWtzIC0gMSkpIHtcbiAgICAgICAgdGhpcy5jcmVhdHVyZUFycmF5LnB1c2gobmV3IGNyZWF0dXJlKFs4MTAsIGdldFJhbmRvbUludCgwLCAzMDApXSwgdGhpcy5zcHJpdGUpKTtcbiAgICB9XG5cbiAgICB0aGlzLmNyZWF0dXJlQXJyYXkuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgdmFsdWUucG9zaXRpb25bMF0gLT0gMjtcbiAgICAgICAgdmFsdWUuc3ByaXRlLnVwZGF0ZShkaWZmKTtcbiAgICB9KTtcblxuICAgIHRoaXMuY3JlYXR1cmVBcnJheS5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZS5wb3NpdGlvblswXSA8IC0xMDApIHtcbiAgICAgICAgICAgIGFycmF5LnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufVxuXG5jcmVhdHVyZXMucHJvdG90eXBlLnJlbmRlckNyZWF0dXJlcyA9IGZ1bmN0aW9uIChudW1PZkZyYW1lcykge1xuXG4gICAgdGhpcy5jcmVhdHVyZUFycmF5LmZvckVhY2goKHZhbHVlLCBpbmRleCwgYXJyYXkpID0+IHtcblxuICAgICAgICB2YWx1ZS5zcHJpdGUuY29udGV4dC5zYXZlKCk7XG4gICAgICAgIHZhbHVlLnNwcml0ZS5jb250ZXh0LnRyYW5zbGF0ZSh2YWx1ZS5wb3NpdGlvblswXSwgdmFsdWUucG9zaXRpb25bMV0pO1xuICAgICAgICB2YWx1ZS5zcHJpdGUucmVuZGVyKG51bU9mRnJhbWVzKTtcbiAgICAgICAgdmFsdWUuc3ByaXRlLmNvbnRleHQucmVzdG9yZSgpO1xuXG4gICAgfSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0dXJlcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY3JlYXR1cmVUb0NvbGxlY3QuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYW5kb21JbnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2dldFJhbmRvbUludC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBiYWNrZ3JvdW5kKGNvbnRleHQpIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICB0aGlzLmltYWdlLnNyYyA9ICdpbWcvYmFja2dyb3VuZDEucG5nJztcbiAgICB0aGlzLndpZHRoID0gODAwO1xuICAgIHRoaXMuaGVpZ3RoID0gNDAwO1xuICAgIHRoaXMuc3RlcCA9IDA7XG59O1xuXG5iYWNrZ3JvdW5kLnByb3RvdHlwZS5yZW5kZXJCYWNrZ3JvdW5kID0gZnVuY3Rpb24gKCkge1xuXG4gICAgKyt0aGlzLnN0ZXA7XG4gICAgaWYgKHRoaXMuc3RlcCA9PSA4MDApIHtcbiAgICAgICAgdGhpcy5zdGVwID0gMDtcbiAgICB9XG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAwLCAwLCB0aGlzLnN0ZXAsIDQwMCwgdGhpcy53aWR0aCAtIHRoaXMuc3RlcCwgMCwgdGhpcy5zdGVwLCA0MDApO1xuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy5zdGVwLCAwLCB0aGlzLndpZHRoIC0gdGhpcy5zdGVwLCA0MDAsIDAsIDAsIHRoaXMud2lkdGggLSB0aGlzLnN0ZXAsIDQwMCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhY2tncm91bmQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2JhY2tncm91bmQuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY3JlYXR1cmVzID0gcmVxdWlyZSgnLi9jcmVhdHVyZVRvQ29sbGVjdC5qcycpO1xuXG5mdW5jdGlvbiBjaGVjayhjYW52YXMsIHBsYXllciwgd2FsbHMsIGNvaW5zLCBjaGlrZW5zKSB7XG4gICAgdGhpcy5maWVsZCA9IGNhbnZhcztcbiAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICB0aGlzLndhbGxzID0gd2FsbHM7XG4gICAgdGhpcy5jb2lucyA9IGNvaW5zO1xuICAgIHRoaXMuY2hpa2VucyA9IGNoaWtlbnM7XG5cbn1cblxuY2hlY2sucHJvdG90eXBlLmNoZWNrSW50ZXJzZWN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB0aGlzLmlmT3V0T2ZGaWVsZCgpIHx8IHRoaXMuaWZXYWxsKCk7XG59XG5cbmNoZWNrLnByb3RvdHlwZS5pZk91dE9mRmllbGQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBpZiAodGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gPCAtMTApIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gPSAtMTA7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBsYXllci5wb3NpdGlvblsxXSA+IDM1MCkge1xuICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvblsxXSA9IDM1MDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuY2hlY2sucHJvdG90eXBlLmlmV2FsbCA9IGZ1bmN0aW9uIChhcmcpIHtcblxuICAgIGxldCByZXMgPSBmYWxzZTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53YWxscy53YWxsQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMucGxheWVyLnBvc2l0aW9uWzBdICsgdGhpcy5wbGF5ZXIuc3ByaXRlLndpZHRoIC0gMTAgPCB0aGlzLndhbGxzLndhbGxBcnJheVtpXS5wb3NpdGlvblswXSAtIDEwIHx8XG4gICAgICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvblsxXSArIHRoaXMucGxheWVyLnNwcml0ZS5oZWlnaHQgLSAyMCA8IHRoaXMud2FsbHMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzFdIC0gMTAgfHxcbiAgICAgICAgICAgIHRoaXMud2FsbHMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzBdICsgdGhpcy53YWxscy53YWxsQXJyYXlbaV0ud2lkdGggLSAxMCA8IHRoaXMucGxheWVyLnBvc2l0aW9uWzBdICsgMTAgfHxcbiAgICAgICAgICAgIHRoaXMud2FsbHMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzFdICsgdGhpcy53YWxscy53YWxsQXJyYXlbaV0uaGVpZ3RoIC0gMTAgPCB0aGlzLnBsYXllci5wb3NpdGlvblsxXSArIDIwKSB7XG4gICAgICAgICAgICByZXMgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbmNoZWNrLnByb3RvdHlwZS5pZkNyZWF0dXJlVG9Db2xsZWN0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgbGV0IHJlcyA9IGZhbHNlO1xuICAgIGZvciAocHJvcCBpbiB0aGlzKSB7XG5cbiAgICAgICAgaWYgKHRoaXNbcHJvcF0gaW5zdGFuY2VvZiBjcmVhdHVyZXMpIHtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzW3Byb3BdLmNyZWF0dXJlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIucG9zaXRpb25bMF0gKyB0aGlzLnBsYXllci5zcHJpdGUud2lkdGggPCB0aGlzW3Byb3BdLmNyZWF0dXJlQXJyYXlbaV0ucG9zaXRpb25bMF0gKyAxMCB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvblsxXSArIHRoaXMucGxheWVyLnNwcml0ZS5oZWlnaHQgPCB0aGlzW3Byb3BdLmNyZWF0dXJlQXJyYXlbaV0ucG9zaXRpb25bMV0gLSAxMCB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzW3Byb3BdLmNyZWF0dXJlQXJyYXlbaV0ucG9zaXRpb25bMF0gKyAxMCArIHRoaXNbcHJvcF0uY3JlYXR1cmVBcnJheVtpXS5zcHJpdGUud2lkdGggPCB0aGlzLnBsYXllci5wb3NpdGlvblswXSAtIDEwIHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbcHJvcF0uY3JlYXR1cmVBcnJheVtpXS5wb3NpdGlvblsxXSAtIDEwICsgdGhpc1twcm9wXS5jcmVhdHVyZUFycmF5W2ldLnNwcml0ZS53aWR0aCA8IHRoaXMucGxheWVyLnBvc2l0aW9uWzFdIC0gMTApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1twcm9wXS5jcmVhdHVyZUFycmF5LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbcHJvcF0udHlwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVjaztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY2hlY2suanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gcGxheWVyKHNwcml0ZSwgcG9zaXRpb24pIHtcblxuICAgIHRoaXMuc3ByaXRlID0gc3ByaXRlO1xuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB0aGlzLmdyYXZpdHkgPSAxMDtcbiAgICB0aGlzLnNwZWVkT2ZGYWxsaW5nID0gMDtcbiAgICB0aGlzLnN0ZXAgPSAwO1xuXG4gICAgdGhpcy5vbkZseSA9IGZhbHNlO1xuICAgIHRoaXMubnVtID0gMTtcblxufVxuXG5wbGF5ZXIucHJvdG90eXBlLnVwZGF0ZVBsYXllciA9IGZ1bmN0aW9uIChkaWZmKSB7XG5cbiAgICB0aGlzLnNwZWVkT2ZGYWxsaW5nID0gTWF0aC5wb3coMiAqIHRoaXMuZ3Jhdml0eSAqIHRoaXMuc3RlcCwgMSAvIDIpO1xuXG4gICAgaWYgKHRoaXMub25GbHkpIHtcbiAgICAgICAgdGhpcy5zdGVwICs9IDEwMDtcbiAgICAgICAgdGhpcy5wb3NpdGlvblsxXSAtPSB0aGlzLnNwZWVkT2ZGYWxsaW5nICogZGlmZjtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wb3NpdGlvblsxXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGVwICs9IDYwO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWzFdICs9IHRoaXMuc3BlZWRPZkZhbGxpbmcgKiBkaWZmO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnBvc2l0aW9uWzFdKTtcbiAgICB9XG5cbiAgICB0aGlzLnNwcml0ZS51cGRhdGUoZGlmZik7XG59XG5cbnBsYXllci5wcm90b3R5cGUucmVuZGVyUGxheWVyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdGhpcy5zcHJpdGUuY29udGV4dC5zYXZlKCk7XG4gICAgdGhpcy5zcHJpdGUuY29udGV4dC50cmFuc2xhdGUoMCwgdGhpcy5wb3NpdGlvblsxXSk7XG4gICAgdGhpcy5zcHJpdGUucmVuZGVyKHRoaXMubnVtKTtcbiAgICB0aGlzLnNwcml0ZS5jb250ZXh0LnJlc3RvcmUoKTtcbn1cblxucGxheWVyLnByb3RvdHlwZS5mbHkgPSBmdW5jdGlvbiAoYXJnKSB7XG5cbiAgICBpZiAoIXRoaXMub25GbHkpIHtcbiAgICAgICAgdGhpcy5zdGVwID0gMDtcbiAgICAgICAgdGhpcy5udW0gPSA0O1xuICAgIH0gZWxzZSBpZiAoIWFyZykge1xuICAgICAgICB0aGlzLnN0ZXAgPSAwO1xuICAgICAgICB0aGlzLm51bSA9IDE7XG4gICAgfVxuICAgIHRoaXMub25GbHkgPSBhcmc7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBwbGF5ZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL3BsYXllci5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBTcHJpdGUoY29udGV4dCwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIHNwZWVkLCBmcmFtZXMpIHtcblxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5mcmFtZXMgPSBmcmFtZXM7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7XG5cbn07XG5cblNwcml0ZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKG51bSkge1xuXG4gICAgbGV0IHJvdW5kZWREdXJhdGlvbiA9IE1hdGgucm91bmQodGhpcy5kdXJhdGlvbik7XG4gICAgbGV0IGZyYW1lID0gdGhpcy5mcmFtZXNbcm91bmRlZER1cmF0aW9uICUgbnVtXTtcbiAgICBsZXQgeCA9IGZyYW1lICogdGhpcy53aWR0aDtcbiAgICBsZXQgeSA9IDA7XG5cbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICB0aGlzLmltYWdlLFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB0aGlzLndpZHRoLFxuICAgICAgICB0aGlzLmhlaWdodCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgdGhpcy53aWR0aCxcbiAgICAgICAgdGhpcy5oZWlnaHQpO1xufTtcblxuU3ByaXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZGlmZikge1xuICAgIHRoaXMuZHVyYXRpb24gKz0gdGhpcy5zcGVlZCAqIGRpZmY7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNwcml0ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvc3ByaXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImdldFJhbmRvbUludCA9IHJlcXVpcmUoJy4vZ2V0UmFuZG9tSW50LmpzJyk7XG5cbmZ1bmN0aW9uIHdhbGxzKGNvbnRleHQpIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMud2FsbEFycmF5ID0gW107XG4gICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIHRoaXMuaW1hZ2Uuc3JjID0gJ2ltZy93YWxsLnBuZyc7XG4gICAgdGhpcy5zcGFjZUhlaWd0aCA9IDE1MDtcbiAgICB0aGlzLndpZHRoT2ZXYWxsID0gNTA7XG4gICAgdGhpcy50aW1lID0gNzU7XG59XG5cbmZ1bmN0aW9uIHdhbGwocG9zLCB3aWR0aCwgaGVpZ3RoKSB7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvcztcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlndGggPSBoZWlndGg7XG59XG5cbndhbGxzLnByb3RvdHlwZS5yZW5kZXJXYWxscyA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53YWxsQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLndpZHRoLFxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0uaGVpZ3RoLFxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0ucG9zaXRpb25bMF0sXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5wb3NpdGlvblsxXSxcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLndpZHRoLFxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0uaGVpZ3RoKTtcbiAgICB9XG59XG5cbndhbGxzLnByb3RvdHlwZS51cGRhdGVXYWxscyA9IGZ1bmN0aW9uIChkaWZmKSB7XG5cbiAgICB0aGlzLnRpbWUgKz0gTWF0aC5yb3VuZChkaWZmICogNjApO1xuXG4gICAgaWYgKHRoaXMudGltZSAlIDE1MCA9PSAxNDkpIHtcblxuICAgICAgICBsZXQgcmFuZG9tU3BhY2VQb3NpdGlvbiA9IGdldFJhbmRvbUludCgwLCAzMDApO1xuXG4gICAgICAgIHRoaXMud2FsbEFycmF5LnB1c2gobmV3IHdhbGwoWzgxMCwgMF0sIHRoaXMud2lkdGhPZldhbGwsIHJhbmRvbVNwYWNlUG9zaXRpb24pKTtcbiAgICAgICAgdGhpcy53YWxsQXJyYXkucHVzaChuZXcgd2FsbChbODEwLCByYW5kb21TcGFjZVBvc2l0aW9uICsgdGhpcy5zcGFjZUhlaWd0aF0sIHRoaXMud2lkdGhPZldhbGwsIDQwMCAtIHJhbmRvbVNwYWNlUG9zaXRpb24gLSB0aGlzLnNwYWNlSGVpZ3RoKSk7XG4gICAgfVxuXG4gICAgdGhpcy53YWxsQXJyYXkuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgdmFsdWUucG9zaXRpb25bMF0gLT0gMjtcbiAgICB9KTtcblxuICAgIHRoaXMud2FsbEFycmF5LmZvckVhY2goKHZhbHVlLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlLnBvc2l0aW9uWzBdIDwgLTEwMCkge1xuICAgICAgICAgICAgYXJyYXkuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhbGxzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy93YWxscy5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBTcHJpdGUgPSByZXF1aXJlKCcuL3Nwcml0ZS5qcycpO1xuY29uc3QgcGxheWVyID0gcmVxdWlyZSgnLi9wbGF5ZXIuanMnKTtcbmNvbnN0IGJhY2tncm91bmQgPSByZXF1aXJlKCcuL2JhY2tncm91bmQuanMnKTtcbmNvbnN0IHdhbGxzID0gcmVxdWlyZSgnLi93YWxscy5qcycpO1xuY29uc3QgY2hlY2sgPSByZXF1aXJlKCcuL2NoZWNrLmpzJyk7XG5jb25zdCBjcmVhdHVyZXMgPSByZXF1aXJlKCcuL2NyZWF0dXJlVG9Db2xsZWN0LmpzJyk7XG5cbmxldCByZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgICAgIH07XG59KSgpO1xuXG5sZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbmxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuY2FudmFzLndpZHRoID0gODAwO1xuY2FudmFzLmhlaWdodCA9IDQwMDtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxubGV0IHByb2dyZXNzT2ZUaXJlZG5lc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxubGV0IHByb2dyZXNzU3RyaXBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG5wcm9ncmVzc09mVGlyZWRuZXNzLmNsYXNzTmFtZSA9ICd0aXJlZG5lc3MnO1xucHJvZ3Jlc3NTdHJpcGUuc3R5bGUud2lkdGggPSAnMTAwJSc7XG5wcm9ncmVzc09mVGlyZWRuZXNzLmFwcGVuZENoaWxkKHByb2dyZXNzU3RyaXBlKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocHJvZ3Jlc3NPZlRpcmVkbmVzcyk7XG5cbmZ1bmN0aW9uIHVwZGF0ZVByb2dyZXNzQmFyKCkge1xuXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gTWF0aC5mbG9vcihnYW1lVGltZSk7XG5cbiAgICBpZiAoY3VycmVudFRpbWUgPiBnYW1lVGltZVJlYykge1xuICAgICAgICBnYW1lVGltZVJlYyA9IGN1cnJlbnRUaW1lO1xuICAgICAgICBsZXQgY3VycmVudFByb2dyZXMgPSBwYXJzZUludChwcm9ncmVzc1N0cmlwZS5zdHlsZS53aWR0aCk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRQcm9ncmVzID09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRQcm9ncmVzIC09IDE7XG4gICAgICAgIHByb2dyZXNzU3RyaXBlLnN0eWxlLndpZHRoID0gY3VycmVudFByb2dyZXMgKyAnJSc7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU2NvcmVzKCkge1xuXG4gICAgbGV0IHNjb3JlcyA9IGRvY3VtZW50LmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2NvcmVzJylbMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0cm9uZycpO1xuICAgIGxldCBzY29yZSA9IHBhcnNlSW50KHNjb3Jlc1swXS5pbm5lckhUTUwpO1xuICAgIHNjb3Jlc1swXS5pbm5lckhUTUwgPSBzY29yZSArIDE7XG5cbn1cblxuZnVuY3Rpb24gcmVuZGVyQWxsKCkge1xuXG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCA4MDAsIDQwMCk7XG4gICAgYmFja2dyb3VuZEltYWdlLnJlbmRlckJhY2tncm91bmQoKTtcbiAgICBkcmFnb24ucmVuZGVyUGxheWVyKCk7XG4gICAgd2FsbEFycmF5LnJlbmRlcldhbGxzKCk7XG4gICAgY2hpa2VuQXJyYXkucmVuZGVyQ3JlYXR1cmVzKDMpO1xuICAgIGNvaW5BcnJheS5yZW5kZXJDcmVhdHVyZXMoOSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUFsbChkaWZmKSB7XG5cbiAgICBkcmFnb24udXBkYXRlUGxheWVyKGRpZmYpO1xuICAgIHdhbGxBcnJheS51cGRhdGVXYWxscyhkaWZmKTtcbiAgICBjaGlrZW5BcnJheS51cGRhdGVDcmVhdHVyZXMoZGlmZik7XG4gICAgY29pbkFycmF5LnVwZGF0ZUNyZWF0dXJlcyhkaWZmKTtcblxuICAgIGlzUHJvZ3Jlc3NCYXJFbmQgPSB1cGRhdGVQcm9ncmVzc0JhcigpO1xuXG4gICAgaXNHYW1lT3ZlciA9IGNoZWNrT2JqLmNoZWNrSW50ZXJzZWN0aW9ucygpO1xuXG4gICAgbGV0IGNvbGxlY3RlZCA9IGNoZWNrT2JqLmlmQ3JlYXR1cmVUb0NvbGxlY3QoKTtcbiAgICBpZiAoY29sbGVjdGVkID09PSAnY29pbicpIHtcbiAgICAgICAgdXBkYXRlU2NvcmVzKCk7XG4gICAgfSBlbHNlIGlmIChjb2xsZWN0ZWQgPT09ICdjaGlja2VuJykge1xuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBwYXJzZUludChwcm9ncmVzc1N0cmlwZS5zdHlsZS53aWR0aCk7XG4gICAgICAgIHByb2dyZXNzICs9IDEwO1xuICAgICAgICBwcm9ncmVzc1N0cmlwZS5zdHlsZS53aWR0aCA9IHByb2dyZXNzICsgJyUnO1xuICAgIH1cbn1cblxuLy9tYWluIGxvb3BcbmZ1bmN0aW9uIG1haW4oKSB7XG5cbiAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBsZXQgZGlmZiA9IChub3cgLSBsYXN0VGltZSkgLyAxMDAwO1xuICAgIHVwZGF0ZUFsbChkaWZmKTtcbiAgICByZW5kZXJBbGwoKTtcbiAgICBsYXN0VGltZSA9IG5vdztcbiAgICBnYW1lVGltZSArPSBkaWZmO1xuICAgIGlmICghaXNHYW1lT3ZlciAmJiAhaXNQcm9ncmVzc0JhckVuZCkge1xuICAgICAgICByZXF1ZXN0QW5pbUZyYW1lKG1haW4pO1xuICAgIH1cbn1cblxubGV0IGxhc3RUaW1lID0gRGF0ZS5ub3coKTtcbmxldCBkcmFnb24sIHdhbGxBcnJheSwgY29pbkFycmF5LCBjaGlrZW5BcnJheSwgYmFja2dyb3VuZEltYWdlLCBjaGVja09iajtcbmxldCBpc0dhbWVPdmVyID0gZmFsc2U7XG5sZXQgaXNQcm9ncmVzc0JhckVuZCA9IGZhbHNlO1xubGV0IGdhbWVUaW1lID0gMDtcbmxldCBnYW1lVGltZVJlYyA9IDE7XG5cbmZ1bmN0aW9uIGxvYWRDb250ZW50KCkge1xuXG4gICAgY29uc3QgZHJhZ29uSW1nID0gbmV3IEltYWdlKCk7XG4gICAgZHJhZ29uSW1nLnNyYyA9ICdpbWcvZHJhZ29uLWZseS5wbmcnO1xuXG4gICAgY29uc3QgY29pbkltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGNvaW5JbWcuc3JjID0gJ2ltZy9jb2luLnBuZyc7XG5cbiAgICBjb25zdCBjaGlrZW5JbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBjaGlrZW5JbWcuc3JjID0gJ2ltZy9jaGlja2VuLnBuZyc7XG5cbiAgICBiYWNrZ3JvdW5kSW1hZ2UgPSBuZXcgYmFja2dyb3VuZChjdHgpO1xuXG4gICAgZHJhZ29uID0gbmV3IHBsYXllcihuZXcgU3ByaXRlKGN0eCwgOTQsIDY3LCBkcmFnb25JbWcsIDE2LCBbMCwgMSwgMiwgM10pLCBbMCwgMF0pO1xuXG4gICAgd2FsbEFycmF5ID0gbmV3IHdhbGxzKGN0eCk7XG5cbiAgICBjaGlrZW5BcnJheSA9IG5ldyBjcmVhdHVyZXMobmV3IFNwcml0ZShjdHgsIDQ1LjMzLCA1NSwgY2hpa2VuSW1nLCA2LCBbMCwgMSwgMl0pLCAnY2hpY2tlbicsIDYwMClcblxuICAgIGNvaW5BcnJheSA9IG5ldyBjcmVhdHVyZXMobmV3IFNwcml0ZShjdHgsIDUwLCA1MCwgY29pbkltZywgNiwgWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDldKSwgJ2NvaW4nLCAxNTApO1xuXG4gICAgY2hlY2tPYmogPSBuZXcgY2hlY2soY2FudmFzLCBkcmFnb24sIHdhbGxBcnJheSwgY29pbkFycmF5LCBjaGlrZW5BcnJheSk7XG5cbiAgICBtYWluKCk7XG59XG5cbi8vZXZlbnQgd2hlbiBmbHlpbmcgdXBcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBkcmFnb24uZmx5KHRydWUpO1xufSk7XG5cbi8vZXZlbnQgd2hlbiBzdG9wIGZseWluZyB1cFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBkcmFnb24uZmx5KGZhbHNlKTtcbn0pO1xuXG4vL2xvYWQgaW1hZ2VzIGFuZCBzdGFydCBtYWluIGxvb3BcbmxvYWRDb250ZW50KCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=