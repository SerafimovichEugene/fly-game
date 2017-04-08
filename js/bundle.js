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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
    
    this.sprite.context.clearRect(0, 0, 800, 600);
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Sprite = __webpack_require__(1);
const player = __webpack_require__(0);

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
canvas.height = 600;
document.body.appendChild(canvas);

let lastTime = Date.now();

//main loop
function main() {
    let now = Date.now();
    let diff = (now - lastTime) / 1000;    


    Dragon.updatePlayer(diff);
    Dragon.renderPlayer();

    lastTime = now;
    requestAnimFrame(main);    
}

let dragonImg = new Image();
dragonImg.src = 'img/dragon-fly.png';

let dragonSprite = new Sprite(ctx, 94, 67, dragonImg, 16, [0,1,2,3]);

let Dragon = new player(dragonSprite, [0,0]);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGIzNzMwNWZiNDgyZjY2ODQ1M2EiLCJ3ZWJwYWNrOi8vLy4vanMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL2pzL3Nwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ2hFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsZ0Q7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUQ7QUFDQSxLOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHVEO0FBQ0EsaUM7QUFDQSxrQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQjtBQUNBOzs7QUFHQTs7Ozs7OztBQ3BEQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QjtBQUNBO0FBQ0E7QUFDQSxzQjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsK0I7QUFDQSxjOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEM7QUFDQSx1QztBQUNBOztBQUVBOzs7Ozs7O0FDckNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVDOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0EsMkI7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EseUI7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0YjM3MzA1ZmI0ODJmNjY4NDUzYSIsImZ1bmN0aW9uIHBsYXllcihzcHJpdGUsIHBvc2l0aW9uKSB7XG4gICAgXG4gICAgdGhpcy5zcHJpdGUgPSBzcHJpdGU7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMuZ3Jhdml0eSA9IDEwO1xuICAgIHRoaXMuc3BlZWRPZkZhbGxpbmcgPSAwO1xuICAgIHRoaXMuc3RlcCA9IDA7XG5cbiAgICB0aGlzLm9uRmx5ID0gZmFsc2U7XG4gICAgdGhpcy5udW0gPSAxO1xuXG59XG5cbnBsYXllci5wcm90b3R5cGUudXBkYXRlUGxheWVyID0gZnVuY3Rpb24oZGlmZikgeyBcblxuICAgIHRoaXMuc3BlZWRPZkZhbGxpbmcgPSBNYXRoLnBvdygyICogdGhpcy5ncmF2aXR5ICogdGhpcy5zdGVwLCAxLzIpO1xuXG4gICAgaWYodGhpcy5vbkZseSkge1xuICAgICAgICB0aGlzLnN0ZXAgKz0gMTAwO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWzFdIC09IHRoaXMuc3BlZWRPZkZhbGxpbmcgKiBkaWZmO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGVwICs9IDgwO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWzFdICs9IHRoaXMuc3BlZWRPZkZhbGxpbmcgKiBkaWZmOyBcbiAgICB9IFxuICAgIFxuICAgIHRoaXMuc3ByaXRlLnVwZGF0ZShkaWZmKTtcbn1cblxucGxheWVyLnByb3RvdHlwZS5yZW5kZXJQbGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLnNwcml0ZS5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCA4MDAsIDYwMCk7XG4gICAgdGhpcy5zcHJpdGUuY29udGV4dC5zYXZlKCk7XG4gICAgdGhpcy5zcHJpdGUuY29udGV4dC50cmFuc2xhdGUoMCwgdGhpcy5wb3NpdGlvblsxXSk7ICAgIFxuICAgIHRoaXMuc3ByaXRlLnJlbmRlcih0aGlzLm51bSk7ICAgIFxuICAgIHRoaXMuc3ByaXRlLmNvbnRleHQucmVzdG9yZSgpOyAgICBcbn1cblxucGxheWVyLnByb3RvdHlwZS5mbHkgPSBmdW5jdGlvbihhcmcpIHtcbiAgICBcbiAgICBpZighdGhpcy5vbkZseSkge1xuICAgICAgICB0aGlzLnN0ZXAgPSAwO1xuICAgICAgICB0aGlzLm51bSA9IDQ7ICAgICAgICAgICAgXG4gICAgfVxuICAgIGVsc2UgaWYoIWFyZykge1xuICAgICAgICB0aGlzLnN0ZXAgPSAwO1xuICAgICAgICB0aGlzLm51bSA9IDE7XG4gICAgfVxuICAgIHRoaXMub25GbHkgPSBhcmc7ICAgICAgICAgICAgXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBwbGF5ZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL3BsYXllci5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBTcHJpdGUoY29udGV4dCwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIHNwZWVkLCBmcmFtZXMpIHtcbiAgICBcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmltYWdlID0gaW1hZ2U7ICAgIFxuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLmZyYW1lcyA9IGZyYW1lcztcbiAgICB0aGlzLmR1cmF0aW9uID0gMDsgICBcbiAgICAgIFxufTtcblxuU3ByaXRlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihudW0pIHtcbiAgICBcbiAgICAvLyB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIDgwMCwgNjAwKTtcblxuICAgIGxldCByb3VuZGVkRHVyYXRpb24gPSBNYXRoLnJvdW5kKHRoaXMuZHVyYXRpb24pO1xuICAgIGxldCBmcmFtZSA9IHRoaXMuZnJhbWVzW3JvdW5kZWREdXJhdGlvbiAlIG51bV07XG4gICAgbGV0IHggPSBmcmFtZSAqIHRoaXMud2lkdGg7IFxuICAgIGxldCB5ID0gMDsgICAgXG5cbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICB0aGlzLmltYWdlLFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB0aGlzLndpZHRoLFxuICAgICAgICB0aGlzLmhlaWdodCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgdGhpcy53aWR0aCxcbiAgICAgICAgdGhpcy5oZWlnaHQpO1xufTtcblxuU3ByaXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihkaWZmKSB7ICAgIFxuICAgIHRoaXMuZHVyYXRpb24gKz0gdGhpcy5zcGVlZCAqIGRpZmY7ICAgICAgICBcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3ByaXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9zcHJpdGUuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgU3ByaXRlID0gcmVxdWlyZSgnLi9zcHJpdGUuanMnKTtcbmNvbnN0IHBsYXllciA9IHJlcXVpcmUoJy4vcGxheWVyLmpzJyk7XG5cbmxldCByZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICAgfHxcbiAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG4gICAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgfHxcbiAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICB8fFxuICAgICAgICBmdW5jdGlvbihjYWxsYmFjayl7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgfTtcbn0pKCk7XG5cbmxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xubGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5jYW52YXMud2lkdGggPSA4MDA7XG5jYW52YXMuaGVpZ2h0ID0gNjAwO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG5sZXQgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xuXG4vL21haW4gbG9vcFxuZnVuY3Rpb24gbWFpbigpIHtcbiAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBsZXQgZGlmZiA9IChub3cgLSBsYXN0VGltZSkgLyAxMDAwOyAgICBcblxuXG4gICAgRHJhZ29uLnVwZGF0ZVBsYXllcihkaWZmKTtcbiAgICBEcmFnb24ucmVuZGVyUGxheWVyKCk7XG5cbiAgICBsYXN0VGltZSA9IG5vdztcbiAgICByZXF1ZXN0QW5pbUZyYW1lKG1haW4pOyAgICBcbn1cblxubGV0IGRyYWdvbkltZyA9IG5ldyBJbWFnZSgpO1xuZHJhZ29uSW1nLnNyYyA9ICdpbWcvZHJhZ29uLWZseS5wbmcnO1xuXG5sZXQgZHJhZ29uU3ByaXRlID0gbmV3IFNwcml0ZShjdHgsIDk0LCA2NywgZHJhZ29uSW1nLCAxNiwgWzAsMSwyLDNdKTtcblxubGV0IERyYWdvbiA9IG5ldyBwbGF5ZXIoZHJhZ29uU3ByaXRlLCBbMCwwXSk7XG5cblxuLy9ldmVudCB3aGVuIGZseWluZyB1cFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIERyYWdvbi5mbHkodHJ1ZSk7IFxuICAgIH0pO1xuXG4vL2V2ZW50IHdoZW4gc3RvcCBmbHlpbmcgdXBcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgRHJhZ29uLmZseShmYWxzZSk7XG4gICAgfSk7XG5cbi8vc3RhcnQgbWFpbiBsb29wXG5kcmFnb25JbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG1haW4pO1xuXG5cblxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=