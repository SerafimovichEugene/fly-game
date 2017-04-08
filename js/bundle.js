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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
        
    }
    else {
        this.step += 80;
        this.position[1] += this.speedOfFalling * diff;
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
/* 2 */
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
    
    // this.context.clearRect(0, 0, 800, 600);

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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Sprite = __webpack_require__(2);
const player = __webpack_require__(1);
const background = __webpack_require__(0);

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
    Dragon.renderPlayer();
}





let lastTime = Date.now();
//main loop
function main() {
    let now = Date.now();
    let diff = (now - lastTime) / 1000;    


    Dragon.updatePlayer(diff);
    renderAll();

    lastTime = now;
    requestAnimFrame(main);    
}

let dragonImg = new Image();
dragonImg.src = 'img/dragon-fly.png';

let dragonSprite = new Sprite(ctx, 94, 67, dragonImg, 16, [0,1,2,3]);
const backgroundImage = new background(ctx);

let Dragon = new player(dragonSprite, [0, 0]);


//event when flying up
document.addEventListener('keydown', function(event) {
        Dragon.fly(true);
    });

//event when stop flying up
document.addEventListener('keyup', function(event) {
        Dragon.fly(false);
    });

//start main loop
dragonImg.addEventListener('load', main);






/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2RlNDgxNzhjYmFmNzczMWU1YzgiLCJ3ZWJwYWNrOi8vLy4vanMvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvc3ByaXRlLmpzIiwid2VicGFjazovLy8uL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0Q7O0FBRUE7QUFDQTtBQUNBLHFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNuQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLGdEOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSzs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsdUQ7QUFDQSxpQztBQUNBLGtDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCO0FBQ0E7OztBQUdBOzs7Ozs7O0FDdERBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCO0FBQ0E7QUFDQTtBQUNBLHNCOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwrQjtBQUNBLGM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQztBQUNBLHVDO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNyQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0EsMkI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGNkZTQ4MTc4Y2JhZjc3MzFlNWM4IiwiZnVuY3Rpb24gYmFja2dyb3VuZCAoY29udGV4dCkge1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIHRoaXMuaW1hZ2Uuc3JjID0gJ2ltZy9iYWNrZ3JvdW5kMS5wbmcnO1xuICAgIHRoaXMud2lkdGggPSA4MDA7XG4gICAgdGhpcy5oZWlndGggPSA0MDA7XG4gICAgdGhpcy5zdGVwID0gMDtcbn07XG5cbmJhY2tncm91bmQucHJvdG90eXBlLnJlbmRlckJhY2tncm91bmQgPSBmdW5jdGlvbigpIHsgICAgXG5cbiAgICArK3RoaXMuc3RlcDtcbiAgICBpZih0aGlzLnN0ZXAgPT0gODAwKSB7XG4gICAgICAgdGhpcy5zdGVwID0gMDsgXG4gICAgfVxuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMCwgMCwgdGhpcy5zdGVwLCA0MDAsIHRoaXMud2lkdGgtdGhpcy5zdGVwLCAwLHRoaXMuc3RlcCwgNDAwKTtcbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMuc3RlcCwgMCwgdGhpcy53aWR0aC10aGlzLnN0ZXAsIDQwMCwgMCwgMCwgdGhpcy53aWR0aC10aGlzLnN0ZXAsIDQwMCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhY2tncm91bmQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2JhY2tncm91bmQuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gcGxheWVyKHNwcml0ZSwgcG9zaXRpb24pIHtcbiAgICBcbiAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZTtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5ncmF2aXR5ID0gMTA7XG4gICAgdGhpcy5zcGVlZE9mRmFsbGluZyA9IDA7XG4gICAgdGhpcy5zdGVwID0gMDtcblxuICAgIHRoaXMub25GbHkgPSBmYWxzZTtcbiAgICB0aGlzLm51bSA9IDE7XG5cbn1cblxucGxheWVyLnByb3RvdHlwZS51cGRhdGVQbGF5ZXIgPSBmdW5jdGlvbihkaWZmKSB7IFxuXG4gICAgXG5cbiAgICB0aGlzLnNwZWVkT2ZGYWxsaW5nID0gTWF0aC5wb3coMiAqIHRoaXMuZ3Jhdml0eSAqIHRoaXMuc3RlcCwgMS8yKTtcblxuICAgIGlmKHRoaXMub25GbHkpIHtcbiAgICAgICAgdGhpcy5zdGVwICs9IDEwMDtcbiAgICAgICAgdGhpcy5wb3NpdGlvblsxXSAtPSB0aGlzLnNwZWVkT2ZGYWxsaW5nICogZGlmZjtcbiAgICAgICAgXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnN0ZXAgKz0gODA7XG4gICAgICAgIHRoaXMucG9zaXRpb25bMV0gKz0gdGhpcy5zcGVlZE9mRmFsbGluZyAqIGRpZmY7XG4gICAgfSBcbiAgICBcbiAgICB0aGlzLnNwcml0ZS51cGRhdGUoZGlmZik7XG59XG5cbnBsYXllci5wcm90b3R5cGUucmVuZGVyUGxheWVyID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLnNwcml0ZS5jb250ZXh0LnNhdmUoKTtcbiAgICB0aGlzLnNwcml0ZS5jb250ZXh0LnRyYW5zbGF0ZSgwLCB0aGlzLnBvc2l0aW9uWzFdKTsgICAgXG4gICAgdGhpcy5zcHJpdGUucmVuZGVyKHRoaXMubnVtKTsgICAgXG4gICAgdGhpcy5zcHJpdGUuY29udGV4dC5yZXN0b3JlKCk7ICAgIFxufVxuXG5wbGF5ZXIucHJvdG90eXBlLmZseSA9IGZ1bmN0aW9uKGFyZykge1xuICAgIFxuICAgIGlmKCF0aGlzLm9uRmx5KSB7XG4gICAgICAgIHRoaXMuc3RlcCA9IDA7XG4gICAgICAgIHRoaXMubnVtID0gNDsgICAgICAgICAgICBcbiAgICB9XG4gICAgZWxzZSBpZighYXJnKSB7XG4gICAgICAgIHRoaXMuc3RlcCA9IDA7XG4gICAgICAgIHRoaXMubnVtID0gMTtcbiAgICB9XG4gICAgdGhpcy5vbkZseSA9IGFyZzsgICAgICAgICAgICBcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHBsYXllcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvcGxheWVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIFNwcml0ZShjb250ZXh0LCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgc3BlZWQsIGZyYW1lcykge1xuICAgIFxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTsgICAgXG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIHRoaXMuZnJhbWVzID0gZnJhbWVzO1xuICAgIHRoaXMuZHVyYXRpb24gPSAwOyAgIFxuICAgICAgXG59O1xuXG5TcHJpdGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKG51bSkge1xuICAgIFxuICAgIC8vIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgODAwLCA2MDApO1xuXG4gICAgbGV0IHJvdW5kZWREdXJhdGlvbiA9IE1hdGgucm91bmQodGhpcy5kdXJhdGlvbik7XG4gICAgbGV0IGZyYW1lID0gdGhpcy5mcmFtZXNbcm91bmRlZER1cmF0aW9uICUgbnVtXTtcbiAgICBsZXQgeCA9IGZyYW1lICogdGhpcy53aWR0aDsgXG4gICAgbGV0IHkgPSAwOyAgICBcblxuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgIHRoaXMuaW1hZ2UsXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIHRoaXMud2lkdGgsXG4gICAgICAgIHRoaXMuaGVpZ2h0LFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICB0aGlzLndpZHRoLFxuICAgICAgICB0aGlzLmhlaWdodCk7XG59O1xuXG5TcHJpdGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKGRpZmYpIHsgICAgXG4gICAgdGhpcy5kdXJhdGlvbiArPSB0aGlzLnNwZWVkICogZGlmZjsgICAgICAgIFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTcHJpdGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL3Nwcml0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBTcHJpdGUgPSByZXF1aXJlKCcuL3Nwcml0ZS5qcycpO1xuY29uc3QgcGxheWVyID0gcmVxdWlyZSgnLi9wbGF5ZXIuanMnKTtcbmNvbnN0IGJhY2tncm91bmQgPSByZXF1aXJlKCcuL2JhY2tncm91bmQuanMnKTtcblxubGV0IHJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gICAgICAgIGZ1bmN0aW9uKGNhbGxiYWNrKXtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICB9O1xufSkoKTtcblxubGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbmNhbnZhcy53aWR0aCA9IDgwMDtcbmNhbnZhcy5oZWlnaHQgPSA0MDA7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cblxuXG5mdW5jdGlvbiByZW5kZXJBbGwoKSB7XG5cbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDgwMCwgNDAwKTtcbiAgICBiYWNrZ3JvdW5kSW1hZ2UucmVuZGVyQmFja2dyb3VuZCgpO1xuICAgIERyYWdvbi5yZW5kZXJQbGF5ZXIoKTtcbn1cblxuXG5cblxuXG5sZXQgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xuLy9tYWluIGxvb3BcbmZ1bmN0aW9uIG1haW4oKSB7XG4gICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgbGV0IGRpZmYgPSAobm93IC0gbGFzdFRpbWUpIC8gMTAwMDsgICAgXG5cblxuICAgIERyYWdvbi51cGRhdGVQbGF5ZXIoZGlmZik7XG4gICAgcmVuZGVyQWxsKCk7XG5cbiAgICBsYXN0VGltZSA9IG5vdztcbiAgICByZXF1ZXN0QW5pbUZyYW1lKG1haW4pOyAgICBcbn1cblxubGV0IGRyYWdvbkltZyA9IG5ldyBJbWFnZSgpO1xuZHJhZ29uSW1nLnNyYyA9ICdpbWcvZHJhZ29uLWZseS5wbmcnO1xuXG5sZXQgZHJhZ29uU3ByaXRlID0gbmV3IFNwcml0ZShjdHgsIDk0LCA2NywgZHJhZ29uSW1nLCAxNiwgWzAsMSwyLDNdKTtcbmNvbnN0IGJhY2tncm91bmRJbWFnZSA9IG5ldyBiYWNrZ3JvdW5kKGN0eCk7XG5cbmxldCBEcmFnb24gPSBuZXcgcGxheWVyKGRyYWdvblNwcml0ZSwgWzAsIDBdKTtcblxuXG4vL2V2ZW50IHdoZW4gZmx5aW5nIHVwXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgRHJhZ29uLmZseSh0cnVlKTtcbiAgICB9KTtcblxuLy9ldmVudCB3aGVuIHN0b3AgZmx5aW5nIHVwXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIERyYWdvbi5mbHkoZmFsc2UpO1xuICAgIH0pO1xuXG4vL3N0YXJ0IG1haW4gbG9vcFxuZHJhZ29uSW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBtYWluKTtcblxuXG5cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9