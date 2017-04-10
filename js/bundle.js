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

check.prototype.ifWall = function() {
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

let time = 149;

coins.prototype.updateCoins = function(diff) {

    time += Math.round(diff * 60);

    console.log(this.coinArray.length);

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
        value.sprite.context.translate(value.position[0], 0);    
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
        this.step += 50;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzNhOGY5Njk4MTdmMDc0YjAzM2IiLCJ3ZWJwYWNrOi8vLy4vanMvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb2lucy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvc3ByaXRlLmpzIiwid2VicGFjazovLy8uL2pzL3dhbGxzLmpzIiwid2VicGFjazovLy8uL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0Q7O0FBRUE7QUFDQTtBQUNBLHFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLGlDQUFpQztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTs7Ozs7Ozs7QUN4Q0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLDJCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSw2RDtBQUNBO0FBQ0E7O0FBRUEsS0FBSyxFO0FBQ0w7QUFDQTs7Ozs7OztBQ2pEQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSzs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsdUQ7QUFDQSxpQztBQUNBLGtDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCO0FBQ0E7OztBQUdBOzs7Ozs7O0FDckRBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCO0FBQ0E7QUFDQTtBQUNBLHNCOztBQUVBOztBQUVBLHlDOztBQUVBO0FBQ0E7QUFDQSwrQjtBQUNBLGM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQztBQUNBLHVDO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBDOztBQUVBLGtCQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtCO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7OztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsdUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzNhOGY5Njk4MTdmMDc0YjAzM2IiLCJmdW5jdGlvbiBiYWNrZ3JvdW5kIChjb250ZXh0KSB7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgdGhpcy5pbWFnZS5zcmMgPSAnaW1nL2JhY2tncm91bmQxLnBuZyc7XG4gICAgdGhpcy53aWR0aCA9IDgwMDtcbiAgICB0aGlzLmhlaWd0aCA9IDQwMDtcbiAgICB0aGlzLnN0ZXAgPSAwO1xufTtcblxuYmFja2dyb3VuZC5wcm90b3R5cGUucmVuZGVyQmFja2dyb3VuZCA9IGZ1bmN0aW9uKCkgeyAgICBcblxuICAgICsrdGhpcy5zdGVwO1xuICAgIGlmKHRoaXMuc3RlcCA9PSA4MDApIHtcbiAgICAgICB0aGlzLnN0ZXAgPSAwOyBcbiAgICB9XG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAwLCAwLCB0aGlzLnN0ZXAsIDQwMCwgdGhpcy53aWR0aC10aGlzLnN0ZXAsIDAsdGhpcy5zdGVwLCA0MDApO1xuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy5zdGVwLCAwLCB0aGlzLndpZHRoLXRoaXMuc3RlcCwgNDAwLCAwLCAwLCB0aGlzLndpZHRoLXRoaXMuc3RlcCwgNDAwKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmFja2dyb3VuZDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvYmFja2dyb3VuZC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBjaGVjayhwbGF5ZXIsIHdhbGxzLCBjb2lucywgY2FudmFzKSB7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgdGhpcy53YWxscyA9IHdhbGxzO1xuICAgIHRoaXMuZmllbGQgPSBjYW52YXM7XG59XG5cbmNoZWNrLnByb3RvdHlwZS5jaGVja0ludGVyc2VjdGlvbnMgPSBmdW5jdGlvbigpe1xuXG4gICAgcmV0dXJuIHRoaXMuaWZPdXRPZkZpZWxkKCkgfHwgdGhpcy5pZldhbGwoKTtcbn1cblxuY2hlY2sucHJvdG90eXBlLmlmT3V0T2ZGaWVsZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYodGhpcy5wbGF5ZXIucG9zaXRpb25bMV08IC0xMCkge1xuICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvblsxXSA9IC0xMDtcbiAgICB9XG4gICAgZWxzZSBpZih0aGlzLnBsYXllci5wb3NpdGlvblsxXSA+IDM1MCkge1xuICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvblsxXSA9IDM1MDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuY2hlY2sucHJvdG90eXBlLmlmV2FsbCA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCByZXMgPSBmYWxzZTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53YWxscy53YWxsQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYodGhpcy5wbGF5ZXIucG9zaXRpb25bMF0gKyB0aGlzLnBsYXllci5zcHJpdGUud2lkdGggLSAxMCA8IHRoaXMud2FsbHMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzBdIC0gMTAgfHxcbiAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gKyB0aGlzLnBsYXllci5zcHJpdGUuaGVpZ2h0IC0gMjAgPCB0aGlzLndhbGxzLndhbGxBcnJheVtpXS5wb3NpdGlvblsxXSAtIDEwIHx8XG4gICAgICAgICAgIHRoaXMud2FsbHMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzBdICsgdGhpcy53YWxscy53YWxsQXJyYXlbaV0ud2lkdGggLTEwIDwgdGhpcy5wbGF5ZXIucG9zaXRpb25bMF0gKyAxMCB8fFxuICAgICAgICAgICB0aGlzLndhbGxzLndhbGxBcnJheVtpXS5wb3NpdGlvblsxXSArIHRoaXMud2FsbHMud2FsbEFycmF5W2ldLmhlaWd0aCAtIDEwIDwgdGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gKyAyMCkge1xuICAgICAgICAgICAgICAgcmVzID0gIGZhbHNlO1xuICAgICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2s7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NoZWNrLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuZnVuY3Rpb24gY29pbnMoc3ByaXRlKSB7XG5cbiAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZTtcbiAgICB0aGlzLmNvaW5BcnJheSA9IFtdO1xufVxuXG5mdW5jdGlvbiBjb2luKHBvc2l0aW9uLCBzcHJpdGUpIHtcbiAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZTtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG59XG5cbmxldCB0aW1lID0gMTQ5O1xuXG5jb2lucy5wcm90b3R5cGUudXBkYXRlQ29pbnMgPSBmdW5jdGlvbihkaWZmKSB7XG5cbiAgICB0aW1lICs9IE1hdGgucm91bmQoZGlmZiAqIDYwKTtcblxuICAgIGNvbnNvbGUubG9nKHRoaXMuY29pbkFycmF5Lmxlbmd0aCk7XG5cbiAgICBpZih0aW1lICUgMTUwID09IDE0OSkgeyAgICAgXG5cbiAgICAgICAgdGhpcy5jb2luQXJyYXkucHVzaChuZXcgY29pbihbODEwLCAxMDBdLCB0aGlzLnNwcml0ZSkpO1xuICAgIH1cblxuICAgIHRoaXMuY29pbkFycmF5LmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgIHZhbHVlLnBvc2l0aW9uWzBdIC09IDI7XG4gICAgICAgIHZhbHVlLnNwcml0ZS51cGRhdGUoZGlmZik7ICAgICAgICBcbiAgICB9KTtcbiAgICBcbiAgICB0aGlzLmNvaW5BcnJheS5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgsIGFycmF5KT0+e1xuICAgICAgICBpZih2YWx1ZS5wb3NpdGlvblswXSA8IC0xMDApIHtcbiAgICAgICAgICAgIGFycmF5LnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbn1cblxuY29pbnMucHJvdG90eXBlLnJlbmRlckNvaW5zID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdGhpcy5jb2luQXJyYXkuZm9yRWFjaCgodmFsdWUsIGluZGV4LCBhcnJheSk9PntcblxuICAgICAgICB2YWx1ZS5zcHJpdGUuY29udGV4dC5zYXZlKCk7XG4gICAgICAgIHZhbHVlLnNwcml0ZS5jb250ZXh0LnRyYW5zbGF0ZSh2YWx1ZS5wb3NpdGlvblswXSwgMCk7ICAgIFxuICAgICAgICB2YWx1ZS5zcHJpdGUucmVuZGVyKDkpO1xuICAgICAgICB2YWx1ZS5zcHJpdGUuY29udGV4dC5yZXN0b3JlKCk7XG5cbiAgICB9KTsgICAgIFxufVxubW9kdWxlLmV4cG9ydHMgPSBjb2lucztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29pbnMuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gcGxheWVyKHNwcml0ZSwgcG9zaXRpb24pIHtcbiAgICBcbiAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZTtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5ncmF2aXR5ID0gMTA7XG4gICAgdGhpcy5zcGVlZE9mRmFsbGluZyA9IDA7XG4gICAgdGhpcy5zdGVwID0gMDtcblxuICAgIHRoaXMub25GbHkgPSBmYWxzZTtcbiAgICB0aGlzLm51bSA9IDE7XG5cbn1cblxucGxheWVyLnByb3RvdHlwZS51cGRhdGVQbGF5ZXIgPSBmdW5jdGlvbihkaWZmKSB7XG5cbiAgICB0aGlzLnNwZWVkT2ZGYWxsaW5nID0gTWF0aC5wb3coMiAqIHRoaXMuZ3Jhdml0eSAqIHRoaXMuc3RlcCwgMS8yKTtcblxuICAgIGlmKHRoaXMub25GbHkpIHtcbiAgICAgICAgdGhpcy5zdGVwICs9IDEwMDtcbiAgICAgICAgdGhpcy5wb3NpdGlvblsxXSAtPSB0aGlzLnNwZWVkT2ZGYWxsaW5nICogZGlmZjtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wb3NpdGlvblsxXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnN0ZXAgKz0gNTA7XG4gICAgICAgIHRoaXMucG9zaXRpb25bMV0gKz0gdGhpcy5zcGVlZE9mRmFsbGluZyAqIGRpZmY7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucG9zaXRpb25bMV0pO1xuICAgIH0gXG4gICAgXG4gICAgdGhpcy5zcHJpdGUudXBkYXRlKGRpZmYpO1xufVxuXG5wbGF5ZXIucHJvdG90eXBlLnJlbmRlclBsYXllciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5zcHJpdGUuY29udGV4dC5zYXZlKCk7XG4gICAgdGhpcy5zcHJpdGUuY29udGV4dC50cmFuc2xhdGUoMCwgdGhpcy5wb3NpdGlvblsxXSk7ICAgIFxuICAgIHRoaXMuc3ByaXRlLnJlbmRlcih0aGlzLm51bSk7ICAgIFxuICAgIHRoaXMuc3ByaXRlLmNvbnRleHQucmVzdG9yZSgpOyAgICBcbn1cblxucGxheWVyLnByb3RvdHlwZS5mbHkgPSBmdW5jdGlvbihhcmcpIHtcbiAgICBcbiAgICBpZighdGhpcy5vbkZseSkge1xuICAgICAgICB0aGlzLnN0ZXAgPSAwO1xuICAgICAgICB0aGlzLm51bSA9IDQ7ICAgICAgICAgICAgXG4gICAgfVxuICAgIGVsc2UgaWYoIWFyZykge1xuICAgICAgICB0aGlzLnN0ZXAgPSAwO1xuICAgICAgICB0aGlzLm51bSA9IDE7XG4gICAgfVxuICAgIHRoaXMub25GbHkgPSBhcmc7ICAgICAgICAgICAgXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBwbGF5ZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL3BsYXllci5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBTcHJpdGUoY29udGV4dCwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIHNwZWVkLCBmcmFtZXMpIHtcbiAgICBcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmltYWdlID0gaW1hZ2U7ICAgIFxuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLmZyYW1lcyA9IGZyYW1lcztcbiAgICB0aGlzLmR1cmF0aW9uID0gMDsgICBcbiAgICAgIFxufTtcblxuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihudW0pIHsgICBcblxuICAgIGxldCByb3VuZGVkRHVyYXRpb24gPSBNYXRoLnJvdW5kKHRoaXMuZHVyYXRpb24pO1xuICAgIGxldCBmcmFtZSA9IHRoaXMuZnJhbWVzW3JvdW5kZWREdXJhdGlvbiAlIG51bV07XG4gICAgbGV0IHggPSBmcmFtZSAqIHRoaXMud2lkdGg7IFxuICAgIGxldCB5ID0gMDsgICAgXG5cbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICB0aGlzLmltYWdlLFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB0aGlzLndpZHRoLFxuICAgICAgICB0aGlzLmhlaWdodCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgdGhpcy53aWR0aCxcbiAgICAgICAgdGhpcy5oZWlnaHQpO1xufTtcblxuU3ByaXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihkaWZmKSB7ICAgIFxuICAgIHRoaXMuZHVyYXRpb24gKz0gdGhpcy5zcGVlZCAqIGRpZmY7ICAgICAgICBcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3ByaXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9zcHJpdGUuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gd2FsbHMgKGNvbnRleHQpIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMud2FsbEFycmF5ID0gW107XG4gICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIHRoaXMuaW1hZ2Uuc3JjID0gJ2ltZy93YWxsLnBuZyc7XG4gICAgdGhpcy5zcGFjZUhlaWd0aCA9IDE1MDtcbiAgICB0aGlzLndpZHRoT2ZXYWxsID0gNTA7IFxufVxuXG5mdW5jdGlvbiB3YWxsIChwb3MsIHdpZHRoLCBoZWlndGgpIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWd0aCA9IGhlaWd0aDtcbn1cblxud2FsbHMucHJvdG90eXBlLnJlbmRlcldhbGxzID0gZnVuY3Rpb24oKSB7ICAgICBcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndhbGxBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICAgICAgdGhpcy5pbWFnZSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0ud2lkdGgsXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5oZWlndGgsXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5wb3NpdGlvblswXSxcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzFdLFxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0ud2lkdGgsXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5oZWlndGgpO1xuICAgIH1cbn1cblxubGV0IHRpbWUgPSA3NTtcblxud2FsbHMucHJvdG90eXBlLnVwZGF0ZVdhbGxzID0gZnVuY3Rpb24oZGlmZikge1xuXG4gICAgdGltZSArPSBNYXRoLnJvdW5kKGRpZmYgKiA2MCk7XG5cbiAgICBpZih0aW1lICUgMTUwID09IDE0OSl7XG5cbiAgICAgICAgbGV0IHJhbmRvbVNwYWNlUG9zaXRpb24gPSBnZXRSYW5kb21JbnQoMCwgMzAwKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMud2FsbEFycmF5LnB1c2gobmV3IHdhbGwoWzgxMCwgMF0sIHRoaXMud2lkdGhPZldhbGwsIHJhbmRvbVNwYWNlUG9zaXRpb24pKTtcbiAgICAgICAgdGhpcy53YWxsQXJyYXkucHVzaChuZXcgd2FsbChbODEwLCByYW5kb21TcGFjZVBvc2l0aW9uICsgdGhpcy5zcGFjZUhlaWd0aF0sIHRoaXMud2lkdGhPZldhbGwsIDQwMCAtIHJhbmRvbVNwYWNlUG9zaXRpb24gLSB0aGlzLnNwYWNlSGVpZ3RoKSk7XG4gICAgfVxuXG4gICAgdGhpcy53YWxsQXJyYXkuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgdmFsdWUucG9zaXRpb25bMF0gLT0gMjsgICAgICAgIFxuICAgIH0pO1xuXG4gICAgdGhpcy53YWxsQXJyYXkuZm9yRWFjaCgodmFsdWUsIGluZGV4LCBhcnJheSk9PntcbiAgICAgICAgaWYodmFsdWUucG9zaXRpb25bMF0gPCAtMTAwKSB7XG4gICAgICAgICAgICBhcnJheS5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUludChtaW4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FsbHM7XG5cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy93YWxscy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBTcHJpdGUgPSByZXF1aXJlKCcuL3Nwcml0ZS5qcycpO1xuY29uc3QgcGxheWVyID0gcmVxdWlyZSgnLi9wbGF5ZXIuanMnKTtcbmNvbnN0IGJhY2tncm91bmQgPSByZXF1aXJlKCcuL2JhY2tncm91bmQuanMnKTtcbmNvbnN0IHdhbGxzID0gcmVxdWlyZSgnLi93YWxscy5qcycpO1xuY29uc3QgY2hlY2sgPSByZXF1aXJlKCcuL2NoZWNrLmpzJyk7XG5jb25zdCBjb2lucyA9IHJlcXVpcmUoJy4vY29pbnMuanMnKTtcblxubGV0IHJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gICAgICAgIGZ1bmN0aW9uKGNhbGxiYWNrKXtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICB9O1xufSkoKTtcblxubGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbmNhbnZhcy53aWR0aCA9IDgwMDtcbmNhbnZhcy5oZWlnaHQgPSA0MDA7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbmxldCBwcm9ncmVzc09mVGlyZWRuZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbmxldCBwcm9ncmVzc1N0cmlwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxucHJvZ3Jlc3NPZlRpcmVkbmVzcy5jbGFzc05hbWUgPSAndGlyZWRuZXNzJztcbnByb2dyZXNzU3RyaXBlLnN0eWxlLndpZHRoID0gJzEwMCUnO1xucHJvZ3Jlc3NPZlRpcmVkbmVzcy5hcHBlbmRDaGlsZChwcm9ncmVzc1N0cmlwZSk7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHByb2dyZXNzT2ZUaXJlZG5lc3MpO1xuXG5mdW5jdGlvbiB1cGRhdGVQcm9ncmVzc0JhcigpIHtcblxuICAgIGxldCBjdXJyZW50VGltZSA9IE1hdGguZmxvb3IoZ2FtZVRpbWUpO1xuICAgIFxuICAgIGlmKGN1cnJlbnRUaW1lID4gZ2FtZVRpbWVSZWMpIHtcbiAgICAgICAgZ2FtZVRpbWVSZWMgPSBjdXJyZW50VGltZTtcbiAgICAgICAgbGV0IGN1cnJlbnRQcm9ncmVzID0gIHBhcnNlSW50KHByb2dyZXNzU3RyaXBlLnN0eWxlLndpZHRoKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjdXJyZW50UHJvZ3Jlcyk7XG5cbiAgICAgICAgY3VycmVudFByb2dyZXMgLT0xOyBcbiAgICAgICAgcHJvZ3Jlc3NTdHJpcGUuc3R5bGUud2lkdGggPSBjdXJyZW50UHJvZ3JlcyArICclJztcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlckFsbCgpIHtcblxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgODAwLCA0MDApO1xuICAgIGJhY2tncm91bmRJbWFnZS5yZW5kZXJCYWNrZ3JvdW5kKCk7XG4gICAgZHJhZ29uLnJlbmRlclBsYXllcigpO1xuICAgIHdhbGxBcnJheS5yZW5kZXJXYWxscygpO1xuICAgIGNvaW5BcnJheS5yZW5kZXJDb2lucygpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBbGwoZGlmZikge1xuICAgIFxuICAgIGRyYWdvbi51cGRhdGVQbGF5ZXIoZGlmZik7XG4gICAgd2FsbEFycmF5LnVwZGF0ZVdhbGxzKGRpZmYpO1xuICAgIGNvaW5BcnJheS51cGRhdGVDb2lucyhkaWZmKTtcblxuICAgIHVwZGF0ZVByb2dyZXNzQmFyKCk7XG4gICAgSXNHYW1lT3ZlciA9IGNoZWNrT2JqLmNoZWNrSW50ZXJzZWN0aW9ucygpO1xufVxuXG4vL21haW4gbG9vcFxuZnVuY3Rpb24gbWFpbigpIHtcblxuICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGxldCBkaWZmID0gKG5vdyAtIGxhc3RUaW1lKSAvIDEwMDA7ICAgIFxuICAgIHVwZGF0ZUFsbChkaWZmKTtcbiAgICByZW5kZXJBbGwoKTtcbiAgICBsYXN0VGltZSA9IG5vdztcbiAgICBnYW1lVGltZSArPSBkaWZmO1xuICAgIGlmKCFJc0dhbWVPdmVyKSB7XG4gICAgICAgIHJlcXVlc3RBbmltRnJhbWUobWFpbik7XG4gICAgfVxuICAgIFxufVxuXG5sZXQgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xubGV0IGRyYWdvbiwgd2FsbEFycmF5LCBjb2luQXJyYXksIGJhY2tncm91bmRJbWFnZSwgY2hlY2tPYmo7XG5sZXQgSXNHYW1lT3ZlciA9IGZhbHNlO1xubGV0IGdhbWVUaW1lID0gMDtcbmxldCBnYW1lVGltZVJlYyA9IDE7XG5cbmZ1bmN0aW9uIGxvYWRDb250ZW50KCkge1xuXG4gICAgY29uc3QgZHJhZ29uSW1nID0gbmV3IEltYWdlKCk7XG4gICAgZHJhZ29uSW1nLnNyYyA9ICdpbWcvZHJhZ29uLWZseS5wbmcnO1xuXG4gICAgY29uc3QgY29pbkltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGNvaW5JbWcuc3JjID0gJ2ltZy9jb2luLXNwcml0ZS1hbmltYXRpb24ucG5nJztcbiAgICBcbiAgICBiYWNrZ3JvdW5kSW1hZ2UgPSBuZXcgYmFja2dyb3VuZChjdHgpO1xuXG4gICAgZHJhZ29uID0gbmV3IHBsYXllcihuZXcgU3ByaXRlKGN0eCwgOTQsIDY3LCBkcmFnb25JbWcsIDE2LCBbMCwxLDIsM10pLCBbMCwgMF0pO1xuXG4gICAgd2FsbEFycmF5ID0gbmV3IHdhbGxzKGN0eCk7XG5cbiAgICBjb2luQXJyYXkgPSBuZXcgY29pbnMobmV3IFNwcml0ZShjdHgsIDUwLCA1MCwgY29pbkltZywgOCwgWzAsMSwyLDMsNCw1LDYsNyw4LDldKSk7XG5cbiAgICBjaGVja09iaiA9IG5ldyBjaGVjayhkcmFnb24sIHdhbGxBcnJheSwgY29pbkFycmF5LCBjYW52YXMpO1xuXG4gICAgbWFpbigpO1xufVxuXG5cblxuLy9ldmVudCB3aGVuIGZseWluZyB1cFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGRyYWdvbi5mbHkodHJ1ZSk7XG4gICAgfSk7XG5cbi8vZXZlbnQgd2hlbiBzdG9wIGZseWluZyB1cFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBkcmFnb24uZmx5KGZhbHNlKTtcbiAgICB9KTtcblxuLy9sb2FkIGltYWdlcyBhbmQgc3RhcnQgbWFpbiBsb29wXG5sb2FkQ29udGVudCgpO1xuXG5cblxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=