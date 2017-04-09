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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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

function check(player, walls, canvas) {
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
        if(this.player.position[0] + this.player.sprite.width < this.walls.wallArray[i].position[0] ||
           this.player.position[1]+20 + this.player.sprite.height-35 < this.walls.wallArray[i].position[1] ||
           this.walls.wallArray[i].position[0] + this.walls.wallArray[i].width < this.player.position[0] ||
           this.walls.wallArray[i].position[1] + this.walls.wallArray[i].heigth < this.player.position[1]+20) {
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
/* 3 */
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
/* 4 */
/***/ (function(module, exports) {

function walls (context) {
    this.context = context;
    this.wallArray = [];
    this.image = new Image();
    this.image.src = 'img/wall.png';
    
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

let time = 0;

walls.prototype.updateWalls = function(diff) {

    
    time += Math.round(diff * 60);

    console.log(this.wallArray.length);
    if(time % 100 == 99){
        
        this.wallArray.push(new wall([810, 0], 100, 120));
        this.wallArray.push(new wall([810, 280], 100, 120));
        
    }
    this.wallArray.forEach((value, index, array) => {
        value.position[0] -= 3;        
    });

    this.wallArray.forEach((value, index, array)=>{
        if(value.position[0] < -100) {
            array.shift();
        }
    })
    
}

module.exports = walls;




/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Sprite = __webpack_require__(3);
const player = __webpack_require__(2);
const background = __webpack_require__(0);
const walls = __webpack_require__(4);
const check = __webpack_require__(1);

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

function renderAll() {

    ctx.clearRect(0, 0, 800, 400);
    backgroundImage.renderBackground();
    dragon.renderPlayer();
    wallArray.renderWalls();
}

function updateAll(diff) {
    dragon.updatePlayer(diff);
    wallArray.updateWalls(diff);

    IsGameOver = checkObj.checkIntersections();
}



//main loop
function main() {

    let now = Date.now();
    let diff = (now - lastTime) / 1000;    
    updateAll(diff);
    renderAll();
    lastTime = now;
  
    if(!IsGameOver) {
        requestAnimFrame(main);
    }   
}

let lastTime = Date.now();
let dragon, wallArray, backgroundImage, checkObj;
let IsGameOver = false;

function loadContent() {
    const dragonImg = new Image('img/dragon-fly.png');
    dragonImg.src = 'img/dragon-fly.png';
    
    backgroundImage = new background(ctx);

    dragon = new player(new Sprite(ctx, 94, 67, dragonImg, 16, [0,1,2,3]), [0, 0]);

    wallArray = new walls(ctx);

    checkObj = new check(dragon, wallArray, canvas);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWQ2NmE0MmY4NWU0ODFmMWU1OTkiLCJ3ZWJwYWNrOi8vLy4vanMvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9qcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvc3ByaXRlLmpzIiwid2VicGFjazovLy8uL2pzL3dhbGxzLmpzIiwid2VicGFjazovLy8uL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0Q7O0FBRUE7QUFDQTtBQUNBLHFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLGlDQUFpQztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUMxQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEs7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHVEO0FBQ0EsaUM7QUFDQSxrQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQjtBQUNBOzs7QUFHQTs7Ozs7OztBQ3JEQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QjtBQUNBO0FBQ0E7QUFDQSxzQjs7QUFFQTs7QUFFQSx5Qzs7QUFFQTtBQUNBO0FBQ0EsK0I7QUFDQSxjOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEM7QUFDQSx1QztBQUNBOztBQUVBOzs7Ozs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQzs7QUFFQSxrQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQjtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBOzs7Ozs7Ozs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7OztBQUlBO0FBQ0E7O0FBRUE7QUFDQSx1QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDlkNjZhNDJmODVlNDgxZjFlNTk5IiwiZnVuY3Rpb24gYmFja2dyb3VuZCAoY29udGV4dCkge1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIHRoaXMuaW1hZ2Uuc3JjID0gJ2ltZy9iYWNrZ3JvdW5kMS5wbmcnO1xuICAgIHRoaXMud2lkdGggPSA4MDA7XG4gICAgdGhpcy5oZWlndGggPSA0MDA7XG4gICAgdGhpcy5zdGVwID0gMDtcbn07XG5cbmJhY2tncm91bmQucHJvdG90eXBlLnJlbmRlckJhY2tncm91bmQgPSBmdW5jdGlvbigpIHsgICAgXG5cbiAgICArK3RoaXMuc3RlcDtcbiAgICBpZih0aGlzLnN0ZXAgPT0gODAwKSB7XG4gICAgICAgdGhpcy5zdGVwID0gMDsgXG4gICAgfVxuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMCwgMCwgdGhpcy5zdGVwLCA0MDAsIHRoaXMud2lkdGgtdGhpcy5zdGVwLCAwLHRoaXMuc3RlcCwgNDAwKTtcbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMuc3RlcCwgMCwgdGhpcy53aWR0aC10aGlzLnN0ZXAsIDQwMCwgMCwgMCwgdGhpcy53aWR0aC10aGlzLnN0ZXAsIDQwMCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhY2tncm91bmQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2JhY2tncm91bmQuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gY2hlY2socGxheWVyLCB3YWxscywgY2FudmFzKSB7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgdGhpcy53YWxscyA9IHdhbGxzO1xuICAgIHRoaXMuZmllbGQgPSBjYW52YXM7XG5cbn1cblxuY2hlY2sucHJvdG90eXBlLmNoZWNrSW50ZXJzZWN0aW9ucyA9IGZ1bmN0aW9uKCl7XG5cbiAgICByZXR1cm4gdGhpcy5pZk91dE9mRmllbGQoKSB8fCB0aGlzLmlmV2FsbCgpO1xuXG59XG5cbmNoZWNrLnByb3RvdHlwZS5pZk91dE9mRmllbGQgPSBmdW5jdGlvbigpIHtcblxuICAgIGlmKHRoaXMucGxheWVyLnBvc2l0aW9uWzFdPCAtMTApIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gPSAtMTA7XG4gICAgfVxuICAgIGVsc2UgaWYodGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gPiAzNTApIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb25bMV0gPSAzNTA7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG5cbn1cblxuY2hlY2sucHJvdG90eXBlLmlmV2FsbCA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCByZXMgPSBmYWxzZTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53YWxscy53YWxsQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYodGhpcy5wbGF5ZXIucG9zaXRpb25bMF0gKyB0aGlzLnBsYXllci5zcHJpdGUud2lkdGggPCB0aGlzLndhbGxzLndhbGxBcnJheVtpXS5wb3NpdGlvblswXSB8fFxuICAgICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvblsxXSsyMCArIHRoaXMucGxheWVyLnNwcml0ZS5oZWlnaHQtMzUgPCB0aGlzLndhbGxzLndhbGxBcnJheVtpXS5wb3NpdGlvblsxXSB8fFxuICAgICAgICAgICB0aGlzLndhbGxzLndhbGxBcnJheVtpXS5wb3NpdGlvblswXSArIHRoaXMud2FsbHMud2FsbEFycmF5W2ldLndpZHRoIDwgdGhpcy5wbGF5ZXIucG9zaXRpb25bMF0gfHxcbiAgICAgICAgICAgdGhpcy53YWxscy53YWxsQXJyYXlbaV0ucG9zaXRpb25bMV0gKyB0aGlzLndhbGxzLndhbGxBcnJheVtpXS5oZWlndGggPCB0aGlzLnBsYXllci5wb3NpdGlvblsxXSsyMCkge1xuICAgICAgICAgICAgICAgcmVzID0gIGZhbHNlO1xuICAgICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVjaztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY2hlY2suanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gcGxheWVyKHNwcml0ZSwgcG9zaXRpb24pIHtcbiAgICBcbiAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZTtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5ncmF2aXR5ID0gMTA7XG4gICAgdGhpcy5zcGVlZE9mRmFsbGluZyA9IDA7XG4gICAgdGhpcy5zdGVwID0gMDtcblxuICAgIHRoaXMub25GbHkgPSBmYWxzZTtcbiAgICB0aGlzLm51bSA9IDE7XG5cbn1cblxucGxheWVyLnByb3RvdHlwZS51cGRhdGVQbGF5ZXIgPSBmdW5jdGlvbihkaWZmKSB7XG5cbiAgICB0aGlzLnNwZWVkT2ZGYWxsaW5nID0gTWF0aC5wb3coMiAqIHRoaXMuZ3Jhdml0eSAqIHRoaXMuc3RlcCwgMS8yKTtcblxuICAgIGlmKHRoaXMub25GbHkpIHtcbiAgICAgICAgdGhpcy5zdGVwICs9IDEwMDtcbiAgICAgICAgdGhpcy5wb3NpdGlvblsxXSAtPSB0aGlzLnNwZWVkT2ZGYWxsaW5nICogZGlmZjtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wb3NpdGlvblsxXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnN0ZXAgKz0gNTA7XG4gICAgICAgIHRoaXMucG9zaXRpb25bMV0gKz0gdGhpcy5zcGVlZE9mRmFsbGluZyAqIGRpZmY7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucG9zaXRpb25bMV0pO1xuICAgIH0gXG4gICAgXG4gICAgdGhpcy5zcHJpdGUudXBkYXRlKGRpZmYpO1xufVxuXG5wbGF5ZXIucHJvdG90eXBlLnJlbmRlclBsYXllciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5zcHJpdGUuY29udGV4dC5zYXZlKCk7XG4gICAgdGhpcy5zcHJpdGUuY29udGV4dC50cmFuc2xhdGUoMCwgdGhpcy5wb3NpdGlvblsxXSk7ICAgIFxuICAgIHRoaXMuc3ByaXRlLnJlbmRlcih0aGlzLm51bSk7ICAgIFxuICAgIHRoaXMuc3ByaXRlLmNvbnRleHQucmVzdG9yZSgpOyAgICBcbn1cblxucGxheWVyLnByb3RvdHlwZS5mbHkgPSBmdW5jdGlvbihhcmcpIHtcbiAgICBcbiAgICBpZighdGhpcy5vbkZseSkge1xuICAgICAgICB0aGlzLnN0ZXAgPSAwO1xuICAgICAgICB0aGlzLm51bSA9IDQ7ICAgICAgICAgICAgXG4gICAgfVxuICAgIGVsc2UgaWYoIWFyZykge1xuICAgICAgICB0aGlzLnN0ZXAgPSAwO1xuICAgICAgICB0aGlzLm51bSA9IDE7XG4gICAgfVxuICAgIHRoaXMub25GbHkgPSBhcmc7ICAgICAgICAgICAgXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBwbGF5ZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL3BsYXllci5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBTcHJpdGUoY29udGV4dCwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIHNwZWVkLCBmcmFtZXMpIHtcbiAgICBcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmltYWdlID0gaW1hZ2U7ICAgIFxuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLmZyYW1lcyA9IGZyYW1lcztcbiAgICB0aGlzLmR1cmF0aW9uID0gMDsgICBcbiAgICAgIFxufTtcblxuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihudW0pIHsgICBcblxuICAgIGxldCByb3VuZGVkRHVyYXRpb24gPSBNYXRoLnJvdW5kKHRoaXMuZHVyYXRpb24pO1xuICAgIGxldCBmcmFtZSA9IHRoaXMuZnJhbWVzW3JvdW5kZWREdXJhdGlvbiAlIG51bV07XG4gICAgbGV0IHggPSBmcmFtZSAqIHRoaXMud2lkdGg7IFxuICAgIGxldCB5ID0gMDsgICAgXG5cbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICB0aGlzLmltYWdlLFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB0aGlzLndpZHRoLFxuICAgICAgICB0aGlzLmhlaWdodCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgdGhpcy53aWR0aCxcbiAgICAgICAgdGhpcy5oZWlnaHQpO1xufTtcblxuU3ByaXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihkaWZmKSB7ICAgIFxuICAgIHRoaXMuZHVyYXRpb24gKz0gdGhpcy5zcGVlZCAqIGRpZmY7ICAgICAgICBcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3ByaXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9zcHJpdGUuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gd2FsbHMgKGNvbnRleHQpIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMud2FsbEFycmF5ID0gW107XG4gICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIHRoaXMuaW1hZ2Uuc3JjID0gJ2ltZy93YWxsLnBuZyc7XG4gICAgXG59XG5cbmZ1bmN0aW9uIHdhbGwgKHBvcywgd2lkdGgsIGhlaWd0aCkge1xuICAgIHRoaXMucG9zaXRpb24gPSBwb3M7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ3RoID0gaGVpZ3RoO1xufVxuXG53YWxscy5wcm90b3R5cGUucmVuZGVyV2FsbHMgPSBmdW5jdGlvbigpIHsgICAgIFxuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud2FsbEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICB0aGlzLmltYWdlLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS53aWR0aCxcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLmhlaWd0aCxcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzBdLFxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0ucG9zaXRpb25bMV0sXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS53aWR0aCxcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLmhlaWd0aCk7XG4gICAgfVxufVxuXG5sZXQgdGltZSA9IDA7XG5cbndhbGxzLnByb3RvdHlwZS51cGRhdGVXYWxscyA9IGZ1bmN0aW9uKGRpZmYpIHtcblxuICAgIFxuICAgIHRpbWUgKz0gTWF0aC5yb3VuZChkaWZmICogNjApO1xuXG4gICAgY29uc29sZS5sb2codGhpcy53YWxsQXJyYXkubGVuZ3RoKTtcbiAgICBpZih0aW1lICUgMTAwID09IDk5KXtcbiAgICAgICAgXG4gICAgICAgIHRoaXMud2FsbEFycmF5LnB1c2gobmV3IHdhbGwoWzgxMCwgMF0sIDEwMCwgMTIwKSk7XG4gICAgICAgIHRoaXMud2FsbEFycmF5LnB1c2gobmV3IHdhbGwoWzgxMCwgMjgwXSwgMTAwLCAxMjApKTtcbiAgICAgICAgXG4gICAgfVxuICAgIHRoaXMud2FsbEFycmF5LmZvckVhY2goKHZhbHVlLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgdmFsdWUucG9zaXRpb25bMF0gLT0gMzsgICAgICAgIFxuICAgIH0pO1xuXG4gICAgdGhpcy53YWxsQXJyYXkuZm9yRWFjaCgodmFsdWUsIGluZGV4LCBhcnJheSk9PntcbiAgICAgICAgaWYodmFsdWUucG9zaXRpb25bMF0gPCAtMTAwKSB7XG4gICAgICAgICAgICBhcnJheS5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YWxscztcblxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL3dhbGxzLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFNwcml0ZSA9IHJlcXVpcmUoJy4vc3ByaXRlLmpzJyk7XG5jb25zdCBwbGF5ZXIgPSByZXF1aXJlKCcuL3BsYXllci5qcycpO1xuY29uc3QgYmFja2dyb3VuZCA9IHJlcXVpcmUoJy4vYmFja2dyb3VuZC5qcycpO1xuY29uc3Qgd2FsbHMgPSByZXF1aXJlKCcuL3dhbGxzLmpzJyk7XG5jb25zdCBjaGVjayA9IHJlcXVpcmUoJy4vY2hlY2suanMnKTtcblxubGV0IHJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gICAgICAgIGZ1bmN0aW9uKGNhbGxiYWNrKXtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICB9O1xufSkoKTtcblxubGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbmNhbnZhcy53aWR0aCA9IDgwMDtcbmNhbnZhcy5oZWlnaHQgPSA0MDA7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbmZ1bmN0aW9uIHJlbmRlckFsbCgpIHtcblxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgODAwLCA0MDApO1xuICAgIGJhY2tncm91bmRJbWFnZS5yZW5kZXJCYWNrZ3JvdW5kKCk7XG4gICAgZHJhZ29uLnJlbmRlclBsYXllcigpO1xuICAgIHdhbGxBcnJheS5yZW5kZXJXYWxscygpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBbGwoZGlmZikge1xuICAgIGRyYWdvbi51cGRhdGVQbGF5ZXIoZGlmZik7XG4gICAgd2FsbEFycmF5LnVwZGF0ZVdhbGxzKGRpZmYpO1xuXG4gICAgSXNHYW1lT3ZlciA9IGNoZWNrT2JqLmNoZWNrSW50ZXJzZWN0aW9ucygpO1xufVxuXG5cblxuLy9tYWluIGxvb3BcbmZ1bmN0aW9uIG1haW4oKSB7XG5cbiAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBsZXQgZGlmZiA9IChub3cgLSBsYXN0VGltZSkgLyAxMDAwOyAgICBcbiAgICB1cGRhdGVBbGwoZGlmZik7XG4gICAgcmVuZGVyQWxsKCk7XG4gICAgbGFzdFRpbWUgPSBub3c7XG4gIFxuICAgIGlmKCFJc0dhbWVPdmVyKSB7XG4gICAgICAgIHJlcXVlc3RBbmltRnJhbWUobWFpbik7XG4gICAgfSAgIFxufVxuXG5sZXQgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xubGV0IGRyYWdvbiwgd2FsbEFycmF5LCBiYWNrZ3JvdW5kSW1hZ2UsIGNoZWNrT2JqO1xubGV0IElzR2FtZU92ZXIgPSBmYWxzZTtcblxuZnVuY3Rpb24gbG9hZENvbnRlbnQoKSB7XG4gICAgY29uc3QgZHJhZ29uSW1nID0gbmV3IEltYWdlKCdpbWcvZHJhZ29uLWZseS5wbmcnKTtcbiAgICBkcmFnb25JbWcuc3JjID0gJ2ltZy9kcmFnb24tZmx5LnBuZyc7XG4gICAgXG4gICAgYmFja2dyb3VuZEltYWdlID0gbmV3IGJhY2tncm91bmQoY3R4KTtcblxuICAgIGRyYWdvbiA9IG5ldyBwbGF5ZXIobmV3IFNwcml0ZShjdHgsIDk0LCA2NywgZHJhZ29uSW1nLCAxNiwgWzAsMSwyLDNdKSwgWzAsIDBdKTtcblxuICAgIHdhbGxBcnJheSA9IG5ldyB3YWxscyhjdHgpO1xuXG4gICAgY2hlY2tPYmogPSBuZXcgY2hlY2soZHJhZ29uLCB3YWxsQXJyYXksIGNhbnZhcyk7XG5cbiAgICBtYWluKCk7XG59XG5cblxuXG4vL2V2ZW50IHdoZW4gZmx5aW5nIHVwXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZHJhZ29uLmZseSh0cnVlKTtcbiAgICB9KTtcblxuLy9ldmVudCB3aGVuIHN0b3AgZmx5aW5nIHVwXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGRyYWdvbi5mbHkoZmFsc2UpO1xuICAgIH0pO1xuXG4vL2xvYWQgaW1hZ2VzIGFuZCBzdGFydCBtYWluIGxvb3BcbmxvYWRDb250ZW50KCk7XG5cblxuXG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==