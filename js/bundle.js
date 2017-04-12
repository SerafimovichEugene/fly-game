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
        this.creatureArray.push(new creature([810, getRandomInt(0, 450)], this.sprite));
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

function check(canvas, player, walls, coins, chikens) {
    this.field = canvas;
    this.player = player;
    this.walls = walls;
    this.coins = coins;
    this.chikens = chikens;
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
                if (this.player.position[0] + this.player.sprite.width < this[prop].creatureArray[i].position[0] + 10 ||
                    this.player.position[1] + this.player.sprite.height < this[prop].creatureArray[i].position[1] - 10 ||
                    this[prop].creatureArray[i].position[0] + 10 + this[prop].creatureArray[i].sprite.width < this.player.position[0] - 10 ||
                    this[prop].creatureArray[i].position[1] - 10 + this[prop].creatureArray[i].sprite.width < this.player.position[1] - 10) {
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
        this.wallArray.push(new wall([910, randomSpacePosition + getRandomInt(80, 170) + 156], this.widthOfWall, 156));
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
    else {
        music.pause();
        gameOver();
    }
}

let lastTime = Date.now();
let dragon, wallArray, coinArray, chikenArray, backgroundImage, checkObj;
let isGameOver = false;
let isProgressBarEnd = false;
let gameTime = 0;
let gameTimeRec = 1;


let music = new Audio('./msc/Flying_softly.mp3'); 


function loadContent() {

    const dragonImg = new Image('img/dragon-fly.png');
    dragonImg.src = 'img/dragon-fly.png';

    const coinImg = new Image();
    coinImg.src = 'img/coin.png';

    const chikenImg = new Image();
    chikenImg.src = 'img/chicken.png';

    backgroundImage = new background(ctx);

    dragon = new player(new Sprite(ctx, 94, 67, dragonImg, 16, [0, 1, 2, 3]), [0, 0]);

    wallArray = new walls(ctx);

    chikenArray = new creatures(new Sprite(ctx, 45.33, 55, chikenImg, 6, [0, 1, 2]), 'chicken', 700)

    coinArray = new creatures(new Sprite(ctx, 50, 50, coinImg, 6, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), 'coin', 200);

    checkObj = new check(canvas, dragon, wallArray, coinArray, chikenArray);
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

    document.getElementById('gameOver').style.display = 'block';
}

music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);



loadContent();


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDRjNWU5OGQ3MWZmMjc1YjM5OTgiLCJ3ZWJwYWNrOi8vLy4vanMvY3JlYXR1cmVUb0NvbGxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vanMvZ2V0UmFuZG9tSW50LmpzIiwid2VicGFjazovLy8uL2pzL2JhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vanMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL2pzL3Nwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy93YWxscy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ2hFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7OztBQ2pEQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDbkJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsbUJBQW1CLGlDQUFpQztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSwyQkFBMkIscUNBQXFDO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDcEVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOzs7Ozs7O0FDbkRBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDbkNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7Ozs7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxpRDs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDQ0YzVlOThkNzFmZjI3NWIzOTk4IiwiZ2V0UmFuZG9tSW50ID0gcmVxdWlyZSgnLi9nZXRSYW5kb21JbnQuanMnKTtcblxuZnVuY3Rpb24gY3JlYXR1cmVzKHNwcml0ZSwgdHlwZSwgdGlrcykge1xuXG4gICAgdGhpcy5zcHJpdGUgPSBzcHJpdGU7XG4gICAgdGhpcy5jcmVhdHVyZUFycmF5ID0gW107XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLnRpa3MgPSB0aWtzO1xuICAgIHRoaXMudGltZSA9IDE0OTtcbn1cblxuZnVuY3Rpb24gY3JlYXR1cmUocG9zaXRpb24sIHNwcml0ZSkge1xuXG4gICAgdGhpcy5zcHJpdGUgPSBzcHJpdGU7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xufVxuXG5jcmVhdHVyZXMucHJvdG90eXBlLnVwZGF0ZUNyZWF0dXJlcyA9IGZ1bmN0aW9uIChkaWZmKSB7XG5cbiAgICB0aGlzLnRpbWUgKz0gTWF0aC5yb3VuZChkaWZmICogNjApO1xuXG4gICAgaWYgKHRoaXMudGltZSAlIHRoaXMudGlrcyA9PSAodGhpcy50aWtzIC0gMSkpIHtcbiAgICAgICAgdGhpcy5jcmVhdHVyZUFycmF5LnB1c2gobmV3IGNyZWF0dXJlKFs4MTAsIGdldFJhbmRvbUludCgwLCA0NTApXSwgdGhpcy5zcHJpdGUpKTtcbiAgICB9XG5cbiAgICB0aGlzLmNyZWF0dXJlQXJyYXkuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgdmFsdWUucG9zaXRpb25bMF0gLT0gMjtcbiAgICAgICAgdmFsdWUuc3ByaXRlLnVwZGF0ZShkaWZmKTtcbiAgICB9KTtcblxuICAgIHRoaXMuY3JlYXR1cmVBcnJheS5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZS5wb3NpdGlvblswXSA8IC0xMDApIHtcbiAgICAgICAgICAgIGFycmF5LnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufVxuXG5jcmVhdHVyZXMucHJvdG90eXBlLnJlbmRlckNyZWF0dXJlcyA9IGZ1bmN0aW9uIChudW1PZkZyYW1lcykge1xuXG4gICAgdGhpcy5jcmVhdHVyZUFycmF5LmZvckVhY2goKHZhbHVlLCBpbmRleCwgYXJyYXkpID0+IHtcblxuICAgICAgICB2YWx1ZS5zcHJpdGUuY29udGV4dC5zYXZlKCk7XG4gICAgICAgIHZhbHVlLnNwcml0ZS5jb250ZXh0LnRyYW5zbGF0ZSh2YWx1ZS5wb3NpdGlvblswXSwgdmFsdWUucG9zaXRpb25bMV0pO1xuICAgICAgICB2YWx1ZS5zcHJpdGUucmVuZGVyKG51bU9mRnJhbWVzKTtcbiAgICAgICAgdmFsdWUuc3ByaXRlLmNvbnRleHQucmVzdG9yZSgpO1xuXG4gICAgfSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0dXJlcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY3JlYXR1cmVUb0NvbGxlY3QuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYW5kb21JbnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2dldFJhbmRvbUludC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBiYWNrZ3JvdW5kKGNvbnRleHQpIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICB0aGlzLmltYWdlLnNyYyA9ICdpbWcvYmFja2dyb3VuZDIucG5nJztcbiAgICB0aGlzLndpZHRoID0gOTA4O1xuICAgIHRoaXMuaGVpZ3RoID0gNTEyO1xuICAgIHRoaXMuc3RlcCA9IDA7XG59O1xuXG5iYWNrZ3JvdW5kLnByb3RvdHlwZS5yZW5kZXJCYWNrZ3JvdW5kID0gZnVuY3Rpb24gKCkge1xuXG4gICAgKyt0aGlzLnN0ZXA7XG4gICAgaWYgKHRoaXMuc3RlcCA9PSB0aGlzLndpZHRoKSB7XG4gICAgICAgIHRoaXMuc3RlcCA9IDA7XG4gICAgfVxuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMCwgMCwgdGhpcy5zdGVwLCB0aGlzLmhlaWd0aCwgdGhpcy53aWR0aCAtIHRoaXMuc3RlcCwgMCwgdGhpcy5zdGVwLCB0aGlzLmhlaWd0aCk7XG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnN0ZXAsIDAsIHRoaXMud2lkdGggLSB0aGlzLnN0ZXAsIHRoaXMuaGVpZ3RoLCAwLCAwLCB0aGlzLndpZHRoIC0gdGhpcy5zdGVwLCB0aGlzLmhlaWd0aCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhY2tncm91bmQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2JhY2tncm91bmQuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY3JlYXR1cmVzID0gcmVxdWlyZSgnLi9jcmVhdHVyZVRvQ29sbGVjdC5qcycpO1xuXG5mdW5jdGlvbiBjaGVjayhjYW52YXMsIHBsYXllciwgd2FsbHMsIGNvaW5zLCBjaGlrZW5zKSB7XG4gICAgdGhpcy5maWVsZCA9IGNhbnZhcztcbiAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICB0aGlzLndhbGxzID0gd2FsbHM7XG4gICAgdGhpcy5jb2lucyA9IGNvaW5zO1xuICAgIHRoaXMuY2hpa2VucyA9IGNoaWtlbnM7XG4gICAgdGhpcy5waWNrU291bmQgPSBuZXcgQXVkaW8oJy4vbXNjL3NmeF9waWNrLmZsYWMnKTtcbn1cblxuY2hlY2sucHJvdG90eXBlLmNoZWNrSW50ZXJzZWN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB0aGlzLmlmT3V0T2ZGaWVsZCgpIHx8IHRoaXMuaWZXYWxsKCk7XG59XG5cbmNoZWNrLnByb3RvdHlwZS5pZk91dE9mRmllbGQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBpZiAodGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gPCAtMTApIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gPSAtMTA7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBsYXllci5wb3NpdGlvblsxXSA+IDUxMikge1xuICAgICAgICAvLyB0aGlzLnBsYXllci5wb3NpdGlvblsxXSA9IDM1MDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuY2hlY2sucHJvdG90eXBlLmlmV2FsbCA9IGZ1bmN0aW9uIChhcmcpIHtcblxuICAgIGxldCByZXMgPSBmYWxzZTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53YWxscy53YWxsQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMucGxheWVyLnBvc2l0aW9uWzBdICsgdGhpcy5wbGF5ZXIuc3ByaXRlLndpZHRoIC0gMTAgPCB0aGlzLndhbGxzLndhbGxBcnJheVtpXS5wb3NpdGlvblswXSAtIDEwIHx8XG4gICAgICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvblsxXSArIHRoaXMucGxheWVyLnNwcml0ZS5oZWlnaHQgLSAyMCA8IHRoaXMud2FsbHMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzFdIC0gMTAgfHxcbiAgICAgICAgICAgIHRoaXMud2FsbHMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzBdICsgdGhpcy53YWxscy53YWxsQXJyYXlbaV0ud2lkdGggLSAxMCA8IHRoaXMucGxheWVyLnBvc2l0aW9uWzBdICsgMTAgfHxcbiAgICAgICAgICAgIHRoaXMud2FsbHMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzFdICsgdGhpcy53YWxscy53YWxsQXJyYXlbaV0uaGVpZ3RoIC0gMTAgPCB0aGlzLnBsYXllci5wb3NpdGlvblsxXSArIDIwKSB7XG4gICAgICAgICAgICByZXMgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbmNoZWNrLnByb3RvdHlwZS5pZkNyZWF0dXJlVG9Db2xsZWN0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgbGV0IHJlcyA9IGZhbHNlO1xuICAgIGZvciAocHJvcCBpbiB0aGlzKSB7XG5cbiAgICAgICAgaWYgKHRoaXNbcHJvcF0gaW5zdGFuY2VvZiBjcmVhdHVyZXMpIHtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzW3Byb3BdLmNyZWF0dXJlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIucG9zaXRpb25bMF0gKyB0aGlzLnBsYXllci5zcHJpdGUud2lkdGggPCB0aGlzW3Byb3BdLmNyZWF0dXJlQXJyYXlbaV0ucG9zaXRpb25bMF0gKyAxMCB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvblsxXSArIHRoaXMucGxheWVyLnNwcml0ZS5oZWlnaHQgPCB0aGlzW3Byb3BdLmNyZWF0dXJlQXJyYXlbaV0ucG9zaXRpb25bMV0gLSAxMCB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzW3Byb3BdLmNyZWF0dXJlQXJyYXlbaV0ucG9zaXRpb25bMF0gKyAxMCArIHRoaXNbcHJvcF0uY3JlYXR1cmVBcnJheVtpXS5zcHJpdGUud2lkdGggPCB0aGlzLnBsYXllci5wb3NpdGlvblswXSAtIDEwIHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbcHJvcF0uY3JlYXR1cmVBcnJheVtpXS5wb3NpdGlvblsxXSAtIDEwICsgdGhpc1twcm9wXS5jcmVhdHVyZUFycmF5W2ldLnNwcml0ZS53aWR0aCA8IHRoaXMucGxheWVyLnBvc2l0aW9uWzFdIC0gMTApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrU291bmQucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzW3Byb3BdLmNyZWF0dXJlQXJyYXkuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1twcm9wXS50eXBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBwbGF5ZXIoc3ByaXRlLCBwb3NpdGlvbikge1xuXG4gICAgdGhpcy5zcHJpdGUgPSBzcHJpdGU7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMuZ3Jhdml0eSA9IDEwO1xuICAgIHRoaXMuc3BlZWRPZkZhbGxpbmcgPSAwO1xuICAgIHRoaXMuc3RlcCA9IDA7XG5cbiAgICB0aGlzLm9uRmx5ID0gZmFsc2U7XG4gICAgdGhpcy5udW0gPSAxO1xuXG59XG5cbnBsYXllci5wcm90b3R5cGUudXBkYXRlUGxheWVyID0gZnVuY3Rpb24gKGRpZmYpIHtcblxuICAgIHRoaXMuc3BlZWRPZkZhbGxpbmcgPSBNYXRoLnBvdygyICogdGhpcy5ncmF2aXR5ICogdGhpcy5zdGVwLCAxIC8gMik7XG5cbiAgICBpZiAodGhpcy5vbkZseSkge1xuICAgICAgICB0aGlzLnN0ZXAgKz0gMTAwO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWzFdIC09IHRoaXMuc3BlZWRPZkZhbGxpbmcgKiBkaWZmO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnBvc2l0aW9uWzFdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0ZXAgKz0gNjA7XG4gICAgICAgIHRoaXMucG9zaXRpb25bMV0gKz0gdGhpcy5zcGVlZE9mRmFsbGluZyAqIGRpZmY7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucG9zaXRpb25bMV0pO1xuICAgIH1cblxuICAgIHRoaXMuc3ByaXRlLnVwZGF0ZShkaWZmKTtcbn1cblxucGxheWVyLnByb3RvdHlwZS5yZW5kZXJQbGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLnNwcml0ZS5jb250ZXh0LnNhdmUoKTtcbiAgICB0aGlzLnNwcml0ZS5jb250ZXh0LnRyYW5zbGF0ZSgwLCB0aGlzLnBvc2l0aW9uWzFdKTtcbiAgICB0aGlzLnNwcml0ZS5yZW5kZXIodGhpcy5udW0pO1xuICAgIHRoaXMuc3ByaXRlLmNvbnRleHQucmVzdG9yZSgpO1xufVxuXG5wbGF5ZXIucHJvdG90eXBlLmZseSA9IGZ1bmN0aW9uIChhcmcpIHtcblxuICAgIGlmICghdGhpcy5vbkZseSkge1xuICAgICAgICB0aGlzLnN0ZXAgPSAwO1xuICAgICAgICB0aGlzLm51bSA9IDQ7XG4gICAgfSBlbHNlIGlmICghYXJnKSB7XG4gICAgICAgIHRoaXMuc3RlcCA9IDA7XG4gICAgICAgIHRoaXMubnVtID0gMTtcbiAgICB9XG4gICAgdGhpcy5vbkZseSA9IGFyZztcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHBsYXllcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvcGxheWVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIFNwcml0ZShjb250ZXh0LCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgc3BlZWQsIGZyYW1lcykge1xuXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLmZyYW1lcyA9IGZyYW1lcztcbiAgICB0aGlzLmR1cmF0aW9uID0gMDtcblxufTtcblxuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAobnVtKSB7XG5cbiAgICBsZXQgcm91bmRlZER1cmF0aW9uID0gTWF0aC5yb3VuZCh0aGlzLmR1cmF0aW9uKTtcbiAgICBsZXQgZnJhbWUgPSB0aGlzLmZyYW1lc1tyb3VuZGVkRHVyYXRpb24gJSBudW1dO1xuICAgIGxldCB4ID0gZnJhbWUgKiB0aGlzLndpZHRoO1xuICAgIGxldCB5ID0gMDtcblxuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgIHRoaXMuaW1hZ2UsXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIHRoaXMud2lkdGgsXG4gICAgICAgIHRoaXMuaGVpZ2h0LFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICB0aGlzLndpZHRoLFxuICAgICAgICB0aGlzLmhlaWdodCk7XG59O1xuXG5TcHJpdGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkaWZmKSB7XG4gICAgdGhpcy5kdXJhdGlvbiArPSB0aGlzLnNwZWVkICogZGlmZjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3ByaXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9zcHJpdGUuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZ2V0UmFuZG9tSW50ID0gcmVxdWlyZSgnLi9nZXRSYW5kb21JbnQuanMnKTtcblxuZnVuY3Rpb24gd2FsbHMoY29udGV4dCkge1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy53YWxsQXJyYXkgPSBbXTtcbiAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgdGhpcy5pbWFnZS5zcmMgPSAnaW1nL3dhbGwucG5nJztcbiAgICB0aGlzLnNwYWNlSGVpZ3RoID0gMTAwO1xuICAgIHRoaXMud2lkdGhPZldhbGwgPSA1MDtcbiAgICB0aGlzLnRpbWUgPSA3NTtcbn1cblxuZnVuY3Rpb24gd2FsbChwb3MsIHdpZHRoLCBoZWlndGgpIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWd0aCA9IGhlaWd0aDtcbn1cblxud2FsbHMucHJvdG90eXBlLnJlbmRlcldhbGxzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndhbGxBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICAgICAgdGhpcy5pbWFnZSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0ud2lkdGgsXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5oZWlndGgsXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5wb3NpdGlvblswXSxcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzFdLFxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0ud2lkdGgsXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5oZWlndGgpO1xuICAgIH1cbn1cblxud2FsbHMucHJvdG90eXBlLnVwZGF0ZVdhbGxzID0gZnVuY3Rpb24gKGRpZmYpIHtcblxuICAgIHRoaXMudGltZSArPSBNYXRoLnJvdW5kKGRpZmYgKiA2MCk7XG5cbiAgICBpZiAodGhpcy50aW1lICUgMTUwID09IDE0OSkge1xuXG4gICAgICAgIGxldCByYW5kb21TcGFjZVBvc2l0aW9uID0gZ2V0UmFuZG9tSW50KDAsIDEwMCk7XG5cbiAgICAgICAgdGhpcy53YWxsQXJyYXkucHVzaChuZXcgd2FsbChbOTEwLCByYW5kb21TcGFjZVBvc2l0aW9uXSwgdGhpcy53aWR0aE9mV2FsbCwgMTU2KSk7XG4gICAgICAgIHRoaXMud2FsbEFycmF5LnB1c2gobmV3IHdhbGwoWzkxMCwgcmFuZG9tU3BhY2VQb3NpdGlvbiArIGdldFJhbmRvbUludCg4MCwgMTcwKSArIDE1Nl0sIHRoaXMud2lkdGhPZldhbGwsIDE1NikpO1xuICAgIH1cblxuICAgIHRoaXMud2FsbEFycmF5LmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgIHZhbHVlLnBvc2l0aW9uWzBdIC09IDI7XG4gICAgfSk7XG5cbiAgICB0aGlzLndhbGxBcnJheS5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZS5wb3NpdGlvblswXSA8IC0xMDApIHtcbiAgICAgICAgICAgIGFycmF5LnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YWxscztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvd2FsbHMuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgU3ByaXRlID0gcmVxdWlyZSgnLi9zcHJpdGUuanMnKTtcbmNvbnN0IHBsYXllciA9IHJlcXVpcmUoJy4vcGxheWVyLmpzJyk7XG5jb25zdCBiYWNrZ3JvdW5kID0gcmVxdWlyZSgnLi9iYWNrZ3JvdW5kLmpzJyk7XG5jb25zdCB3YWxscyA9IHJlcXVpcmUoJy4vd2FsbHMuanMnKTtcbmNvbnN0IGNoZWNrID0gcmVxdWlyZSgnLi9jaGVjay5qcycpO1xuY29uc3QgY3JlYXR1cmVzID0gcmVxdWlyZSgnLi9jcmVhdHVyZVRvQ29sbGVjdC5qcycpO1xuXG5sZXQgcmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICB9O1xufSkoKTtcblxubGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbmNhbnZhcy53aWR0aCA9IDkwODtcbmNhbnZhcy5oZWlnaHQgPSA1MTI7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbmxldCBwcm9ncmVzc09mVGlyZWRuZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbmxldCBwcm9ncmVzc1N0cmlwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxucHJvZ3Jlc3NPZlRpcmVkbmVzcy5jbGFzc05hbWUgPSAndGlyZWRuZXNzJztcbnByb2dyZXNzU3RyaXBlLnN0eWxlLndpZHRoID0gJzEwMCUnO1xucHJvZ3Jlc3NPZlRpcmVkbmVzcy5hcHBlbmRDaGlsZChwcm9ncmVzc1N0cmlwZSk7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHByb2dyZXNzT2ZUaXJlZG5lc3MpO1xuXG5mdW5jdGlvbiB1cGRhdGVQcm9ncmVzc0JhcigpIHtcblxuICAgIGxldCBjdXJyZW50VGltZSA9IE1hdGguZmxvb3IoZ2FtZVRpbWUpO1xuXG4gICAgaWYgKGN1cnJlbnRUaW1lID4gZ2FtZVRpbWVSZWMpIHtcbiAgICAgICAgZ2FtZVRpbWVSZWMgPSBjdXJyZW50VGltZTtcbiAgICAgICAgbGV0IGN1cnJlbnRQcm9ncmVzID0gcGFyc2VJbnQocHJvZ3Jlc3NTdHJpcGUuc3R5bGUud2lkdGgpO1xuXG4gICAgICAgIGlmIChjdXJyZW50UHJvZ3JlcyA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50UHJvZ3JlcyAtPSAxO1xuICAgICAgICBwcm9ncmVzc1N0cmlwZS5zdHlsZS53aWR0aCA9IGN1cnJlbnRQcm9ncmVzICsgJyUnO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNjb3JlcygpIHtcblxuICAgIGxldCBzY29yZXMgPSBkb2N1bWVudC5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Njb3JlcycpWzBdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdHJvbmcnKTtcbiAgICBsZXQgc2NvcmUgPSBwYXJzZUludChzY29yZXNbMF0uaW5uZXJIVE1MKTtcbiAgICBzY29yZXNbMF0uaW5uZXJIVE1MID0gc2NvcmUgKyAxO1xuXG59XG5cbmZ1bmN0aW9uIHJlbmRlckFsbCgpIHtcblxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgOTA4LCA1MTIpO1xuICAgIGJhY2tncm91bmRJbWFnZS5yZW5kZXJCYWNrZ3JvdW5kKCk7XG4gICAgZHJhZ29uLnJlbmRlclBsYXllcigpO1xuICAgIHdhbGxBcnJheS5yZW5kZXJXYWxscygpO1xuICAgIGNoaWtlbkFycmF5LnJlbmRlckNyZWF0dXJlcygzKTtcbiAgICBjb2luQXJyYXkucmVuZGVyQ3JlYXR1cmVzKDkpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBbGwoZGlmZikge1xuXG4gICAgZHJhZ29uLnVwZGF0ZVBsYXllcihkaWZmKTtcbiAgICB3YWxsQXJyYXkudXBkYXRlV2FsbHMoZGlmZik7XG4gICAgY2hpa2VuQXJyYXkudXBkYXRlQ3JlYXR1cmVzKGRpZmYpO1xuICAgIGNvaW5BcnJheS51cGRhdGVDcmVhdHVyZXMoZGlmZik7XG5cbiAgICBpc1Byb2dyZXNzQmFyRW5kID0gdXBkYXRlUHJvZ3Jlc3NCYXIoKTtcblxuICAgIGlzR2FtZU92ZXIgPSBjaGVja09iai5jaGVja0ludGVyc2VjdGlvbnMoKTtcblxuICAgIGxldCBjb2xsZWN0ZWQgPSBjaGVja09iai5pZkNyZWF0dXJlVG9Db2xsZWN0KCk7XG4gICAgaWYgKGNvbGxlY3RlZCA9PT0gJ2NvaW4nKSB7XG4gICAgICAgIHVwZGF0ZVNjb3JlcygpO1xuICAgIH0gZWxzZSBpZiAoY29sbGVjdGVkID09PSAnY2hpY2tlbicpIHtcbiAgICAgICAgbGV0IHByb2dyZXNzID0gcGFyc2VJbnQocHJvZ3Jlc3NTdHJpcGUuc3R5bGUud2lkdGgpO1xuICAgICAgICBwcm9ncmVzcyArPSAxMDtcbiAgICAgICAgcHJvZ3Jlc3NTdHJpcGUuc3R5bGUud2lkdGggPSBwcm9ncmVzcyArICclJztcbiAgICB9XG59XG5cbi8vbWFpbiBsb29wXG5mdW5jdGlvbiBtYWluKCkge1xuXG4gICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgbGV0IGRpZmYgPSAobm93IC0gbGFzdFRpbWUpIC8gMTAwMDtcbiAgICB1cGRhdGVBbGwoZGlmZik7XG4gICAgcmVuZGVyQWxsKCk7XG4gICAgbGFzdFRpbWUgPSBub3c7XG4gICAgZ2FtZVRpbWUgKz0gZGlmZjtcbiAgICBpZiAoIWlzR2FtZU92ZXIgJiYgIWlzUHJvZ3Jlc3NCYXJFbmQpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1GcmFtZShtYWluKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG11c2ljLnBhdXNlKCk7XG4gICAgICAgIGdhbWVPdmVyKCk7XG4gICAgfVxufVxuXG5sZXQgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xubGV0IGRyYWdvbiwgd2FsbEFycmF5LCBjb2luQXJyYXksIGNoaWtlbkFycmF5LCBiYWNrZ3JvdW5kSW1hZ2UsIGNoZWNrT2JqO1xubGV0IGlzR2FtZU92ZXIgPSBmYWxzZTtcbmxldCBpc1Byb2dyZXNzQmFyRW5kID0gZmFsc2U7XG5sZXQgZ2FtZVRpbWUgPSAwO1xubGV0IGdhbWVUaW1lUmVjID0gMTtcblxuXG5sZXQgbXVzaWMgPSBuZXcgQXVkaW8oJy4vbXNjL0ZseWluZ19zb2Z0bHkubXAzJyk7IFxuXG5cbmZ1bmN0aW9uIGxvYWRDb250ZW50KCkge1xuXG4gICAgY29uc3QgZHJhZ29uSW1nID0gbmV3IEltYWdlKCdpbWcvZHJhZ29uLWZseS5wbmcnKTtcbiAgICBkcmFnb25JbWcuc3JjID0gJ2ltZy9kcmFnb24tZmx5LnBuZyc7XG5cbiAgICBjb25zdCBjb2luSW1nID0gbmV3IEltYWdlKCk7XG4gICAgY29pbkltZy5zcmMgPSAnaW1nL2NvaW4ucG5nJztcblxuICAgIGNvbnN0IGNoaWtlbkltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGNoaWtlbkltZy5zcmMgPSAnaW1nL2NoaWNrZW4ucG5nJztcblxuICAgIGJhY2tncm91bmRJbWFnZSA9IG5ldyBiYWNrZ3JvdW5kKGN0eCk7XG5cbiAgICBkcmFnb24gPSBuZXcgcGxheWVyKG5ldyBTcHJpdGUoY3R4LCA5NCwgNjcsIGRyYWdvbkltZywgMTYsIFswLCAxLCAyLCAzXSksIFswLCAwXSk7XG5cbiAgICB3YWxsQXJyYXkgPSBuZXcgd2FsbHMoY3R4KTtcblxuICAgIGNoaWtlbkFycmF5ID0gbmV3IGNyZWF0dXJlcyhuZXcgU3ByaXRlKGN0eCwgNDUuMzMsIDU1LCBjaGlrZW5JbWcsIDYsIFswLCAxLCAyXSksICdjaGlja2VuJywgNzAwKVxuXG4gICAgY29pbkFycmF5ID0gbmV3IGNyZWF0dXJlcyhuZXcgU3ByaXRlKGN0eCwgNTAsIDUwLCBjb2luSW1nLCA2LCBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOV0pLCAnY29pbicsIDIwMCk7XG5cbiAgICBjaGVja09iaiA9IG5ldyBjaGVjayhjYW52YXMsIGRyYWdvbiwgd2FsbEFycmF5LCBjb2luQXJyYXksIGNoaWtlbkFycmF5KTtcbiAgICAvLyBtdXNpYy5wbGF5KCk7XG4gICAgbWFpbigpO1xufVxuXG4vL2V2ZW50IHdoZW4gZmx5aW5nIHVwXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZHJhZ29uLmZseSh0cnVlKTtcbn0pO1xuXG4vL2V2ZW50IHdoZW4gc3RvcCBmbHlpbmcgdXBcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZHJhZ29uLmZseShmYWxzZSk7XG59KTtcblxuZnVuY3Rpb24gZ2FtZU92ZXIoKSB7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZU92ZXInKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbn1cblxubXVzaWMuYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmN1cnJlbnRUaW1lID0gMDtcbiAgICB0aGlzLnBsYXkoKTtcbn0sIGZhbHNlKTtcblxuXG5cbmxvYWRDb250ZW50KCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=