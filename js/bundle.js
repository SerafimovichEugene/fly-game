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
/***/ (function(module, exports, __webpack_require__) {

getRandomInt = __webpack_require__(1);

function creatures(sprite, type, tiks, speed, width, height) {

    this.sprite = sprite;
    this.creatureArray = [];

    this.width = width;
    this.height = height;

    this.type = type;
    this.speed = speed;
    this.tiks = tiks;
    this.time = 149;
}

function creature(position, sprite, width, height) {

    this.width = width;
    this.height = height;
    
    this.sprite = sprite;
    this.position = position;
}

creatures.prototype.updateCreatures = function (diff) {

    this.time += Math.round(diff * 60);

    if (this.time % this.tiks == (this.tiks - 1)) {
        this.creatureArray.push(new creature([810, getRandomInt(0, 450)], this.sprite, this.width, this.height));
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
                if (this.player.position[0] + this.player.width < this[prop].creatureArray[i].position[0] ||
                    this.player.position[1] - 10 + this.player.height < this[prop].creatureArray[i].position[1] ||
                    this[prop].creatureArray[i].position[0] + this[prop].creatureArray[i].width < this.player.position[0] ||
                    this[prop].creatureArray[i].position[1] + this[prop].creatureArray[i].height < this.player.position[1]  - 10) {
                    res = false;
                } else {
                    console.log(this[prop].creatureArray[i]);
                    console.log(this.player);
                    this.pickSound.play();
                    // this[prop].creatureArray.splice(i, 1);
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDljMGIyMGFhNTc4ODliMDEwMmQiLCJ3ZWJwYWNrOi8vLy4vanMvY3JlYXR1cmVzLmpzIiwid2VicGFjazovLy8uL2pzL2dldFJhbmRvbUludC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9iYWNrZ3JvdW5kLmpzIiwid2VicGFjazovLy8uL2pzL2NoZWNrLmpzIiwid2VicGFjazovLy8uL2pzL3BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9zcHJpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vanMvd2FsbHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7OztBQ3pEQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDbkJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxtQkFBbUIsaUNBQWlDO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLDJCQUEyQixxQ0FBcUM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDdkVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7Ozs7Ozs7QUN0REE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNuQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLDJCQUEyQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOzs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0Esb0Q7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7OztBQUdKIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDljMGIyMGFhNTc4ODliMDEwMmQiLCJnZXRSYW5kb21JbnQgPSByZXF1aXJlKCcuL2dldFJhbmRvbUludC5qcycpO1xuXG5mdW5jdGlvbiBjcmVhdHVyZXMoc3ByaXRlLCB0eXBlLCB0aWtzLCBzcGVlZCwgd2lkdGgsIGhlaWdodCkge1xuXG4gICAgdGhpcy5zcHJpdGUgPSBzcHJpdGU7XG4gICAgdGhpcy5jcmVhdHVyZUFycmF5ID0gW107XG5cbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLnRpa3MgPSB0aWtzO1xuICAgIHRoaXMudGltZSA9IDE0OTtcbn1cblxuZnVuY3Rpb24gY3JlYXR1cmUocG9zaXRpb24sIHNwcml0ZSwgd2lkdGgsIGhlaWdodCkge1xuXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIFxuICAgIHRoaXMuc3ByaXRlID0gc3ByaXRlO1xuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbn1cblxuY3JlYXR1cmVzLnByb3RvdHlwZS51cGRhdGVDcmVhdHVyZXMgPSBmdW5jdGlvbiAoZGlmZikge1xuXG4gICAgdGhpcy50aW1lICs9IE1hdGgucm91bmQoZGlmZiAqIDYwKTtcblxuICAgIGlmICh0aGlzLnRpbWUgJSB0aGlzLnRpa3MgPT0gKHRoaXMudGlrcyAtIDEpKSB7XG4gICAgICAgIHRoaXMuY3JlYXR1cmVBcnJheS5wdXNoKG5ldyBjcmVhdHVyZShbODEwLCBnZXRSYW5kb21JbnQoMCwgNDUwKV0sIHRoaXMuc3ByaXRlLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkpO1xuICAgIH1cblxuICAgIHRoaXMuY3JlYXR1cmVBcnJheS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICB2YWx1ZS5wb3NpdGlvblswXSAtPSB0aGlzLnNwZWVkO1xuICAgICAgICB2YWx1ZS5zcHJpdGUudXBkYXRlKGRpZmYpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jcmVhdHVyZUFycmF5LmZvckVhY2goKHZhbHVlLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlLnBvc2l0aW9uWzBdIDwgLTEwMCkge1xuICAgICAgICAgICAgYXJyYXkuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59XG5cbmNyZWF0dXJlcy5wcm90b3R5cGUucmVuZGVyQ3JlYXR1cmVzID0gZnVuY3Rpb24gKG51bU9mRnJhbWVzKSB7XG5cbiAgICB0aGlzLmNyZWF0dXJlQXJyYXkuZm9yRWFjaCgodmFsdWUsIGluZGV4LCBhcnJheSkgPT4ge1xuXG4gICAgICAgIHZhbHVlLnNwcml0ZS5jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgdmFsdWUuc3ByaXRlLmNvbnRleHQudHJhbnNsYXRlKHZhbHVlLnBvc2l0aW9uWzBdLCB2YWx1ZS5wb3NpdGlvblsxXSk7XG4gICAgICAgIHZhbHVlLnNwcml0ZS5yZW5kZXIobnVtT2ZGcmFtZXMpO1xuICAgICAgICB2YWx1ZS5zcHJpdGUuY29udGV4dC5yZXN0b3JlKCk7XG5cbiAgICB9KTtcbn1cbm1vZHVsZS5leHBvcnRzID0gY3JlYXR1cmVzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jcmVhdHVyZXMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1pbiwgbWF4KSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGdldFJhbmRvbUludDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9nZXRSYW5kb21JbnQuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gYmFja2dyb3VuZChjb250ZXh0KSB7XHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgdGhpcy5pbWFnZS5zcmMgPSAnaW1nL2JhY2tncm91bmQyLnBuZyc7XHJcbiAgICB0aGlzLndpZHRoID0gOTA4O1xyXG4gICAgdGhpcy5oZWlndGggPSA1MTI7XHJcbiAgICB0aGlzLnN0ZXAgPSAwO1xyXG59O1xyXG5cclxuYmFja2dyb3VuZC5wcm90b3R5cGUucmVuZGVyQmFja2dyb3VuZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICArK3RoaXMuc3RlcDtcclxuICAgIGlmICh0aGlzLnN0ZXAgPT0gdGhpcy53aWR0aCkge1xyXG4gICAgICAgIHRoaXMuc3RlcCA9IDA7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDAsIDAsIHRoaXMuc3RlcCwgdGhpcy5oZWlndGgsIHRoaXMud2lkdGggLSB0aGlzLnN0ZXAsIDAsIHRoaXMuc3RlcCwgdGhpcy5oZWlndGgpO1xyXG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnN0ZXAsIDAsIHRoaXMud2lkdGggLSB0aGlzLnN0ZXAsIHRoaXMuaGVpZ3RoLCAwLCAwLCB0aGlzLndpZHRoIC0gdGhpcy5zdGVwLCB0aGlzLmhlaWd0aCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJhY2tncm91bmQ7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvYmFja2dyb3VuZC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjcmVhdHVyZXMgPSByZXF1aXJlKCcuL2NyZWF0dXJlcy5qcycpO1xuXG5mdW5jdGlvbiBjaGVjayhjYW52YXMsIHBsYXllciwgd2FsbHMsIGNvaW5zLCBjaGlrZW5zLCBmaXJlQmFsbHMpIHtcbiAgICB0aGlzLmZpZWxkID0gY2FudmFzO1xuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICAgIHRoaXMud2FsbHMgPSB3YWxscztcbiAgICB0aGlzLmNvaW5zID0gY29pbnM7XG4gICAgdGhpcy5jaGlrZW5zID0gY2hpa2VucztcbiAgICB0aGlzLmZpcmVCYWxscyA9IGZpcmVCYWxscztcbiAgICB0aGlzLnBpY2tTb3VuZCA9IG5ldyBBdWRpbygnLi9tc2Mvc2Z4X3BpY2suZmxhYycpO1xufVxuXG5jaGVjay5wcm90b3R5cGUuY2hlY2tJbnRlcnNlY3Rpb25zID0gZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHRoaXMuaWZPdXRPZkZpZWxkKCkgfHwgdGhpcy5pZldhbGwoKTtcbn1cblxuY2hlY2sucHJvdG90eXBlLmlmT3V0T2ZGaWVsZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGlmICh0aGlzLnBsYXllci5wb3NpdGlvblsxXSA8IC0xMCkge1xuICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvblsxXSA9IC0xMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMucGxheWVyLnBvc2l0aW9uWzFdID4gNTEyKSB7XG4gICAgICAgIC8vIHRoaXMucGxheWVyLnBvc2l0aW9uWzFdID0gMzUwO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5jaGVjay5wcm90b3R5cGUuaWZXYWxsID0gZnVuY3Rpb24gKGFyZykge1xuXG4gICAgbGV0IHJlcyA9IGZhbHNlO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndhbGxzLndhbGxBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIucG9zaXRpb25bMF0gKyB0aGlzLnBsYXllci5zcHJpdGUud2lkdGggLSAxMCA8IHRoaXMud2FsbHMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzBdIC0gMTAgfHxcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc2l0aW9uWzFdICsgdGhpcy5wbGF5ZXIuc3ByaXRlLmhlaWdodCAtIDIwIDwgdGhpcy53YWxscy53YWxsQXJyYXlbaV0ucG9zaXRpb25bMV0gLSAxMCB8fFxuICAgICAgICAgICAgdGhpcy53YWxscy53YWxsQXJyYXlbaV0ucG9zaXRpb25bMF0gKyB0aGlzLndhbGxzLndhbGxBcnJheVtpXS53aWR0aCAtIDEwIDwgdGhpcy5wbGF5ZXIucG9zaXRpb25bMF0gKyAxMCB8fFxuICAgICAgICAgICAgdGhpcy53YWxscy53YWxsQXJyYXlbaV0ucG9zaXRpb25bMV0gKyB0aGlzLndhbGxzLndhbGxBcnJheVtpXS5oZWlndGggLSAxMCA8IHRoaXMucGxheWVyLnBvc2l0aW9uWzFdICsgMjApIHtcbiAgICAgICAgICAgIHJlcyA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuY2hlY2sucHJvdG90eXBlLmlmQ3JlYXR1cmVUb0NvbGxlY3QgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBsZXQgcmVzID0gZmFsc2U7XG4gICAgZm9yIChwcm9wIGluIHRoaXMpIHtcblxuICAgICAgICBpZiAodGhpc1twcm9wXSBpbnN0YW5jZW9mIGNyZWF0dXJlcykge1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXNbcHJvcF0uY3JlYXR1cmVBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci5wb3NpdGlvblswXSArIHRoaXMucGxheWVyLndpZHRoIDwgdGhpc1twcm9wXS5jcmVhdHVyZUFycmF5W2ldLnBvc2l0aW9uWzBdIHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc2l0aW9uWzFdIC0gMTAgKyB0aGlzLnBsYXllci5oZWlnaHQgPCB0aGlzW3Byb3BdLmNyZWF0dXJlQXJyYXlbaV0ucG9zaXRpb25bMV0gfHxcbiAgICAgICAgICAgICAgICAgICAgdGhpc1twcm9wXS5jcmVhdHVyZUFycmF5W2ldLnBvc2l0aW9uWzBdICsgdGhpc1twcm9wXS5jcmVhdHVyZUFycmF5W2ldLndpZHRoIDwgdGhpcy5wbGF5ZXIucG9zaXRpb25bMF0gfHxcbiAgICAgICAgICAgICAgICAgICAgdGhpc1twcm9wXS5jcmVhdHVyZUFycmF5W2ldLnBvc2l0aW9uWzFdICsgdGhpc1twcm9wXS5jcmVhdHVyZUFycmF5W2ldLmhlaWdodCA8IHRoaXMucGxheWVyLnBvc2l0aW9uWzFdICAtIDEwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXNbcHJvcF0uY3JlYXR1cmVBcnJheVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGxheWVyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrU291bmQucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzW3Byb3BdLmNyZWF0dXJlQXJyYXkuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1twcm9wXS50eXBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBwbGF5ZXIoc3ByaXRlLCBwb3NpdGlvbiwgd2lkdGgsIGhlaWdodCkge1xuXG4gICAgdGhpcy5zcHJpdGUgPSBzcHJpdGU7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMuZ3Jhdml0eSA9IDEwO1xuICAgIHRoaXMuc3BlZWRPZkZhbGxpbmcgPSAwO1xuICAgIHRoaXMuc3RlcCA9IDA7XG5cbiAgICB0aGlzLm9uRmx5ID0gZmFsc2U7XG4gICAgdGhpcy5udW0gPSAxO1xuXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG59XG5cbnBsYXllci5wcm90b3R5cGUudXBkYXRlUGxheWVyID0gZnVuY3Rpb24gKGRpZmYpIHtcblxuICAgIHRoaXMuc3BlZWRPZkZhbGxpbmcgPSBNYXRoLnBvdygyICogdGhpcy5ncmF2aXR5ICogdGhpcy5zdGVwLCAxIC8gMik7XG5cbiAgICBpZiAodGhpcy5vbkZseSkge1xuICAgICAgICB0aGlzLnN0ZXAgKz0gMTAwO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWzFdIC09IHRoaXMuc3BlZWRPZkZhbGxpbmcgKiBkaWZmO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnBvc2l0aW9uWzFdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0ZXAgKz0gNjA7XG4gICAgICAgIHRoaXMucG9zaXRpb25bMV0gKz0gdGhpcy5zcGVlZE9mRmFsbGluZyAqIGRpZmY7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucG9zaXRpb25bMV0pO1xuICAgIH1cblxuICAgIHRoaXMuc3ByaXRlLnVwZGF0ZShkaWZmKTtcbn1cblxucGxheWVyLnByb3RvdHlwZS5yZW5kZXJQbGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLnNwcml0ZS5jb250ZXh0LnNhdmUoKTtcbiAgICB0aGlzLnNwcml0ZS5jb250ZXh0LnRyYW5zbGF0ZSgwLCB0aGlzLnBvc2l0aW9uWzFdKTtcbiAgICB0aGlzLnNwcml0ZS5yZW5kZXIodGhpcy5udW0pO1xuICAgIHRoaXMuc3ByaXRlLmNvbnRleHQucmVzdG9yZSgpO1xufVxuXG5wbGF5ZXIucHJvdG90eXBlLmZseSA9IGZ1bmN0aW9uIChhcmcpIHtcblxuICAgIGlmICghdGhpcy5vbkZseSkge1xuICAgICAgICB0aGlzLnN0ZXAgPSAwO1xuICAgICAgICB0aGlzLm51bSA9IDQ7XG4gICAgfSBlbHNlIGlmICghYXJnKSB7XG4gICAgICAgIHRoaXMuc3RlcCA9IDA7XG4gICAgICAgIHRoaXMubnVtID0gMTtcbiAgICB9XG4gICAgdGhpcy5vbkZseSA9IGFyZztcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHBsYXllcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvcGxheWVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIFNwcml0ZShjb250ZXh0LCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgc3BlZWQsIGZyYW1lcykge1xyXG5cclxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcclxuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuICAgIHRoaXMuZnJhbWVzID0gZnJhbWVzO1xyXG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7XHJcblxyXG59O1xyXG5cclxuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAobnVtKSB7XHJcblxyXG4gICAgbGV0IHJvdW5kZWREdXJhdGlvbiA9IE1hdGgucm91bmQodGhpcy5kdXJhdGlvbik7XHJcbiAgICBsZXQgZnJhbWUgPSB0aGlzLmZyYW1lc1tyb3VuZGVkRHVyYXRpb24gJSBudW1dO1xyXG4gICAgbGV0IHggPSBmcmFtZSAqIHRoaXMud2lkdGg7XHJcbiAgICBsZXQgeSA9IDA7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICB0aGlzLmltYWdlLFxyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeSxcclxuICAgICAgICB0aGlzLndpZHRoLFxyXG4gICAgICAgIHRoaXMuaGVpZ2h0LFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgMCxcclxuICAgICAgICB0aGlzLndpZHRoLFxyXG4gICAgICAgIHRoaXMuaGVpZ2h0KTtcclxufTtcclxuXHJcblNwcml0ZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRpZmYpIHtcclxuICAgIHRoaXMuZHVyYXRpb24gKz0gdGhpcy5zcGVlZCAqIGRpZmY7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNwcml0ZTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9zcHJpdGUuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZ2V0UmFuZG9tSW50ID0gcmVxdWlyZSgnLi9nZXRSYW5kb21JbnQuanMnKTtcblxuZnVuY3Rpb24gd2FsbHMoY29udGV4dCkge1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy53YWxsQXJyYXkgPSBbXTtcbiAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgdGhpcy5pbWFnZS5zcmMgPSAnaW1nL3dhbGwucG5nJztcbiAgICB0aGlzLnNwYWNlSGVpZ3RoID0gMTAwO1xuICAgIHRoaXMud2lkdGhPZldhbGwgPSA1MDtcbiAgICB0aGlzLnRpbWUgPSA3NTtcbn1cblxuZnVuY3Rpb24gd2FsbChwb3MsIHdpZHRoLCBoZWlndGgpIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWd0aCA9IGhlaWd0aDtcbn1cblxud2FsbHMucHJvdG90eXBlLnJlbmRlcldhbGxzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndhbGxBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICAgICAgdGhpcy5pbWFnZSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0ud2lkdGgsXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5oZWlndGgsXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5wb3NpdGlvblswXSxcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzFdLFxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0ud2lkdGgsXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5oZWlndGgpO1xuICAgIH1cbn1cblxud2FsbHMucHJvdG90eXBlLnVwZGF0ZVdhbGxzID0gZnVuY3Rpb24gKGRpZmYpIHtcblxuICAgIHRoaXMudGltZSArPSBNYXRoLnJvdW5kKGRpZmYgKiA2MCk7XG5cbiAgICBpZiAodGhpcy50aW1lICUgMTUwID09IDE0OSkge1xuXG4gICAgICAgIGxldCByYW5kb21TcGFjZVBvc2l0aW9uID0gZ2V0UmFuZG9tSW50KDAsIDEwMCk7XG5cbiAgICAgICAgdGhpcy53YWxsQXJyYXkucHVzaChuZXcgd2FsbChbOTEwLCByYW5kb21TcGFjZVBvc2l0aW9uXSwgdGhpcy53aWR0aE9mV2FsbCwgMTU2KSk7XG4gICAgICAgIHRoaXMud2FsbEFycmF5LnB1c2gobmV3IHdhbGwoWzkxMCwgcmFuZG9tU3BhY2VQb3NpdGlvbiArIGdldFJhbmRvbUludCgxMDAsIDE3MCkgKyAxNTZdLCB0aGlzLndpZHRoT2ZXYWxsLCAxNTYpKTtcbiAgICB9XG5cbiAgICB0aGlzLndhbGxBcnJheS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICB2YWx1ZS5wb3NpdGlvblswXSAtPSAyO1xuICAgIH0pO1xuXG4gICAgdGhpcy53YWxsQXJyYXkuZm9yRWFjaCgodmFsdWUsIGluZGV4LCBhcnJheSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUucG9zaXRpb25bMF0gPCAtMTAwKSB7XG4gICAgICAgICAgICBhcnJheS5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FsbHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL3dhbGxzLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFNwcml0ZSA9IHJlcXVpcmUoJy4vc3ByaXRlLmpzJyk7XG5jb25zdCBwbGF5ZXIgPSByZXF1aXJlKCcuL3BsYXllci5qcycpO1xuY29uc3QgYmFja2dyb3VuZCA9IHJlcXVpcmUoJy4vYmFja2dyb3VuZC5qcycpO1xuY29uc3Qgd2FsbHMgPSByZXF1aXJlKCcuL3dhbGxzLmpzJyk7XG5jb25zdCBjaGVjayA9IHJlcXVpcmUoJy4vY2hlY2suanMnKTtcbmNvbnN0IGNyZWF0dXJlcyA9IHJlcXVpcmUoJy4vY3JlYXR1cmVzLmpzJyk7XG5cbmxldCByZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgICAgIH07XG59KSgpO1xuXG5sZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbmxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuY2FudmFzLndpZHRoID0gOTA4O1xuY2FudmFzLmhlaWdodCA9IDUxMjtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxubGV0IHByb2dyZXNzT2ZUaXJlZG5lc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxubGV0IHByb2dyZXNzU3RyaXBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG5wcm9ncmVzc09mVGlyZWRuZXNzLmNsYXNzTmFtZSA9ICd0aXJlZG5lc3MnO1xucHJvZ3Jlc3NTdHJpcGUuc3R5bGUud2lkdGggPSAnMTAwJSc7XG5wcm9ncmVzc09mVGlyZWRuZXNzLmFwcGVuZENoaWxkKHByb2dyZXNzU3RyaXBlKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocHJvZ3Jlc3NPZlRpcmVkbmVzcyk7XG5cbmZ1bmN0aW9uIHVwZGF0ZVByb2dyZXNzQmFyKCkge1xuXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gTWF0aC5mbG9vcihnYW1lVGltZSk7XG5cbiAgICBpZiAoY3VycmVudFRpbWUgPiBnYW1lVGltZVJlYykge1xuICAgICAgICBnYW1lVGltZVJlYyA9IGN1cnJlbnRUaW1lO1xuICAgICAgICBsZXQgY3VycmVudFByb2dyZXMgPSBwYXJzZUludChwcm9ncmVzc1N0cmlwZS5zdHlsZS53aWR0aCk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRQcm9ncmVzID09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRQcm9ncmVzIC09IDE7XG4gICAgICAgIHByb2dyZXNzU3RyaXBlLnN0eWxlLndpZHRoID0gY3VycmVudFByb2dyZXMgKyAnJSc7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU2NvcmVzKCkge1xuXG4gICAgbGV0IHNjb3JlcyA9IGRvY3VtZW50LmJvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2NvcmVzJylbMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0cm9uZycpO1xuICAgIGxldCBzY29yZSA9IHBhcnNlSW50KHNjb3Jlc1swXS5pbm5lckhUTUwpO1xuICAgIHNjb3Jlc1swXS5pbm5lckhUTUwgPSBzY29yZSArIDE7XG5cbn1cblxuZnVuY3Rpb24gcmVuZGVyQWxsKCkge1xuXG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCA5MDgsIDUxMik7XG4gICAgYmFja2dyb3VuZEltYWdlLnJlbmRlckJhY2tncm91bmQoKTtcbiAgICBkcmFnb24ucmVuZGVyUGxheWVyKCk7XG4gICAgd2FsbEFycmF5LnJlbmRlcldhbGxzKCk7XG4gICAgY2hpa2VuQXJyYXkucmVuZGVyQ3JlYXR1cmVzKDMpO1xuICAgIGNvaW5BcnJheS5yZW5kZXJDcmVhdHVyZXMoOSk7XG4gICAgZmlyZUJhbGxBcnJheS5yZW5kZXJDcmVhdHVyZXMoNik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUFsbChkaWZmKSB7XG5cbiAgICBkcmFnb24udXBkYXRlUGxheWVyKGRpZmYpO1xuICAgIHdhbGxBcnJheS51cGRhdGVXYWxscyhkaWZmKTtcbiAgICBjaGlrZW5BcnJheS51cGRhdGVDcmVhdHVyZXMoZGlmZik7XG4gICAgY29pbkFycmF5LnVwZGF0ZUNyZWF0dXJlcyhkaWZmKTtcbiAgICBmaXJlQmFsbEFycmF5LnVwZGF0ZUNyZWF0dXJlcyhkaWZmKTtcblxuICAgIGlzUHJvZ3Jlc3NCYXJFbmQgPSB1cGRhdGVQcm9ncmVzc0JhcigpO1xuXG4gICAgaXNHYW1lT3ZlciA9IGNoZWNrT2JqLmNoZWNrSW50ZXJzZWN0aW9ucygpO1xuXG4gICAgbGV0IGNvbGxlY3RlZCA9IGNoZWNrT2JqLmlmQ3JlYXR1cmVUb0NvbGxlY3QoKTtcbiAgICBpZiAoY29sbGVjdGVkID09ICdjb2luJykge1xuICAgICAgICB1cGRhdGVTY29yZXMoKTtcbiAgICB9IGVsc2UgaWYgKGNvbGxlY3RlZCA9PSAnY2hpY2tlbicpIHtcbiAgICAgICAgbGV0IHByb2dyZXNzID0gcGFyc2VJbnQocHJvZ3Jlc3NTdHJpcGUuc3R5bGUud2lkdGgpO1xuICAgICAgICBwcm9ncmVzcyArPSAxMDtcbiAgICAgICAgcHJvZ3Jlc3NTdHJpcGUuc3R5bGUud2lkdGggPSBwcm9ncmVzcyArICclJztcbiAgICAgICAgY29uc29sZS5sb2coY29sbGVjdGVkKTtcbiAgICB9XG4gICAgZWxzZSBpZihjb2xsZWN0ZWQgPT0gJ2ZpcmUnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvbGxlY3RlZCk7XG4gICAgICAgIGdhbWVPdmVyKCk7XG4gICAgfVxufVxuXG4vL21haW4gbG9vcFxuZnVuY3Rpb24gbWFpbigpIHtcblxuICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGxldCBkaWZmID0gKG5vdyAtIGxhc3RUaW1lKSAvIDEwMDA7XG4gICAgdXBkYXRlQWxsKGRpZmYpO1xuICAgIHJlbmRlckFsbCgpO1xuICAgIGxhc3RUaW1lID0gbm93O1xuICAgIGdhbWVUaW1lICs9IGRpZmY7XG4gICAgaWYgKCFpc0dhbWVPdmVyICYmICFpc1Byb2dyZXNzQmFyRW5kKSB7XG4gICAgICAgIHJlcXVlc3RBbmltRnJhbWUobWFpbik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBtdXNpYy5wYXVzZSgpO1xuICAgICAgICBnYW1lT3ZlcigpO1xuICAgIH1cbn1cblxubGV0IGxhc3RUaW1lID0gRGF0ZS5ub3coKTtcbmxldCBkcmFnb24sIHdhbGxBcnJheSwgY29pbkFycmF5LCBjaGlrZW5BcnJheSwgYmFja2dyb3VuZEltYWdlLCBmaXJlQmFsbEFycmF5LCBjaGVja09iajtcbmxldCBpc0dhbWVPdmVyID0gZmFsc2U7XG5sZXQgaXNQcm9ncmVzc0JhckVuZCA9IGZhbHNlO1xubGV0IGdhbWVUaW1lID0gMDtcbmxldCBnYW1lVGltZVJlYyA9IDE7XG5cblxuLy8gbGV0IG11c2ljID0gbmV3IEF1ZGlvKCcuL21zYy9GbHlpbmdfc29mdGx5Lm1wMycpOyBcblxuXG5mdW5jdGlvbiBsb2FkQ29udGVudCgpIHtcblxuICAgIGNvbnN0IGRyYWdvbkltZyA9IG5ldyBJbWFnZSgnaW1nL2RyYWdvbi1mbHkucG5nJyk7XG4gICAgZHJhZ29uSW1nLnNyYyA9ICdpbWcvZHJhZ29uLWZseS5wbmcnO1xuXG4gICAgY29uc3QgY29pbkltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGNvaW5JbWcuc3JjID0gJ2ltZy9jb2luLnBuZyc7XG5cbiAgICBjb25zdCBjaGlrZW5JbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBjaGlrZW5JbWcuc3JjID0gJ2ltZy9jaGlja2VuLnBuZyc7XG5cbiAgICBjb25zdCBmaXJlQmFsbEltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGZpcmVCYWxsSW1nLnNyYyA9ICdpbWcvZmlyZUJhbGwucG5nJztcblxuICAgIGJhY2tncm91bmRJbWFnZSA9IG5ldyBiYWNrZ3JvdW5kKGN0eCk7XG5cbiAgICBkcmFnb24gPSBuZXcgcGxheWVyKG5ldyBTcHJpdGUoY3R4LCA5NCwgNjcsIGRyYWdvbkltZywgMTYsIFswLCAxLCAyLCAzXSksIFswLCAwXSwgNjAsIDQwKTtcblxuICAgIHdhbGxBcnJheSA9IG5ldyB3YWxscyhjdHgpO1xuXG4gICAgY2hpa2VuQXJyYXkgPSBuZXcgY3JlYXR1cmVzKG5ldyBTcHJpdGUoY3R4LCA0NS4zMywgNTUsIGNoaWtlbkltZywgNiwgWzAsIDEsIDJdKSwgJ2NoaWNrZW4nLCA3MDAsIDIsIDQwLCA0MClcblxuICAgIGNvaW5BcnJheSA9IG5ldyBjcmVhdHVyZXMobmV3IFNwcml0ZShjdHgsIDUwLCA1MCwgY29pbkltZywgNiwgWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDldKSwgJ2NvaW4nLCAyMDAsIDIsIDQwLCA0MCk7XG5cbiAgICBmaXJlQmFsbEFycmF5ID0gbmV3IGNyZWF0dXJlcyhuZXcgU3ByaXRlKGN0eCwgMTQzLCA1NSwgZmlyZUJhbGxJbWcsIDYsIFswLCAxLCAyLCAzLCA0LCA1XSksICdmaXJlJywgMTAwLCA1LCAyNSwgMjUpO1xuXG4gICAgY2hlY2tPYmogPSBuZXcgY2hlY2soY2FudmFzLCBkcmFnb24sIHdhbGxBcnJheSwgY29pbkFycmF5LCBjaGlrZW5BcnJheSwgZmlyZUJhbGxBcnJheSk7XG4gICAgLy8gbXVzaWMucGxheSgpO1xuICAgIG1haW4oKTtcbn1cblxuLy9ldmVudCB3aGVuIGZseWluZyB1cFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGRyYWdvbi5mbHkodHJ1ZSk7XG59KTtcblxuLy9ldmVudCB3aGVuIHN0b3AgZmx5aW5nIHVwXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGRyYWdvbi5mbHkoZmFsc2UpO1xufSk7XG5cbmZ1bmN0aW9uIGdhbWVPdmVyKCkge1xuICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lT3ZlcicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufVxuXG4vLyBtdXNpYy5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGZ1bmN0aW9uKCkge1xuLy8gICAgIHRoaXMuY3VycmVudFRpbWUgPSAwO1xuLy8gICAgIHRoaXMucGxheSgpO1xuLy8gfSwgZmFsc2UpO1xuXG5cbmxvYWRDb250ZW50KCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=