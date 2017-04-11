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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function background (context) {
    this.context = context;
    this.image = new Image();
    this.image.src = 'img/background1.png';
    this.width = 800;
    this.heigth = 400;
    this.step = 0;
};

background.prototype.renderBackground = function() {    

    ++this.step;
    if(this.step == 800) {
       this.step = 0; 
    }
    this.context.drawImage(this.image, 0, 0, this.step, 400, this.width-this.step, 0,this.step, 400);
    this.context.drawImage(this.image, this.step, 0, this.width-this.step, 400, 0, 0, this.width-this.step, 400);
};

module.exports = background;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function check(player, walls, coins, canvas) {
    this.player = player;
    this.walls = walls;
    this.coins = coins;
    this.field = canvas;
}

check.prototype.checkIntersections = function(){

    return this.ifOutOfField() || this.ifWall();
}

check.prototype.ifOutOfField = function() {

    if(this.player.position[1]< -10) {
        this.player.position[1] = -10;
    }
    else if(this.player.position[1] > 350) {
        this.player.position[1] = 350;
        return true;
    }
    return false;
}

check.prototype.ifWall = function(arg) {

    let res = false;

    for(let i = 0; i < this.walls.wallArray.length; i++) {
        if(this.player.position[0] + this.player.sprite.width - 10 < this.walls.wallArray[i].position[0] - 10 ||
           this.player.position[1] + this.player.sprite.height - 20 < this.walls.wallArray[i].position[1] - 10 ||
           this.walls.wallArray[i].position[0] + this.walls.wallArray[i].width -10 < this.player.position[0] + 10 ||
           this.walls.wallArray[i].position[1] + this.walls.wallArray[i].heigth - 10 < this.player.position[1] + 20) {
               res =  false;
           }
        else {
            return true;
        }
    }
    return res;
}

check.prototype.ifCoin = function() {

    let res = false;

    for(let i = 0; i < this.coins.coinArray.length; i++) {
        if(this.player.position[0] + this.player.sprite.width < this.coins.coinArray[i].position[0] + 10 ||
           this.player.position[1] + this.player.sprite.height < this.coins.coinArray[i].position[1] - 10 ||
           this.coins.coinArray[i].position[0] + 10 + this.coins.coinArray[i].sprite.width < this.player.position[0] - 10 ||
           this.coins.coinArray[i].position[1] - 10  + this.coins.coinArray[i].sprite.width < this.player.position[1] - 10 ) {
               res =  false;
           }
        else {
            this.coins.coinArray.splice(i, 1);
            return true;
        }
    }
    return res;
}

module.exports = check;


/***/ }),
/* 2 */
/***/ (function(module, exports) {


function coins(sprite) {

    this.sprite = sprite;
    this.coinArray = [];
}

function coin(position, sprite) {
    this.sprite = sprite;
    this.position = position;
}

let time = 148;

coins.prototype.updateCoins = function(diff) {

    time += Math.round(diff * 60);

    // console.log(this.coinArray);

    if(time % 150 == 149) {     

        this.coinArray.push(new coin([810, 100], this.sprite));
    }

    this.coinArray.forEach((value) => {
        value.position[0] -= 2;
        value.sprite.update(diff);        
    });
    
    this.coinArray.forEach((value, index, array)=>{
        if(value.position[0] < -100) {
            array.shift();
        }
    });
    
}

coins.prototype.renderCoins = function () {

    this.coinArray.forEach((value, index, array)=>{

        value.sprite.context.save();
        value.sprite.context.translate(value.position[0], value.position[1]);    
        value.sprite.render(9);
        value.sprite.context.restore();

    });     
}
module.exports = coins;


/***/ }),
/* 3 */
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

player.prototype.updatePlayer = function(diff) {

    this.speedOfFalling = Math.pow(2 * this.gravity * this.step, 1/2);

    if(this.onFly) {
        this.step += 100;
        this.position[1] -= this.speedOfFalling * diff;
        // console.log(this.position[1]);
    }
    else {
        this.step += 60;
        this.position[1] += this.speedOfFalling * diff;
        // console.log(this.position[1]);
    } 
    
    this.sprite.update(diff);
}

player.prototype.renderPlayer = function() {

    this.sprite.context.save();
    this.sprite.context.translate(0, this.position[1]);    
    this.sprite.render(this.num);    
    this.sprite.context.restore();    
}

player.prototype.fly = function(arg) {
    
    if(!this.onFly) {
        this.step = 0;
        this.num = 4;            
    }
    else if(!arg) {
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

Sprite.prototype.render = function(num) {   

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

Sprite.prototype.update = function(diff) {    
    this.duration += this.speed * diff;        
};

module.exports = Sprite;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

function walls (context) {
    this.context = context;
    this.wallArray = [];
    this.image = new Image();
    this.image.src = 'img/wall.png';
    this.spaceHeigth = 150;
    this.widthOfWall = 50; 
}

function wall (pos, width, heigth) {
    this.position = pos;
    this.width = width;
    this.heigth = heigth;
}

walls.prototype.renderWalls = function() {     

    for(let i = 0; i < this.wallArray.length; i++) {
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

let time = 75;

walls.prototype.updateWalls = function(diff) {

    time += Math.round(diff * 60);

    if(time % 150 == 149){

        let randomSpacePosition = getRandomInt(0, 300);
        
        this.wallArray.push(new wall([810, 0], this.widthOfWall, randomSpacePosition));
        this.wallArray.push(new wall([810, randomSpacePosition + this.spaceHeigth], this.widthOfWall, 400 - randomSpacePosition - this.spaceHeigth));
    }

    this.wallArray.forEach((value) => {
        value.position[0] -= 2;        
    });

    this.wallArray.forEach((value, index, array)=>{
        if(value.position[0] < -100) {
            array.shift();
        }
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = walls;




/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Sprite = __webpack_require__(4);
const player = __webpack_require__(3);
const background = __webpack_require__(0);
const walls = __webpack_require__(5);
const check = __webpack_require__(1);
const coins = __webpack_require__(2);

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

        // console.log(currentProgres);

        currentProgres -=1; 
        progressStripe.style.width = currentProgres + '%';
    }
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
    coinArray.renderCoins();
}

function updateAll(diff) {
    
    dragon.updatePlayer(diff);
    wallArray.updateWalls(diff);
    coinArray.updateCoins(diff);

    updateProgressBar();

    IsGameOver = checkObj.checkIntersections();

    if(checkObj.ifCoin()) {
        updateScores();
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
    if(!IsGameOver) {
        requestAnimFrame(main);
    }
    
}

let lastTime = Date.now();
let dragon, wallArray, coinArray, backgroundImage, checkObj;
let IsGameOver = false;
let gameTime = 0;
let gameTimeRec = 1;

function loadContent() {

    const dragonImg = new Image();
    dragonImg.src = 'img/dragon-fly.png';

    const coinImg = new Image();
    coinImg.src = 'img/coin-sprite-animation.png';
    
    backgroundImage = new background(ctx);

    dragon = new player(new Sprite(ctx, 94, 67, dragonImg, 16, [0,1,2,3]), [0, 0]);

    wallArray = new walls(ctx);

    coinArray = new coins(new Sprite(ctx, 50, 50, coinImg, 8, [0,1,2,3,4,5,6,7,8,9]));

    checkObj = new check(dragon, wallArray, coinArray, canvas);

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






/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzUzOTE1ODkwMWRhYWYwNjgzNjQiLCJ3ZWJwYWNrOi8vLy4vanMvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb2lucy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvc3ByaXRlLmpzIiwid2VicGFjazovLy8uL2pzL3dhbGxzLmpzIiwid2VicGFjazovLy8uL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0Q7O0FBRUE7QUFDQTtBQUNBLHFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLGtCQUFrQixpQ0FBaUM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLGtCQUFrQixpQ0FBaUM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDNURBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSwyQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQztBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsNkU7QUFDQTtBQUNBOztBQUVBLEtBQUssRTtBQUNMO0FBQ0E7Ozs7Ozs7QUNqREE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEs7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHVEO0FBQ0EsaUM7QUFDQSxrQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQjtBQUNBOzs7QUFHQTs7Ozs7OztBQ3JEQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QjtBQUNBO0FBQ0E7QUFDQSxzQjs7QUFFQTs7QUFFQSx5Qzs7QUFFQTtBQUNBO0FBQ0EsK0I7QUFDQSxjOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEM7QUFDQSx1QztBQUNBOztBQUVBOzs7Ozs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQzs7QUFFQSxrQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQjtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsMkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw4QztBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDc1MzkxNTg5MDFkYWFmMDY4MzY0IiwiZnVuY3Rpb24gYmFja2dyb3VuZCAoY29udGV4dCkge1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIHRoaXMuaW1hZ2Uuc3JjID0gJ2ltZy9iYWNrZ3JvdW5kMS5wbmcnO1xuICAgIHRoaXMud2lkdGggPSA4MDA7XG4gICAgdGhpcy5oZWlndGggPSA0MDA7XG4gICAgdGhpcy5zdGVwID0gMDtcbn07XG5cbmJhY2tncm91bmQucHJvdG90eXBlLnJlbmRlckJhY2tncm91bmQgPSBmdW5jdGlvbigpIHsgICAgXG5cbiAgICArK3RoaXMuc3RlcDtcbiAgICBpZih0aGlzLnN0ZXAgPT0gODAwKSB7XG4gICAgICAgdGhpcy5zdGVwID0gMDsgXG4gICAgfVxuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMCwgMCwgdGhpcy5zdGVwLCA0MDAsIHRoaXMud2lkdGgtdGhpcy5zdGVwLCAwLHRoaXMuc3RlcCwgNDAwKTtcbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMuc3RlcCwgMCwgdGhpcy53aWR0aC10aGlzLnN0ZXAsIDQwMCwgMCwgMCwgdGhpcy53aWR0aC10aGlzLnN0ZXAsIDQwMCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhY2tncm91bmQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2JhY2tncm91bmQuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gY2hlY2socGxheWVyLCB3YWxscywgY29pbnMsIGNhbnZhcykge1xuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICAgIHRoaXMud2FsbHMgPSB3YWxscztcbiAgICB0aGlzLmNvaW5zID0gY29pbnM7XG4gICAgdGhpcy5maWVsZCA9IGNhbnZhcztcbn1cblxuY2hlY2sucHJvdG90eXBlLmNoZWNrSW50ZXJzZWN0aW9ucyA9IGZ1bmN0aW9uKCl7XG5cbiAgICByZXR1cm4gdGhpcy5pZk91dE9mRmllbGQoKSB8fCB0aGlzLmlmV2FsbCgpO1xufVxuXG5jaGVjay5wcm90b3R5cGUuaWZPdXRPZkZpZWxkID0gZnVuY3Rpb24oKSB7XG5cbiAgICBpZih0aGlzLnBsYXllci5wb3NpdGlvblsxXTwgLTEwKSB7XG4gICAgICAgIHRoaXMucGxheWVyLnBvc2l0aW9uWzFdID0gLTEwO1xuICAgIH1cbiAgICBlbHNlIGlmKHRoaXMucGxheWVyLnBvc2l0aW9uWzFdID4gMzUwKSB7XG4gICAgICAgIHRoaXMucGxheWVyLnBvc2l0aW9uWzFdID0gMzUwO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5jaGVjay5wcm90b3R5cGUuaWZXYWxsID0gZnVuY3Rpb24oYXJnKSB7XG5cbiAgICBsZXQgcmVzID0gZmFsc2U7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53YWxscy53YWxsQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYodGhpcy5wbGF5ZXIucG9zaXRpb25bMF0gKyB0aGlzLnBsYXllci5zcHJpdGUud2lkdGggLSAxMCA8IHRoaXMud2FsbHMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzBdIC0gMTAgfHxcbiAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gKyB0aGlzLnBsYXllci5zcHJpdGUuaGVpZ2h0IC0gMjAgPCB0aGlzLndhbGxzLndhbGxBcnJheVtpXS5wb3NpdGlvblsxXSAtIDEwIHx8XG4gICAgICAgICAgIHRoaXMud2FsbHMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzBdICsgdGhpcy53YWxscy53YWxsQXJyYXlbaV0ud2lkdGggLTEwIDwgdGhpcy5wbGF5ZXIucG9zaXRpb25bMF0gKyAxMCB8fFxuICAgICAgICAgICB0aGlzLndhbGxzLndhbGxBcnJheVtpXS5wb3NpdGlvblsxXSArIHRoaXMud2FsbHMud2FsbEFycmF5W2ldLmhlaWd0aCAtIDEwIDwgdGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gKyAyMCkge1xuICAgICAgICAgICAgICAgcmVzID0gIGZhbHNlO1xuICAgICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuY2hlY2sucHJvdG90eXBlLmlmQ29pbiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IHJlcyA9IGZhbHNlO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY29pbnMuY29pbkFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKHRoaXMucGxheWVyLnBvc2l0aW9uWzBdICsgdGhpcy5wbGF5ZXIuc3ByaXRlLndpZHRoIDwgdGhpcy5jb2lucy5jb2luQXJyYXlbaV0ucG9zaXRpb25bMF0gKyAxMCB8fFxuICAgICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvblsxXSArIHRoaXMucGxheWVyLnNwcml0ZS5oZWlnaHQgPCB0aGlzLmNvaW5zLmNvaW5BcnJheVtpXS5wb3NpdGlvblsxXSAtIDEwIHx8XG4gICAgICAgICAgIHRoaXMuY29pbnMuY29pbkFycmF5W2ldLnBvc2l0aW9uWzBdICsgMTAgKyB0aGlzLmNvaW5zLmNvaW5BcnJheVtpXS5zcHJpdGUud2lkdGggPCB0aGlzLnBsYXllci5wb3NpdGlvblswXSAtIDEwIHx8XG4gICAgICAgICAgIHRoaXMuY29pbnMuY29pbkFycmF5W2ldLnBvc2l0aW9uWzFdIC0gMTAgICsgdGhpcy5jb2lucy5jb2luQXJyYXlbaV0uc3ByaXRlLndpZHRoIDwgdGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gLSAxMCApIHtcbiAgICAgICAgICAgICAgIHJlcyA9ICBmYWxzZTtcbiAgICAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29pbnMuY29pbkFycmF5LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2s7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NoZWNrLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuZnVuY3Rpb24gY29pbnMoc3ByaXRlKSB7XG5cbiAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZTtcbiAgICB0aGlzLmNvaW5BcnJheSA9IFtdO1xufVxuXG5mdW5jdGlvbiBjb2luKHBvc2l0aW9uLCBzcHJpdGUpIHtcbiAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZTtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG59XG5cbmxldCB0aW1lID0gMTQ4O1xuXG5jb2lucy5wcm90b3R5cGUudXBkYXRlQ29pbnMgPSBmdW5jdGlvbihkaWZmKSB7XG5cbiAgICB0aW1lICs9IE1hdGgucm91bmQoZGlmZiAqIDYwKTtcblxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY29pbkFycmF5KTtcblxuICAgIGlmKHRpbWUgJSAxNTAgPT0gMTQ5KSB7ICAgICBcblxuICAgICAgICB0aGlzLmNvaW5BcnJheS5wdXNoKG5ldyBjb2luKFs4MTAsIDEwMF0sIHRoaXMuc3ByaXRlKSk7XG4gICAgfVxuXG4gICAgdGhpcy5jb2luQXJyYXkuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgdmFsdWUucG9zaXRpb25bMF0gLT0gMjtcbiAgICAgICAgdmFsdWUuc3ByaXRlLnVwZGF0ZShkaWZmKTsgICAgICAgIFxuICAgIH0pO1xuICAgIFxuICAgIHRoaXMuY29pbkFycmF5LmZvckVhY2goKHZhbHVlLCBpbmRleCwgYXJyYXkpPT57XG4gICAgICAgIGlmKHZhbHVlLnBvc2l0aW9uWzBdIDwgLTEwMCkge1xuICAgICAgICAgICAgYXJyYXkuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxufVxuXG5jb2lucy5wcm90b3R5cGUucmVuZGVyQ29pbnMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLmNvaW5BcnJheS5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgsIGFycmF5KT0+e1xuXG4gICAgICAgIHZhbHVlLnNwcml0ZS5jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgdmFsdWUuc3ByaXRlLmNvbnRleHQudHJhbnNsYXRlKHZhbHVlLnBvc2l0aW9uWzBdLCB2YWx1ZS5wb3NpdGlvblsxXSk7ICAgIFxuICAgICAgICB2YWx1ZS5zcHJpdGUucmVuZGVyKDkpO1xuICAgICAgICB2YWx1ZS5zcHJpdGUuY29udGV4dC5yZXN0b3JlKCk7XG5cbiAgICB9KTsgICAgIFxufVxubW9kdWxlLmV4cG9ydHMgPSBjb2lucztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29pbnMuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gcGxheWVyKHNwcml0ZSwgcG9zaXRpb24pIHtcbiAgICBcbiAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZTtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5ncmF2aXR5ID0gMTA7XG4gICAgdGhpcy5zcGVlZE9mRmFsbGluZyA9IDA7XG4gICAgdGhpcy5zdGVwID0gMDtcblxuICAgIHRoaXMub25GbHkgPSBmYWxzZTtcbiAgICB0aGlzLm51bSA9IDE7XG5cbn1cblxucGxheWVyLnByb3RvdHlwZS51cGRhdGVQbGF5ZXIgPSBmdW5jdGlvbihkaWZmKSB7XG5cbiAgICB0aGlzLnNwZWVkT2ZGYWxsaW5nID0gTWF0aC5wb3coMiAqIHRoaXMuZ3Jhdml0eSAqIHRoaXMuc3RlcCwgMS8yKTtcblxuICAgIGlmKHRoaXMub25GbHkpIHtcbiAgICAgICAgdGhpcy5zdGVwICs9IDEwMDtcbiAgICAgICAgdGhpcy5wb3NpdGlvblsxXSAtPSB0aGlzLnNwZWVkT2ZGYWxsaW5nICogZGlmZjtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wb3NpdGlvblsxXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnN0ZXAgKz0gNjA7XG4gICAgICAgIHRoaXMucG9zaXRpb25bMV0gKz0gdGhpcy5zcGVlZE9mRmFsbGluZyAqIGRpZmY7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucG9zaXRpb25bMV0pO1xuICAgIH0gXG4gICAgXG4gICAgdGhpcy5zcHJpdGUudXBkYXRlKGRpZmYpO1xufVxuXG5wbGF5ZXIucHJvdG90eXBlLnJlbmRlclBsYXllciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5zcHJpdGUuY29udGV4dC5zYXZlKCk7XG4gICAgdGhpcy5zcHJpdGUuY29udGV4dC50cmFuc2xhdGUoMCwgdGhpcy5wb3NpdGlvblsxXSk7ICAgIFxuICAgIHRoaXMuc3ByaXRlLnJlbmRlcih0aGlzLm51bSk7ICAgIFxuICAgIHRoaXMuc3ByaXRlLmNvbnRleHQucmVzdG9yZSgpOyAgICBcbn1cblxucGxheWVyLnByb3RvdHlwZS5mbHkgPSBmdW5jdGlvbihhcmcpIHtcbiAgICBcbiAgICBpZighdGhpcy5vbkZseSkge1xuICAgICAgICB0aGlzLnN0ZXAgPSAwO1xuICAgICAgICB0aGlzLm51bSA9IDQ7ICAgICAgICAgICAgXG4gICAgfVxuICAgIGVsc2UgaWYoIWFyZykge1xuICAgICAgICB0aGlzLnN0ZXAgPSAwO1xuICAgICAgICB0aGlzLm51bSA9IDE7XG4gICAgfVxuICAgIHRoaXMub25GbHkgPSBhcmc7ICAgICAgICAgICAgXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBwbGF5ZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL3BsYXllci5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBTcHJpdGUoY29udGV4dCwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIHNwZWVkLCBmcmFtZXMpIHtcbiAgICBcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmltYWdlID0gaW1hZ2U7ICAgIFxuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLmZyYW1lcyA9IGZyYW1lcztcbiAgICB0aGlzLmR1cmF0aW9uID0gMDsgICBcbiAgICAgIFxufTtcblxuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihudW0pIHsgICBcblxuICAgIGxldCByb3VuZGVkRHVyYXRpb24gPSBNYXRoLnJvdW5kKHRoaXMuZHVyYXRpb24pO1xuICAgIGxldCBmcmFtZSA9IHRoaXMuZnJhbWVzW3JvdW5kZWREdXJhdGlvbiAlIG51bV07XG4gICAgbGV0IHggPSBmcmFtZSAqIHRoaXMud2lkdGg7IFxuICAgIGxldCB5ID0gMDsgICAgXG5cbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICB0aGlzLmltYWdlLFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB0aGlzLndpZHRoLFxuICAgICAgICB0aGlzLmhlaWdodCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgdGhpcy53aWR0aCxcbiAgICAgICAgdGhpcy5oZWlnaHQpO1xufTtcblxuU3ByaXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihkaWZmKSB7ICAgIFxuICAgIHRoaXMuZHVyYXRpb24gKz0gdGhpcy5zcGVlZCAqIGRpZmY7ICAgICAgICBcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3ByaXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9zcHJpdGUuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gd2FsbHMgKGNvbnRleHQpIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMud2FsbEFycmF5ID0gW107XG4gICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIHRoaXMuaW1hZ2Uuc3JjID0gJ2ltZy93YWxsLnBuZyc7XG4gICAgdGhpcy5zcGFjZUhlaWd0aCA9IDE1MDtcbiAgICB0aGlzLndpZHRoT2ZXYWxsID0gNTA7IFxufVxuXG5mdW5jdGlvbiB3YWxsIChwb3MsIHdpZHRoLCBoZWlndGgpIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWd0aCA9IGhlaWd0aDtcbn1cblxud2FsbHMucHJvdG90eXBlLnJlbmRlcldhbGxzID0gZnVuY3Rpb24oKSB7ICAgICBcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndhbGxBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICAgICAgdGhpcy5pbWFnZSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0ud2lkdGgsXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5oZWlndGgsXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5wb3NpdGlvblswXSxcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzFdLFxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0ud2lkdGgsXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5oZWlndGgpO1xuICAgIH1cbn1cblxubGV0IHRpbWUgPSA3NTtcblxud2FsbHMucHJvdG90eXBlLnVwZGF0ZVdhbGxzID0gZnVuY3Rpb24oZGlmZikge1xuXG4gICAgdGltZSArPSBNYXRoLnJvdW5kKGRpZmYgKiA2MCk7XG5cbiAgICBpZih0aW1lICUgMTUwID09IDE0OSl7XG5cbiAgICAgICAgbGV0IHJhbmRvbVNwYWNlUG9zaXRpb24gPSBnZXRSYW5kb21JbnQoMCwgMzAwKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMud2FsbEFycmF5LnB1c2gobmV3IHdhbGwoWzgxMCwgMF0sIHRoaXMud2lkdGhPZldhbGwsIHJhbmRvbVNwYWNlUG9zaXRpb24pKTtcbiAgICAgICAgdGhpcy53YWxsQXJyYXkucHVzaChuZXcgd2FsbChbODEwLCByYW5kb21TcGFjZVBvc2l0aW9uICsgdGhpcy5zcGFjZUhlaWd0aF0sIHRoaXMud2lkdGhPZldhbGwsIDQwMCAtIHJhbmRvbVNwYWNlUG9zaXRpb24gLSB0aGlzLnNwYWNlSGVpZ3RoKSk7XG4gICAgfVxuXG4gICAgdGhpcy53YWxsQXJyYXkuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgdmFsdWUucG9zaXRpb25bMF0gLT0gMjsgICAgICAgIFxuICAgIH0pO1xuXG4gICAgdGhpcy53YWxsQXJyYXkuZm9yRWFjaCgodmFsdWUsIGluZGV4LCBhcnJheSk9PntcbiAgICAgICAgaWYodmFsdWUucG9zaXRpb25bMF0gPCAtMTAwKSB7XG4gICAgICAgICAgICBhcnJheS5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUludChtaW4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FsbHM7XG5cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy93YWxscy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBTcHJpdGUgPSByZXF1aXJlKCcuL3Nwcml0ZS5qcycpO1xuY29uc3QgcGxheWVyID0gcmVxdWlyZSgnLi9wbGF5ZXIuanMnKTtcbmNvbnN0IGJhY2tncm91bmQgPSByZXF1aXJlKCcuL2JhY2tncm91bmQuanMnKTtcbmNvbnN0IHdhbGxzID0gcmVxdWlyZSgnLi93YWxscy5qcycpO1xuY29uc3QgY2hlY2sgPSByZXF1aXJlKCcuL2NoZWNrLmpzJyk7XG5jb25zdCBjb2lucyA9IHJlcXVpcmUoJy4vY29pbnMuanMnKTtcblxubGV0IHJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gICAgICAgIGZ1bmN0aW9uKGNhbGxiYWNrKXtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICB9O1xufSkoKTtcblxubGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbmNhbnZhcy53aWR0aCA9IDgwMDtcbmNhbnZhcy5oZWlnaHQgPSA0MDA7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbmxldCBwcm9ncmVzc09mVGlyZWRuZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbmxldCBwcm9ncmVzc1N0cmlwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxucHJvZ3Jlc3NPZlRpcmVkbmVzcy5jbGFzc05hbWUgPSAndGlyZWRuZXNzJztcbnByb2dyZXNzU3RyaXBlLnN0eWxlLndpZHRoID0gJzEwMCUnO1xucHJvZ3Jlc3NPZlRpcmVkbmVzcy5hcHBlbmRDaGlsZChwcm9ncmVzc1N0cmlwZSk7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHByb2dyZXNzT2ZUaXJlZG5lc3MpO1xuXG5mdW5jdGlvbiB1cGRhdGVQcm9ncmVzc0JhcigpIHtcblxuICAgIGxldCBjdXJyZW50VGltZSA9IE1hdGguZmxvb3IoZ2FtZVRpbWUpO1xuICAgIFxuICAgIGlmKGN1cnJlbnRUaW1lID4gZ2FtZVRpbWVSZWMpIHtcbiAgICAgICAgZ2FtZVRpbWVSZWMgPSBjdXJyZW50VGltZTtcbiAgICAgICAgbGV0IGN1cnJlbnRQcm9ncmVzID0gIHBhcnNlSW50KHByb2dyZXNzU3RyaXBlLnN0eWxlLndpZHRoKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjdXJyZW50UHJvZ3Jlcyk7XG5cbiAgICAgICAgY3VycmVudFByb2dyZXMgLT0xOyBcbiAgICAgICAgcHJvZ3Jlc3NTdHJpcGUuc3R5bGUud2lkdGggPSBjdXJyZW50UHJvZ3JlcyArICclJztcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNjb3JlcygpIHtcblxuICAgIGxldCBzY29yZXMgPSBkb2N1bWVudC5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Njb3JlcycpWzBdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdHJvbmcnKTtcbiAgICBsZXQgc2NvcmUgPSBwYXJzZUludChzY29yZXNbMF0uaW5uZXJIVE1MKTsgXG4gICAgc2NvcmVzWzBdLmlubmVySFRNTCA9IHNjb3JlICsgMTtcblxufVxuXG5mdW5jdGlvbiByZW5kZXJBbGwoKSB7XG5cbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDgwMCwgNDAwKTtcbiAgICBiYWNrZ3JvdW5kSW1hZ2UucmVuZGVyQmFja2dyb3VuZCgpO1xuICAgIGRyYWdvbi5yZW5kZXJQbGF5ZXIoKTtcbiAgICB3YWxsQXJyYXkucmVuZGVyV2FsbHMoKTtcbiAgICBjb2luQXJyYXkucmVuZGVyQ29pbnMoKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQWxsKGRpZmYpIHtcbiAgICBcbiAgICBkcmFnb24udXBkYXRlUGxheWVyKGRpZmYpO1xuICAgIHdhbGxBcnJheS51cGRhdGVXYWxscyhkaWZmKTtcbiAgICBjb2luQXJyYXkudXBkYXRlQ29pbnMoZGlmZik7XG5cbiAgICB1cGRhdGVQcm9ncmVzc0JhcigpO1xuXG4gICAgSXNHYW1lT3ZlciA9IGNoZWNrT2JqLmNoZWNrSW50ZXJzZWN0aW9ucygpO1xuXG4gICAgaWYoY2hlY2tPYmouaWZDb2luKCkpIHtcbiAgICAgICAgdXBkYXRlU2NvcmVzKCk7XG4gICAgfVxufVxuXG4vL21haW4gbG9vcFxuZnVuY3Rpb24gbWFpbigpIHtcblxuICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGxldCBkaWZmID0gKG5vdyAtIGxhc3RUaW1lKSAvIDEwMDA7ICAgIFxuICAgIHVwZGF0ZUFsbChkaWZmKTtcbiAgICByZW5kZXJBbGwoKTtcbiAgICBsYXN0VGltZSA9IG5vdztcbiAgICBnYW1lVGltZSArPSBkaWZmO1xuICAgIGlmKCFJc0dhbWVPdmVyKSB7XG4gICAgICAgIHJlcXVlc3RBbmltRnJhbWUobWFpbik7XG4gICAgfVxuICAgIFxufVxuXG5sZXQgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xubGV0IGRyYWdvbiwgd2FsbEFycmF5LCBjb2luQXJyYXksIGJhY2tncm91bmRJbWFnZSwgY2hlY2tPYmo7XG5sZXQgSXNHYW1lT3ZlciA9IGZhbHNlO1xubGV0IGdhbWVUaW1lID0gMDtcbmxldCBnYW1lVGltZVJlYyA9IDE7XG5cbmZ1bmN0aW9uIGxvYWRDb250ZW50KCkge1xuXG4gICAgY29uc3QgZHJhZ29uSW1nID0gbmV3IEltYWdlKCk7XG4gICAgZHJhZ29uSW1nLnNyYyA9ICdpbWcvZHJhZ29uLWZseS5wbmcnO1xuXG4gICAgY29uc3QgY29pbkltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGNvaW5JbWcuc3JjID0gJ2ltZy9jb2luLXNwcml0ZS1hbmltYXRpb24ucG5nJztcbiAgICBcbiAgICBiYWNrZ3JvdW5kSW1hZ2UgPSBuZXcgYmFja2dyb3VuZChjdHgpO1xuXG4gICAgZHJhZ29uID0gbmV3IHBsYXllcihuZXcgU3ByaXRlKGN0eCwgOTQsIDY3LCBkcmFnb25JbWcsIDE2LCBbMCwxLDIsM10pLCBbMCwgMF0pO1xuXG4gICAgd2FsbEFycmF5ID0gbmV3IHdhbGxzKGN0eCk7XG5cbiAgICBjb2luQXJyYXkgPSBuZXcgY29pbnMobmV3IFNwcml0ZShjdHgsIDUwLCA1MCwgY29pbkltZywgOCwgWzAsMSwyLDMsNCw1LDYsNyw4LDldKSk7XG5cbiAgICBjaGVja09iaiA9IG5ldyBjaGVjayhkcmFnb24sIHdhbGxBcnJheSwgY29pbkFycmF5LCBjYW52YXMpO1xuXG4gICAgbWFpbigpO1xufVxuXG5cblxuLy9ldmVudCB3aGVuIGZseWluZyB1cFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGRyYWdvbi5mbHkodHJ1ZSk7XG4gICAgfSk7XG5cbi8vZXZlbnQgd2hlbiBzdG9wIGZseWluZyB1cFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBkcmFnb24uZmx5KGZhbHNlKTtcbiAgICB9KTtcblxuLy9sb2FkIGltYWdlcyBhbmQgc3RhcnQgbWFpbiBsb29wXG5sb2FkQ29udGVudCgpO1xuXG5cblxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=