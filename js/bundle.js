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
    this.image.src = 'img/background2.png';
    this.width = 1152;
    this.heigth = 648;
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
    } else if (this.player.position[1] > 620) {
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

    if (this.time % 250 == 249) {

        let randomSpacePosition = getRandomInt(0, 600);

        this.wallArray.push(new wall([1162, 0], this.widthOfWall, randomSpacePosition));
        this.wallArray.push(new wall([1162, randomSpacePosition + this.spaceHeigth], this.widthOfWall, 648 - randomSpacePosition - this.spaceHeigth));
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzU0ZGYyNWZmOTQ5ZDM2MTY2MjMiLCJ3ZWJwYWNrOi8vLy4vanMvY3JlYXR1cmVUb0NvbGxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vanMvZ2V0UmFuZG9tSW50LmpzIiwid2VicGFjazovLy8uL2pzL2JhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vanMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL2pzL3Nwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy93YWxscy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ2hFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7OztBQ2pEQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDbkJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxtQkFBbUIsaUNBQWlDO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLDJCQUEyQixxQ0FBcUM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDbkVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOzs7Ozs7O0FDbkRBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDbkNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7Ozs7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDM1NGRmMjVmZjk0OWQzNjE2NjIzIiwiZ2V0UmFuZG9tSW50ID0gcmVxdWlyZSgnLi9nZXRSYW5kb21JbnQuanMnKTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0dXJlcyhzcHJpdGUsIHR5cGUsIHRpa3MpIHtcclxuXHJcbiAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZTtcclxuICAgIHRoaXMuY3JlYXR1cmVBcnJheSA9IFtdO1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMudGlrcyA9IHRpa3M7XHJcbiAgICB0aGlzLnRpbWUgPSAxNDk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0dXJlKHBvc2l0aW9uLCBzcHJpdGUpIHtcclxuXHJcbiAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZTtcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxufVxyXG5cclxuY3JlYXR1cmVzLnByb3RvdHlwZS51cGRhdGVDcmVhdHVyZXMgPSBmdW5jdGlvbiAoZGlmZikge1xyXG5cclxuICAgIHRoaXMudGltZSArPSBNYXRoLnJvdW5kKGRpZmYgKiA2MCk7XHJcblxyXG4gICAgaWYgKHRoaXMudGltZSAlIHRoaXMudGlrcyA9PSAodGhpcy50aWtzIC0gMSkpIHtcclxuICAgICAgICB0aGlzLmNyZWF0dXJlQXJyYXkucHVzaChuZXcgY3JlYXR1cmUoWzgxMCwgZ2V0UmFuZG9tSW50KDAsIDMwMCldLCB0aGlzLnNwcml0ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3JlYXR1cmVBcnJheS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHZhbHVlLnBvc2l0aW9uWzBdIC09IDI7XHJcbiAgICAgICAgdmFsdWUuc3ByaXRlLnVwZGF0ZShkaWZmKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY3JlYXR1cmVBcnJheS5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgaWYgKHZhbHVlLnBvc2l0aW9uWzBdIDwgLTEwMCkge1xyXG4gICAgICAgICAgICBhcnJheS5zaGlmdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuY3JlYXR1cmVzLnByb3RvdHlwZS5yZW5kZXJDcmVhdHVyZXMgPSBmdW5jdGlvbiAobnVtT2ZGcmFtZXMpIHtcclxuXHJcbiAgICB0aGlzLmNyZWF0dXJlQXJyYXkuZm9yRWFjaCgodmFsdWUsIGluZGV4LCBhcnJheSkgPT4ge1xyXG5cclxuICAgICAgICB2YWx1ZS5zcHJpdGUuY29udGV4dC5zYXZlKCk7XHJcbiAgICAgICAgdmFsdWUuc3ByaXRlLmNvbnRleHQudHJhbnNsYXRlKHZhbHVlLnBvc2l0aW9uWzBdLCB2YWx1ZS5wb3NpdGlvblsxXSk7XHJcbiAgICAgICAgdmFsdWUuc3ByaXRlLnJlbmRlcihudW1PZkZyYW1lcyk7XHJcbiAgICAgICAgdmFsdWUuc3ByaXRlLmNvbnRleHQucmVzdG9yZSgpO1xyXG5cclxuICAgIH0pO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXR1cmVzO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NyZWF0dXJlVG9Db2xsZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIGdldFJhbmRvbUludChtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYW5kb21JbnQ7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvZ2V0UmFuZG9tSW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIGJhY2tncm91bmQoY29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgIHRoaXMuaW1hZ2Uuc3JjID0gJ2ltZy9iYWNrZ3JvdW5kMi5wbmcnO1xyXG4gICAgdGhpcy53aWR0aCA9IDExNTI7XHJcbiAgICB0aGlzLmhlaWd0aCA9IDY0ODtcclxuICAgIHRoaXMuc3RlcCA9IDA7XHJcbn07XHJcblxyXG5iYWNrZ3JvdW5kLnByb3RvdHlwZS5yZW5kZXJCYWNrZ3JvdW5kID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICsrdGhpcy5zdGVwO1xyXG4gICAgaWYgKHRoaXMuc3RlcCA9PSB0aGlzLndpZHRoKSB7XHJcbiAgICAgICAgdGhpcy5zdGVwID0gMDtcclxuICAgIH1cclxuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMCwgMCwgdGhpcy5zdGVwLCB0aGlzLmhlaWd0aCwgdGhpcy53aWR0aCAtIHRoaXMuc3RlcCwgMCwgdGhpcy5zdGVwLCB0aGlzLmhlaWd0aCk7XHJcbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMuc3RlcCwgMCwgdGhpcy53aWR0aCAtIHRoaXMuc3RlcCwgdGhpcy5oZWlndGgsIDAsIDAsIHRoaXMud2lkdGggLSB0aGlzLnN0ZXAsIHRoaXMuaGVpZ3RoKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYmFja2dyb3VuZDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9iYWNrZ3JvdW5kLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNyZWF0dXJlcyA9IHJlcXVpcmUoJy4vY3JlYXR1cmVUb0NvbGxlY3QuanMnKTtcclxuXHJcbmZ1bmN0aW9uIGNoZWNrKGNhbnZhcywgcGxheWVyLCB3YWxscywgY29pbnMsIGNoaWtlbnMpIHtcclxuICAgIHRoaXMuZmllbGQgPSBjYW52YXM7XHJcbiAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuICAgIHRoaXMud2FsbHMgPSB3YWxscztcclxuICAgIHRoaXMuY29pbnMgPSBjb2lucztcclxuICAgIHRoaXMuY2hpa2VucyA9IGNoaWtlbnM7XHJcblxyXG59XHJcblxyXG5jaGVjay5wcm90b3R5cGUuY2hlY2tJbnRlcnNlY3Rpb25zID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHJldHVybiB0aGlzLmlmT3V0T2ZGaWVsZCgpIHx8IHRoaXMuaWZXYWxsKCk7XHJcbn1cclxuXHJcbmNoZWNrLnByb3RvdHlwZS5pZk91dE9mRmllbGQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgaWYgKHRoaXMucGxheWVyLnBvc2l0aW9uWzFdIDwgLTEwKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gPSAtMTA7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucGxheWVyLnBvc2l0aW9uWzFdID4gNjIwKSB7XHJcbiAgICAgICAgLy8gdGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gPSAzNTA7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbmNoZWNrLnByb3RvdHlwZS5pZldhbGwgPSBmdW5jdGlvbiAoYXJnKSB7XHJcblxyXG4gICAgbGV0IHJlcyA9IGZhbHNlO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53YWxscy53YWxsQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXIucG9zaXRpb25bMF0gKyB0aGlzLnBsYXllci5zcHJpdGUud2lkdGggLSAxMCA8IHRoaXMud2FsbHMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzBdIC0gMTAgfHxcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gKyB0aGlzLnBsYXllci5zcHJpdGUuaGVpZ2h0IC0gMjAgPCB0aGlzLndhbGxzLndhbGxBcnJheVtpXS5wb3NpdGlvblsxXSAtIDEwIHx8XHJcbiAgICAgICAgICAgIHRoaXMud2FsbHMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzBdICsgdGhpcy53YWxscy53YWxsQXJyYXlbaV0ud2lkdGggLSAxMCA8IHRoaXMucGxheWVyLnBvc2l0aW9uWzBdICsgMTAgfHxcclxuICAgICAgICAgICAgdGhpcy53YWxscy53YWxsQXJyYXlbaV0ucG9zaXRpb25bMV0gKyB0aGlzLndhbGxzLndhbGxBcnJheVtpXS5oZWlndGggLSAxMCA8IHRoaXMucGxheWVyLnBvc2l0aW9uWzFdICsgMjApIHtcclxuICAgICAgICAgICAgcmVzID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcztcclxufVxyXG5cclxuY2hlY2sucHJvdG90eXBlLmlmQ3JlYXR1cmVUb0NvbGxlY3QgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgbGV0IHJlcyA9IGZhbHNlO1xyXG4gICAgZm9yIChwcm9wIGluIHRoaXMpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXNbcHJvcF0gaW5zdGFuY2VvZiBjcmVhdHVyZXMpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpc1twcm9wXS5jcmVhdHVyZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIucG9zaXRpb25bMF0gKyB0aGlzLnBsYXllci5zcHJpdGUud2lkdGggPCB0aGlzW3Byb3BdLmNyZWF0dXJlQXJyYXlbaV0ucG9zaXRpb25bMF0gKyAxMCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc2l0aW9uWzFdICsgdGhpcy5wbGF5ZXIuc3ByaXRlLmhlaWdodCA8IHRoaXNbcHJvcF0uY3JlYXR1cmVBcnJheVtpXS5wb3NpdGlvblsxXSAtIDEwIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1twcm9wXS5jcmVhdHVyZUFycmF5W2ldLnBvc2l0aW9uWzBdICsgMTAgKyB0aGlzW3Byb3BdLmNyZWF0dXJlQXJyYXlbaV0uc3ByaXRlLndpZHRoIDwgdGhpcy5wbGF5ZXIucG9zaXRpb25bMF0gLSAxMCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbcHJvcF0uY3JlYXR1cmVBcnJheVtpXS5wb3NpdGlvblsxXSAtIDEwICsgdGhpc1twcm9wXS5jcmVhdHVyZUFycmF5W2ldLnNwcml0ZS53aWR0aCA8IHRoaXMucGxheWVyLnBvc2l0aW9uWzFdIC0gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1twcm9wXS5jcmVhdHVyZUFycmF5LnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1twcm9wXS50eXBlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcztcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjaGVjaztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBwbGF5ZXIoc3ByaXRlLCBwb3NpdGlvbikge1xyXG5cclxuICAgIHRoaXMuc3ByaXRlID0gc3ByaXRlO1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgdGhpcy5ncmF2aXR5ID0gMTA7XHJcbiAgICB0aGlzLnNwZWVkT2ZGYWxsaW5nID0gMDtcclxuICAgIHRoaXMuc3RlcCA9IDA7XHJcblxyXG4gICAgdGhpcy5vbkZseSA9IGZhbHNlO1xyXG4gICAgdGhpcy5udW0gPSAxO1xyXG5cclxufVxyXG5cclxucGxheWVyLnByb3RvdHlwZS51cGRhdGVQbGF5ZXIgPSBmdW5jdGlvbiAoZGlmZikge1xyXG5cclxuICAgIHRoaXMuc3BlZWRPZkZhbGxpbmcgPSBNYXRoLnBvdygyICogdGhpcy5ncmF2aXR5ICogdGhpcy5zdGVwLCAxIC8gMik7XHJcblxyXG4gICAgaWYgKHRoaXMub25GbHkpIHtcclxuICAgICAgICB0aGlzLnN0ZXAgKz0gMTAwO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb25bMV0gLT0gdGhpcy5zcGVlZE9mRmFsbGluZyAqIGRpZmY7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wb3NpdGlvblsxXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3RlcCArPSA2MDtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uWzFdICs9IHRoaXMuc3BlZWRPZkZhbGxpbmcgKiBkaWZmO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucG9zaXRpb25bMV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3ByaXRlLnVwZGF0ZShkaWZmKTtcclxufVxyXG5cclxucGxheWVyLnByb3RvdHlwZS5yZW5kZXJQbGF5ZXIgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdGhpcy5zcHJpdGUuY29udGV4dC5zYXZlKCk7XHJcbiAgICB0aGlzLnNwcml0ZS5jb250ZXh0LnRyYW5zbGF0ZSgwLCB0aGlzLnBvc2l0aW9uWzFdKTtcclxuICAgIHRoaXMuc3ByaXRlLnJlbmRlcih0aGlzLm51bSk7XHJcbiAgICB0aGlzLnNwcml0ZS5jb250ZXh0LnJlc3RvcmUoKTtcclxufVxyXG5cclxucGxheWVyLnByb3RvdHlwZS5mbHkgPSBmdW5jdGlvbiAoYXJnKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLm9uRmx5KSB7XHJcbiAgICAgICAgdGhpcy5zdGVwID0gMDtcclxuICAgICAgICB0aGlzLm51bSA9IDQ7XHJcbiAgICB9IGVsc2UgaWYgKCFhcmcpIHtcclxuICAgICAgICB0aGlzLnN0ZXAgPSAwO1xyXG4gICAgICAgIHRoaXMubnVtID0gMTtcclxuICAgIH1cclxuICAgIHRoaXMub25GbHkgPSBhcmc7XHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHBsYXllcjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9wbGF5ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gU3ByaXRlKGNvbnRleHQsIHdpZHRoLCBoZWlnaHQsIGltYWdlLCBzcGVlZCwgZnJhbWVzKSB7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgdGhpcy5pbWFnZSA9IGltYWdlO1xyXG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgdGhpcy5mcmFtZXMgPSBmcmFtZXM7XHJcbiAgICB0aGlzLmR1cmF0aW9uID0gMDtcclxuXHJcbn07XHJcblxyXG5TcHJpdGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChudW0pIHtcclxuXHJcbiAgICBsZXQgcm91bmRlZER1cmF0aW9uID0gTWF0aC5yb3VuZCh0aGlzLmR1cmF0aW9uKTtcclxuICAgIGxldCBmcmFtZSA9IHRoaXMuZnJhbWVzW3JvdW5kZWREdXJhdGlvbiAlIG51bV07XHJcbiAgICBsZXQgeCA9IGZyYW1lICogdGhpcy53aWR0aDtcclxuICAgIGxldCB5ID0gMDtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICAgIHRoaXMuaW1hZ2UsXHJcbiAgICAgICAgeCxcclxuICAgICAgICB5LFxyXG4gICAgICAgIHRoaXMud2lkdGgsXHJcbiAgICAgICAgdGhpcy5oZWlnaHQsXHJcbiAgICAgICAgMCxcclxuICAgICAgICAwLFxyXG4gICAgICAgIHRoaXMud2lkdGgsXHJcbiAgICAgICAgdGhpcy5oZWlnaHQpO1xyXG59O1xyXG5cclxuU3ByaXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZGlmZikge1xyXG4gICAgdGhpcy5kdXJhdGlvbiArPSB0aGlzLnNwZWVkICogZGlmZjtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3ByaXRlO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL3Nwcml0ZS5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJnZXRSYW5kb21JbnQgPSByZXF1aXJlKCcuL2dldFJhbmRvbUludC5qcycpO1xyXG5cclxuZnVuY3Rpb24gd2FsbHMoY29udGV4dCkge1xyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgIHRoaXMud2FsbEFycmF5ID0gW107XHJcbiAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICB0aGlzLmltYWdlLnNyYyA9ICdpbWcvd2FsbC5wbmcnO1xyXG4gICAgdGhpcy5zcGFjZUhlaWd0aCA9IDE1MDtcclxuICAgIHRoaXMud2lkdGhPZldhbGwgPSA1MDtcclxuICAgIHRoaXMudGltZSA9IDc1O1xyXG59XHJcblxyXG5mdW5jdGlvbiB3YWxsKHBvcywgd2lkdGgsIGhlaWd0aCkge1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvcztcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ3RoID0gaGVpZ3RoO1xyXG59XHJcblxyXG53YWxscy5wcm90b3R5cGUucmVuZGVyV2FsbHMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndhbGxBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLndpZHRoLFxyXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5oZWlndGgsXHJcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzBdLFxyXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5wb3NpdGlvblsxXSxcclxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0ud2lkdGgsXHJcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLmhlaWd0aCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbndhbGxzLnByb3RvdHlwZS51cGRhdGVXYWxscyA9IGZ1bmN0aW9uIChkaWZmKSB7XHJcblxyXG4gICAgdGhpcy50aW1lICs9IE1hdGgucm91bmQoZGlmZiAqIDYwKTtcclxuXHJcbiAgICBpZiAodGhpcy50aW1lICUgMjUwID09IDI0OSkge1xyXG5cclxuICAgICAgICBsZXQgcmFuZG9tU3BhY2VQb3NpdGlvbiA9IGdldFJhbmRvbUludCgwLCA2MDApO1xyXG5cclxuICAgICAgICB0aGlzLndhbGxBcnJheS5wdXNoKG5ldyB3YWxsKFsxMTYyLCAwXSwgdGhpcy53aWR0aE9mV2FsbCwgcmFuZG9tU3BhY2VQb3NpdGlvbikpO1xyXG4gICAgICAgIHRoaXMud2FsbEFycmF5LnB1c2gobmV3IHdhbGwoWzExNjIsIHJhbmRvbVNwYWNlUG9zaXRpb24gKyB0aGlzLnNwYWNlSGVpZ3RoXSwgdGhpcy53aWR0aE9mV2FsbCwgNjQ4IC0gcmFuZG9tU3BhY2VQb3NpdGlvbiAtIHRoaXMuc3BhY2VIZWlndGgpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLndhbGxBcnJheS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHZhbHVlLnBvc2l0aW9uWzBdIC09IDI7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLndhbGxBcnJheS5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgaWYgKHZhbHVlLnBvc2l0aW9uWzBdIDwgLTEwMCkge1xyXG4gICAgICAgICAgICBhcnJheS5zaGlmdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHdhbGxzO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL3dhbGxzLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFNwcml0ZSA9IHJlcXVpcmUoJy4vc3ByaXRlLmpzJyk7XHJcbmNvbnN0IHBsYXllciA9IHJlcXVpcmUoJy4vcGxheWVyLmpzJyk7XHJcbmNvbnN0IGJhY2tncm91bmQgPSByZXF1aXJlKCcuL2JhY2tncm91bmQuanMnKTtcclxuY29uc3Qgd2FsbHMgPSByZXF1aXJlKCcuL3dhbGxzLmpzJyk7XHJcbmNvbnN0IGNoZWNrID0gcmVxdWlyZSgnLi9jaGVjay5qcycpO1xyXG5jb25zdCBjcmVhdHVyZXMgPSByZXF1aXJlKCcuL2NyZWF0dXJlVG9Db2xsZWN0LmpzJyk7XHJcblxyXG5sZXQgcmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XHJcbiAgICAgICAgfTtcclxufSkoKTtcclxuXHJcbmxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuY2FudmFzLndpZHRoID0gMTE1MjtcclxuY2FudmFzLmhlaWdodCA9IDY0ODtcclxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG5cclxubGV0IHByb2dyZXNzT2ZUaXJlZG5lc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbmxldCBwcm9ncmVzc1N0cmlwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHJcbnByb2dyZXNzT2ZUaXJlZG5lc3MuY2xhc3NOYW1lID0gJ3RpcmVkbmVzcyc7XHJcbnByb2dyZXNzU3RyaXBlLnN0eWxlLndpZHRoID0gJzEwMCUnO1xyXG5wcm9ncmVzc09mVGlyZWRuZXNzLmFwcGVuZENoaWxkKHByb2dyZXNzU3RyaXBlKTtcclxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwcm9ncmVzc09mVGlyZWRuZXNzKTtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVByb2dyZXNzQmFyKCkge1xyXG5cclxuICAgIGxldCBjdXJyZW50VGltZSA9IE1hdGguZmxvb3IoZ2FtZVRpbWUpO1xyXG5cclxuICAgIGlmIChjdXJyZW50VGltZSA+IGdhbWVUaW1lUmVjKSB7XHJcbiAgICAgICAgZ2FtZVRpbWVSZWMgPSBjdXJyZW50VGltZTtcclxuICAgICAgICBsZXQgY3VycmVudFByb2dyZXMgPSBwYXJzZUludChwcm9ncmVzc1N0cmlwZS5zdHlsZS53aWR0aCk7XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50UHJvZ3JlcyA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdXJyZW50UHJvZ3JlcyAtPSAxO1xyXG4gICAgICAgIHByb2dyZXNzU3RyaXBlLnN0eWxlLndpZHRoID0gY3VycmVudFByb2dyZXMgKyAnJSc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVNjb3JlcygpIHtcclxuXHJcbiAgICBsZXQgc2NvcmVzID0gZG9jdW1lbnQuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzY29yZXMnKVswXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3Ryb25nJyk7XHJcbiAgICBsZXQgc2NvcmUgPSBwYXJzZUludChzY29yZXNbMF0uaW5uZXJIVE1MKTtcclxuICAgIHNjb3Jlc1swXS5pbm5lckhUTUwgPSBzY29yZSArIDE7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJBbGwoKSB7XHJcblxyXG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAxMTUyLCA2NDgpO1xyXG4gICAgYmFja2dyb3VuZEltYWdlLnJlbmRlckJhY2tncm91bmQoKTtcclxuICAgIGRyYWdvbi5yZW5kZXJQbGF5ZXIoKTtcclxuICAgIHdhbGxBcnJheS5yZW5kZXJXYWxscygpO1xyXG4gICAgY2hpa2VuQXJyYXkucmVuZGVyQ3JlYXR1cmVzKDMpO1xyXG4gICAgY29pbkFycmF5LnJlbmRlckNyZWF0dXJlcyg5KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlQWxsKGRpZmYpIHtcclxuXHJcbiAgICBkcmFnb24udXBkYXRlUGxheWVyKGRpZmYpO1xyXG4gICAgd2FsbEFycmF5LnVwZGF0ZVdhbGxzKGRpZmYpO1xyXG4gICAgY2hpa2VuQXJyYXkudXBkYXRlQ3JlYXR1cmVzKGRpZmYpO1xyXG4gICAgY29pbkFycmF5LnVwZGF0ZUNyZWF0dXJlcyhkaWZmKTtcclxuXHJcbiAgICBpc1Byb2dyZXNzQmFyRW5kID0gdXBkYXRlUHJvZ3Jlc3NCYXIoKTtcclxuXHJcbiAgICBpc0dhbWVPdmVyID0gY2hlY2tPYmouY2hlY2tJbnRlcnNlY3Rpb25zKCk7XHJcblxyXG4gICAgbGV0IGNvbGxlY3RlZCA9IGNoZWNrT2JqLmlmQ3JlYXR1cmVUb0NvbGxlY3QoKTtcclxuICAgIGlmIChjb2xsZWN0ZWQgPT09ICdjb2luJykge1xyXG4gICAgICAgIHVwZGF0ZVNjb3JlcygpO1xyXG4gICAgfSBlbHNlIGlmIChjb2xsZWN0ZWQgPT09ICdjaGlja2VuJykge1xyXG4gICAgICAgIGxldCBwcm9ncmVzcyA9IHBhcnNlSW50KHByb2dyZXNzU3RyaXBlLnN0eWxlLndpZHRoKTtcclxuICAgICAgICBwcm9ncmVzcyArPSAxMDtcclxuICAgICAgICBwcm9ncmVzc1N0cmlwZS5zdHlsZS53aWR0aCA9IHByb2dyZXNzICsgJyUnO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL21haW4gbG9vcFxyXG5mdW5jdGlvbiBtYWluKCkge1xyXG5cclxuICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgbGV0IGRpZmYgPSAobm93IC0gbGFzdFRpbWUpIC8gMTAwMDtcclxuICAgIHVwZGF0ZUFsbChkaWZmKTtcclxuICAgIHJlbmRlckFsbCgpO1xyXG4gICAgbGFzdFRpbWUgPSBub3c7XHJcbiAgICBnYW1lVGltZSArPSBkaWZmO1xyXG4gICAgaWYgKCFpc0dhbWVPdmVyICYmICFpc1Byb2dyZXNzQmFyRW5kKSB7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1GcmFtZShtYWluKTtcclxuICAgIH1cclxufVxyXG5cclxubGV0IGxhc3RUaW1lID0gRGF0ZS5ub3coKTtcclxubGV0IGRyYWdvbiwgd2FsbEFycmF5LCBjb2luQXJyYXksIGNoaWtlbkFycmF5LCBiYWNrZ3JvdW5kSW1hZ2UsIGNoZWNrT2JqO1xyXG5sZXQgaXNHYW1lT3ZlciA9IGZhbHNlO1xyXG5sZXQgaXNQcm9ncmVzc0JhckVuZCA9IGZhbHNlO1xyXG5sZXQgZ2FtZVRpbWUgPSAwO1xyXG5sZXQgZ2FtZVRpbWVSZWMgPSAxO1xyXG5cclxuZnVuY3Rpb24gbG9hZENvbnRlbnQoKSB7XHJcblxyXG4gICAgY29uc3QgZHJhZ29uSW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICBkcmFnb25JbWcuc3JjID0gJ2ltZy9kcmFnb24tZmx5LnBuZyc7XHJcblxyXG4gICAgY29uc3QgY29pbkltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgY29pbkltZy5zcmMgPSAnaW1nL2NvaW4ucG5nJztcclxuXHJcbiAgICBjb25zdCBjaGlrZW5JbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGNoaWtlbkltZy5zcmMgPSAnaW1nL2NoaWNrZW4ucG5nJztcclxuXHJcbiAgICBiYWNrZ3JvdW5kSW1hZ2UgPSBuZXcgYmFja2dyb3VuZChjdHgpO1xyXG5cclxuICAgIGRyYWdvbiA9IG5ldyBwbGF5ZXIobmV3IFNwcml0ZShjdHgsIDk0LCA2NywgZHJhZ29uSW1nLCAxNiwgWzAsIDEsIDIsIDNdKSwgWzAsIDBdKTtcclxuXHJcbiAgICB3YWxsQXJyYXkgPSBuZXcgd2FsbHMoY3R4KTtcclxuXHJcbiAgICBjaGlrZW5BcnJheSA9IG5ldyBjcmVhdHVyZXMobmV3IFNwcml0ZShjdHgsIDQ1LjMzLCA1NSwgY2hpa2VuSW1nLCA2LCBbMCwgMSwgMl0pLCAnY2hpY2tlbicsIDYwMClcclxuXHJcbiAgICBjb2luQXJyYXkgPSBuZXcgY3JlYXR1cmVzKG5ldyBTcHJpdGUoY3R4LCA1MCwgNTAsIGNvaW5JbWcsIDYsIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XSksICdjb2luJywgMTUwKTtcclxuXHJcbiAgICBjaGVja09iaiA9IG5ldyBjaGVjayhjYW52YXMsIGRyYWdvbiwgd2FsbEFycmF5LCBjb2luQXJyYXksIGNoaWtlbkFycmF5KTtcclxuXHJcbiAgICBtYWluKCk7XHJcbn1cclxuXHJcbi8vZXZlbnQgd2hlbiBmbHlpbmcgdXBcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgZHJhZ29uLmZseSh0cnVlKTtcclxufSk7XHJcblxyXG4vL2V2ZW50IHdoZW4gc3RvcCBmbHlpbmcgdXBcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGRyYWdvbi5mbHkoZmFsc2UpO1xyXG59KTtcclxuXHJcbi8vbG9hZCBpbWFnZXMgYW5kIHN0YXJ0IG1haW4gbG9vcFxyXG5sb2FkQ29udGVudCgpO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=