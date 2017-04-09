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
    
    return false;
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
        console.log(this.position[1]);
    }
    else {
        this.step += 50;
        this.position[1] += this.speedOfFalling * diff;
        console.log(this.position[1]);
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
    // console.log('time ', time);
    // console.log('% ', time % 16);
    
    if(time % 200 == 199){
        
        this.wallArray.push(new wall([810, 0], 20, 170));
        this.wallArray.push(new wall([810, 230], 20, 170));
        console.log('in arr', this.wallArray.length);
    }
    this.wallArray.forEach((value, index, array) => {
        value.position[0] -= 1;        
    });

    this.wallArray.forEach((value, index, array)=>{
        if(value.position[0] < -20) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzY1ZDZkMmUzNTVlZTA1MWRiY2EiLCJ3ZWJwYWNrOi8vLy4vanMvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9qcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvc3ByaXRlLmpzIiwid2VicGFjazovLy8uL2pzL3dhbGxzLmpzIiwid2VicGFjazovLy8uL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0Q7O0FBRUE7QUFDQTtBQUNBLHFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7O0FDL0JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx1RDtBQUNBLGlDO0FBQ0Esa0M7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EscUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUI7QUFDQTs7O0FBR0E7Ozs7Ozs7QUNyREE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUI7QUFDQTtBQUNBO0FBQ0Esc0I7O0FBRUE7O0FBRUEseUM7O0FBRUE7QUFDQTtBQUNBLCtCO0FBQ0EsYzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBDO0FBQ0EsdUM7QUFDQTs7QUFFQTs7Ozs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEM7O0FBRUEsa0JBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0I7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7Ozs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7QUFJQTtBQUNBOztBQUVBO0FBQ0EsdUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEs7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3NjVkNmQyZTM1NWVlMDUxZGJjYSIsImZ1bmN0aW9uIGJhY2tncm91bmQgKGNvbnRleHQpIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICB0aGlzLmltYWdlLnNyYyA9ICdpbWcvYmFja2dyb3VuZDEucG5nJztcbiAgICB0aGlzLndpZHRoID0gODAwO1xuICAgIHRoaXMuaGVpZ3RoID0gNDAwO1xuICAgIHRoaXMuc3RlcCA9IDA7XG59O1xuXG5iYWNrZ3JvdW5kLnByb3RvdHlwZS5yZW5kZXJCYWNrZ3JvdW5kID0gZnVuY3Rpb24oKSB7ICAgIFxuXG4gICAgKyt0aGlzLnN0ZXA7XG4gICAgaWYodGhpcy5zdGVwID09IDgwMCkge1xuICAgICAgIHRoaXMuc3RlcCA9IDA7IFxuICAgIH1cbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDAsIDAsIHRoaXMuc3RlcCwgNDAwLCB0aGlzLndpZHRoLXRoaXMuc3RlcCwgMCx0aGlzLnN0ZXAsIDQwMCk7XG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnN0ZXAsIDAsIHRoaXMud2lkdGgtdGhpcy5zdGVwLCA0MDAsIDAsIDAsIHRoaXMud2lkdGgtdGhpcy5zdGVwLCA0MDApO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiYWNrZ3JvdW5kO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9iYWNrZ3JvdW5kLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIGNoZWNrKHBsYXllciwgd2FsbHMsIGNhbnZhcykge1xuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICAgIHRoaXMud2FsbHMgPSB3YWxscztcbiAgICB0aGlzLmZpZWxkID0gY2FudmFzO1xuXG59XG5cbmNoZWNrLnByb3RvdHlwZS5jaGVja0ludGVyc2VjdGlvbnMgPSBmdW5jdGlvbigpe1xuXG4gICAgcmV0dXJuIHRoaXMuaWZPdXRPZkZpZWxkKCkgfHwgdGhpcy5pZldhbGwoKTtcblxufVxuXG5jaGVjay5wcm90b3R5cGUuaWZPdXRPZkZpZWxkID0gZnVuY3Rpb24oKSB7XG5cbiAgICBpZih0aGlzLnBsYXllci5wb3NpdGlvblsxXTwgLTEwKSB7XG4gICAgICAgIHRoaXMucGxheWVyLnBvc2l0aW9uWzFdID0gLTEwO1xuICAgIH1cbiAgICBlbHNlIGlmKHRoaXMucGxheWVyLnBvc2l0aW9uWzFdID4gMzUwKSB7XG4gICAgICAgIHRoaXMucGxheWVyLnBvc2l0aW9uWzFdID0gMzUwO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuXG59XG5cbmNoZWNrLnByb3RvdHlwZS5pZldhbGwgPSBmdW5jdGlvbigpIHtcbiAgICBcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2s7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NoZWNrLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIHBsYXllcihzcHJpdGUsIHBvc2l0aW9uKSB7XG4gICAgXG4gICAgdGhpcy5zcHJpdGUgPSBzcHJpdGU7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMuZ3Jhdml0eSA9IDEwO1xuICAgIHRoaXMuc3BlZWRPZkZhbGxpbmcgPSAwO1xuICAgIHRoaXMuc3RlcCA9IDA7XG5cbiAgICB0aGlzLm9uRmx5ID0gZmFsc2U7XG4gICAgdGhpcy5udW0gPSAxO1xuXG59XG5cbnBsYXllci5wcm90b3R5cGUudXBkYXRlUGxheWVyID0gZnVuY3Rpb24oZGlmZikge1xuXG4gICAgdGhpcy5zcGVlZE9mRmFsbGluZyA9IE1hdGgucG93KDIgKiB0aGlzLmdyYXZpdHkgKiB0aGlzLnN0ZXAsIDEvMik7XG5cbiAgICBpZih0aGlzLm9uRmx5KSB7XG4gICAgICAgIHRoaXMuc3RlcCArPSAxMDA7XG4gICAgICAgIHRoaXMucG9zaXRpb25bMV0gLT0gdGhpcy5zcGVlZE9mRmFsbGluZyAqIGRpZmY7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucG9zaXRpb25bMV0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGVwICs9IDUwO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWzFdICs9IHRoaXMuc3BlZWRPZkZhbGxpbmcgKiBkaWZmO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBvc2l0aW9uWzFdKTtcbiAgICB9IFxuICAgIFxuICAgIHRoaXMuc3ByaXRlLnVwZGF0ZShkaWZmKTtcbn1cblxucGxheWVyLnByb3RvdHlwZS5yZW5kZXJQbGF5ZXIgPSBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuc3ByaXRlLmNvbnRleHQuc2F2ZSgpO1xuICAgIHRoaXMuc3ByaXRlLmNvbnRleHQudHJhbnNsYXRlKDAsIHRoaXMucG9zaXRpb25bMV0pOyAgICBcbiAgICB0aGlzLnNwcml0ZS5yZW5kZXIodGhpcy5udW0pOyAgICBcbiAgICB0aGlzLnNwcml0ZS5jb250ZXh0LnJlc3RvcmUoKTsgICAgXG59XG5cbnBsYXllci5wcm90b3R5cGUuZmx5ID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgXG4gICAgaWYoIXRoaXMub25GbHkpIHtcbiAgICAgICAgdGhpcy5zdGVwID0gMDtcbiAgICAgICAgdGhpcy5udW0gPSA0OyAgICAgICAgICAgIFxuICAgIH1cbiAgICBlbHNlIGlmKCFhcmcpIHtcbiAgICAgICAgdGhpcy5zdGVwID0gMDtcbiAgICAgICAgdGhpcy5udW0gPSAxO1xuICAgIH1cbiAgICB0aGlzLm9uRmx5ID0gYXJnOyAgICAgICAgICAgIFxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gcGxheWVyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9wbGF5ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gU3ByaXRlKGNvbnRleHQsIHdpZHRoLCBoZWlnaHQsIGltYWdlLCBzcGVlZCwgZnJhbWVzKSB7XG4gICAgXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5pbWFnZSA9IGltYWdlOyAgICBcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5mcmFtZXMgPSBmcmFtZXM7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7ICAgXG4gICAgICBcbn07XG5cblNwcml0ZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24obnVtKSB7ICAgXG5cbiAgICBsZXQgcm91bmRlZER1cmF0aW9uID0gTWF0aC5yb3VuZCh0aGlzLmR1cmF0aW9uKTtcbiAgICBsZXQgZnJhbWUgPSB0aGlzLmZyYW1lc1tyb3VuZGVkRHVyYXRpb24gJSBudW1dO1xuICAgIGxldCB4ID0gZnJhbWUgKiB0aGlzLndpZHRoOyBcbiAgICBsZXQgeSA9IDA7ICAgIFxuXG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShcbiAgICAgICAgdGhpcy5pbWFnZSxcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgdGhpcy53aWR0aCxcbiAgICAgICAgdGhpcy5oZWlnaHQsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIHRoaXMud2lkdGgsXG4gICAgICAgIHRoaXMuaGVpZ2h0KTtcbn07XG5cblNwcml0ZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oZGlmZikgeyAgICBcbiAgICB0aGlzLmR1cmF0aW9uICs9IHRoaXMuc3BlZWQgKiBkaWZmOyAgICAgICAgXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNwcml0ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvc3ByaXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIHdhbGxzIChjb250ZXh0KSB7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLndhbGxBcnJheSA9IFtdO1xuICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICB0aGlzLmltYWdlLnNyYyA9ICdpbWcvd2FsbC5wbmcnO1xuICAgIFxufVxuXG5mdW5jdGlvbiB3YWxsIChwb3MsIHdpZHRoLCBoZWlndGgpIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWd0aCA9IGhlaWd0aDtcbn1cblxud2FsbHMucHJvdG90eXBlLnJlbmRlcldhbGxzID0gZnVuY3Rpb24oKSB7ICAgICBcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndhbGxBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICAgICAgdGhpcy5pbWFnZSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0ud2lkdGgsXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5oZWlndGgsXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5wb3NpdGlvblswXSxcbiAgICAgICAgICAgIHRoaXMud2FsbEFycmF5W2ldLnBvc2l0aW9uWzFdLFxuICAgICAgICAgICAgdGhpcy53YWxsQXJyYXlbaV0ud2lkdGgsXG4gICAgICAgICAgICB0aGlzLndhbGxBcnJheVtpXS5oZWlndGgpO1xuICAgIH1cbn1cblxubGV0IHRpbWUgPSAwO1xuXG53YWxscy5wcm90b3R5cGUudXBkYXRlV2FsbHMgPSBmdW5jdGlvbihkaWZmKSB7XG5cbiAgICBcbiAgICB0aW1lICs9IE1hdGgucm91bmQoZGlmZiAqIDYwKTtcbiAgICAvLyBjb25zb2xlLmxvZygndGltZSAnLCB0aW1lKTtcbiAgICAvLyBjb25zb2xlLmxvZygnJSAnLCB0aW1lICUgMTYpO1xuICAgIFxuICAgIGlmKHRpbWUgJSAyMDAgPT0gMTk5KXtcbiAgICAgICAgXG4gICAgICAgIHRoaXMud2FsbEFycmF5LnB1c2gobmV3IHdhbGwoWzgxMCwgMF0sIDIwLCAxNzApKTtcbiAgICAgICAgdGhpcy53YWxsQXJyYXkucHVzaChuZXcgd2FsbChbODEwLCAyMzBdLCAyMCwgMTcwKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbiBhcnInLCB0aGlzLndhbGxBcnJheS5sZW5ndGgpO1xuICAgIH1cbiAgICB0aGlzLndhbGxBcnJheS5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgIHZhbHVlLnBvc2l0aW9uWzBdIC09IDE7ICAgICAgICBcbiAgICB9KTtcblxuICAgIHRoaXMud2FsbEFycmF5LmZvckVhY2goKHZhbHVlLCBpbmRleCwgYXJyYXkpPT57XG4gICAgICAgIGlmKHZhbHVlLnBvc2l0aW9uWzBdIDwgLTIwKSB7XG4gICAgICAgICAgICBhcnJheS5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YWxscztcblxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL3dhbGxzLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFNwcml0ZSA9IHJlcXVpcmUoJy4vc3ByaXRlLmpzJyk7XG5jb25zdCBwbGF5ZXIgPSByZXF1aXJlKCcuL3BsYXllci5qcycpO1xuY29uc3QgYmFja2dyb3VuZCA9IHJlcXVpcmUoJy4vYmFja2dyb3VuZC5qcycpO1xuY29uc3Qgd2FsbHMgPSByZXF1aXJlKCcuL3dhbGxzLmpzJyk7XG5jb25zdCBjaGVjayA9IHJlcXVpcmUoJy4vY2hlY2suanMnKTtcblxubGV0IHJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gICAgICAgIGZ1bmN0aW9uKGNhbGxiYWNrKXtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICB9O1xufSkoKTtcblxubGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbmNhbnZhcy53aWR0aCA9IDgwMDtcbmNhbnZhcy5oZWlnaHQgPSA0MDA7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbmZ1bmN0aW9uIHJlbmRlckFsbCgpIHtcblxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgODAwLCA0MDApO1xuICAgIGJhY2tncm91bmRJbWFnZS5yZW5kZXJCYWNrZ3JvdW5kKCk7XG4gICAgZHJhZ29uLnJlbmRlclBsYXllcigpO1xuICAgIHdhbGxBcnJheS5yZW5kZXJXYWxscygpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBbGwoZGlmZikge1xuICAgIGRyYWdvbi51cGRhdGVQbGF5ZXIoZGlmZik7XG4gICAgd2FsbEFycmF5LnVwZGF0ZVdhbGxzKGRpZmYpO1xuXG4gICAgSXNHYW1lT3ZlciA9IGNoZWNrT2JqLmNoZWNrSW50ZXJzZWN0aW9ucygpO1xufVxuXG5cblxuLy9tYWluIGxvb3BcbmZ1bmN0aW9uIG1haW4oKSB7XG5cbiAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBsZXQgZGlmZiA9IChub3cgLSBsYXN0VGltZSkgLyAxMDAwOyAgICBcbiAgICB1cGRhdGVBbGwoZGlmZik7XG4gICAgcmVuZGVyQWxsKCk7XG4gICAgbGFzdFRpbWUgPSBub3c7XG4gIFxuICAgIGlmKCFJc0dhbWVPdmVyKSB7XG4gICAgICAgIHJlcXVlc3RBbmltRnJhbWUobWFpbik7XG4gICAgfSAgIFxufVxuXG5sZXQgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xubGV0IGRyYWdvbiwgd2FsbEFycmF5LCBiYWNrZ3JvdW5kSW1hZ2UsIGNoZWNrT2JqO1xubGV0IElzR2FtZU92ZXIgPSBmYWxzZTtcblxuZnVuY3Rpb24gbG9hZENvbnRlbnQoKSB7XG4gICAgY29uc3QgZHJhZ29uSW1nID0gbmV3IEltYWdlKCdpbWcvZHJhZ29uLWZseS5wbmcnKTtcbiAgICBkcmFnb25JbWcuc3JjID0gJ2ltZy9kcmFnb24tZmx5LnBuZyc7XG4gICAgXG4gICAgYmFja2dyb3VuZEltYWdlID0gbmV3IGJhY2tncm91bmQoY3R4KTtcblxuICAgIGRyYWdvbiA9IG5ldyBwbGF5ZXIobmV3IFNwcml0ZShjdHgsIDk0LCA2NywgZHJhZ29uSW1nLCAxNiwgWzAsMSwyLDNdKSwgWzAsIDBdKTtcblxuICAgIHdhbGxBcnJheSA9IG5ldyB3YWxscyhjdHgpO1xuXG4gICAgY2hlY2tPYmogPSBuZXcgY2hlY2soZHJhZ29uLCB3YWxsQXJyYXksIGNhbnZhcyk7XG5cbiAgICBtYWluKCk7XG59XG5cblxuXG4vL2V2ZW50IHdoZW4gZmx5aW5nIHVwXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZHJhZ29uLmZseSh0cnVlKTtcbiAgICB9KTtcblxuLy9ldmVudCB3aGVuIHN0b3AgZmx5aW5nIHVwXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGRyYWdvbi5mbHkoZmFsc2UpO1xuICAgIH0pO1xuXG4vL2xvYWQgaW1hZ2VzIGFuZCBzdGFydCBtYWluIGxvb3BcbmxvYWRDb250ZW50KCk7XG5cblxuXG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==