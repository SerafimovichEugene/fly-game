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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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

Sprite.prototype.render = function() {
    
    this.context.clearRect(0, 0, this.width, this.height);

    let roundedDuration = Math.round(this.duration);
    let frame = this.frames[roundedDuration % 4];
    let x = frame * this.width; 
    let y = 0;
    
    console.log('roundedDuration:', roundedDuration);    
    console.log('frame:', frame);
    console.log('x, y: ', x , y);

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
    console.log('diff:', diff);      
    console.log('this.speed:', this.speed);    
    console.log('duration:', this.duration);      
};

module.exports = Sprite;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Sprite = __webpack_require__(0);



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



// dragonImg.src = 'img/dragon-fly.png';
// let elem = document.createElement('img');
// elem.src = 'img/dragon-fly.png';
// console.log(elem);
// document.body.appendChild(elem);

// function Sprite(context, width, height, image, speed, frames) {
    
//     this.context = context;
//     this.width = width;
//     this.height = height;
//     this.image = image;    
//     this.speed = speed;
//     this.frames = frames;

//     this.duration = 0;      
        
// };

// Sprite.prototype.render = function() {
    
//     this.context.clearRect(0, 0, this.width, this.height);

//     let roundedDuration = Math.round(this.duration);
//     let frame = this.frames[roundedDuration % 4]



//     let x = frame * this.width; 
//     let y = 0;

//     console.log('roundedDuration:', roundedDuration);    
//     console.log('frame:', frame);
//     console.log('x, y: ', x , y);

//     this.context.drawImage(
//         this.image,
//         x,
//         y,
//         this.width,
//         this.height,
//         0,
//         0,
//         this.width,
//         this.height);
// }

// Sprite.prototype.update = function(diff) {

//     this.duration += this.speed * diff;
//     console.log('diff:', diff);      
//     console.log('this.speed:', this.speed);    
//     console.log('duration:', this.duration);      
// }

let lastTime = 0;

function main() {
    let now = Date.now();
    let diff = (now - lastTime) / 1000;
    
    dragonSprite.update(diff);
    dragonSprite.render();

    lastTime = now;
    requestAnimFrame(main);    
}


let dragonImg = new Image();
let dragonSprite = new Sprite(ctx, 188, 136, dragonImg, 16, [0,1,2,3]);

dragonImg.addEventListener('load', main);

dragonImg.src = 'img/dragon-fly.png';


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDAzYjY5Mjg3M2JlZTc4NzQzYTAiLCJ3ZWJwYWNrOi8vLy4vanMvc3ByaXRlLmpzIiwid2VicGFjazovLy8uL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCO0FBQ0E7QUFDQTtBQUNBLHNCOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwrQjtBQUNBOztBQUVBLHFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsK0I7QUFDQSwyQztBQUNBLDRDO0FBQ0E7O0FBRUE7Ozs7Ozs7QUM3Q0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBCO0FBQ0E7QUFDQTs7QUFFQSx5Qjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOzs7O0FBSUEsa0M7QUFDQTs7QUFFQSx3RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGtDO0FBQ0EsOEM7QUFDQSwrQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsMkI7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkMDNiNjkyODczYmVlNzg3NDNhMCIsImZ1bmN0aW9uIFNwcml0ZShjb250ZXh0LCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgc3BlZWQsIGZyYW1lcykge1xuICAgIFxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTsgICAgXG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIHRoaXMuZnJhbWVzID0gZnJhbWVzO1xuICAgIHRoaXMuZHVyYXRpb24gPSAwOyAgICAgIFxuICAgICAgICBcbn07XG5cblNwcml0ZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICBsZXQgcm91bmRlZER1cmF0aW9uID0gTWF0aC5yb3VuZCh0aGlzLmR1cmF0aW9uKTtcbiAgICBsZXQgZnJhbWUgPSB0aGlzLmZyYW1lc1tyb3VuZGVkRHVyYXRpb24gJSA0XTtcbiAgICBsZXQgeCA9IGZyYW1lICogdGhpcy53aWR0aDsgXG4gICAgbGV0IHkgPSAwO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCdyb3VuZGVkRHVyYXRpb246Jywgcm91bmRlZER1cmF0aW9uKTsgICAgXG4gICAgY29uc29sZS5sb2coJ2ZyYW1lOicsIGZyYW1lKTtcbiAgICBjb25zb2xlLmxvZygneCwgeTogJywgeCAsIHkpO1xuXG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShcbiAgICAgICAgdGhpcy5pbWFnZSxcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgdGhpcy53aWR0aCxcbiAgICAgICAgdGhpcy5oZWlnaHQsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIHRoaXMud2lkdGgsXG4gICAgICAgIHRoaXMuaGVpZ2h0KTtcbn07XG5cblNwcml0ZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oZGlmZikge1xuXG4gICAgdGhpcy5kdXJhdGlvbiArPSB0aGlzLnNwZWVkICogZGlmZjtcbiAgICBjb25zb2xlLmxvZygnZGlmZjonLCBkaWZmKTsgICAgICBcbiAgICBjb25zb2xlLmxvZygndGhpcy5zcGVlZDonLCB0aGlzLnNwZWVkKTsgICAgXG4gICAgY29uc29sZS5sb2coJ2R1cmF0aW9uOicsIHRoaXMuZHVyYXRpb24pOyAgICAgIFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTcHJpdGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL3Nwcml0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBTcHJpdGUgPSByZXF1aXJlKCcuL3Nwcml0ZS5qcycpO1xuXG5cblxubGV0IHJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gICAgICAgIGZ1bmN0aW9uKGNhbGxiYWNrKXtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgICB9O1xufSkoKTtcblxubGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbmNhbnZhcy53aWR0aCA9IDgwMDtcbmNhbnZhcy5oZWlnaHQgPSA2MDA7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cblxuXG4vLyBkcmFnb25JbWcuc3JjID0gJ2ltZy9kcmFnb24tZmx5LnBuZyc7XG4vLyBsZXQgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuLy8gZWxlbS5zcmMgPSAnaW1nL2RyYWdvbi1mbHkucG5nJztcbi8vIGNvbnNvbGUubG9nKGVsZW0pO1xuLy8gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtKTtcblxuLy8gZnVuY3Rpb24gU3ByaXRlKGNvbnRleHQsIHdpZHRoLCBoZWlnaHQsIGltYWdlLCBzcGVlZCwgZnJhbWVzKSB7XG4gICAgXG4vLyAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbi8vICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4vLyAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4vLyAgICAgdGhpcy5pbWFnZSA9IGltYWdlOyAgICBcbi8vICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4vLyAgICAgdGhpcy5mcmFtZXMgPSBmcmFtZXM7XG5cbi8vICAgICB0aGlzLmR1cmF0aW9uID0gMDsgICAgICBcbiAgICAgICAgXG4vLyB9O1xuXG4vLyBTcHJpdGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICAgIFxuLy8gICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4vLyAgICAgbGV0IHJvdW5kZWREdXJhdGlvbiA9IE1hdGgucm91bmQodGhpcy5kdXJhdGlvbik7XG4vLyAgICAgbGV0IGZyYW1lID0gdGhpcy5mcmFtZXNbcm91bmRlZER1cmF0aW9uICUgNF1cblxuXG5cbi8vICAgICBsZXQgeCA9IGZyYW1lICogdGhpcy53aWR0aDsgXG4vLyAgICAgbGV0IHkgPSAwO1xuXG4vLyAgICAgY29uc29sZS5sb2coJ3JvdW5kZWREdXJhdGlvbjonLCByb3VuZGVkRHVyYXRpb24pOyAgICBcbi8vICAgICBjb25zb2xlLmxvZygnZnJhbWU6JywgZnJhbWUpO1xuLy8gICAgIGNvbnNvbGUubG9nKCd4LCB5OiAnLCB4ICwgeSk7XG5cbi8vICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuLy8gICAgICAgICB0aGlzLmltYWdlLFxuLy8gICAgICAgICB4LFxuLy8gICAgICAgICB5LFxuLy8gICAgICAgICB0aGlzLndpZHRoLFxuLy8gICAgICAgICB0aGlzLmhlaWdodCxcbi8vICAgICAgICAgMCxcbi8vICAgICAgICAgMCxcbi8vICAgICAgICAgdGhpcy53aWR0aCxcbi8vICAgICAgICAgdGhpcy5oZWlnaHQpO1xuLy8gfVxuXG4vLyBTcHJpdGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKGRpZmYpIHtcblxuLy8gICAgIHRoaXMuZHVyYXRpb24gKz0gdGhpcy5zcGVlZCAqIGRpZmY7XG4vLyAgICAgY29uc29sZS5sb2coJ2RpZmY6JywgZGlmZik7ICAgICAgXG4vLyAgICAgY29uc29sZS5sb2coJ3RoaXMuc3BlZWQ6JywgdGhpcy5zcGVlZCk7ICAgIFxuLy8gICAgIGNvbnNvbGUubG9nKCdkdXJhdGlvbjonLCB0aGlzLmR1cmF0aW9uKTsgICAgICBcbi8vIH1cblxubGV0IGxhc3RUaW1lID0gMDtcblxuZnVuY3Rpb24gbWFpbigpIHtcbiAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBsZXQgZGlmZiA9IChub3cgLSBsYXN0VGltZSkgLyAxMDAwO1xuICAgIFxuICAgIGRyYWdvblNwcml0ZS51cGRhdGUoZGlmZik7XG4gICAgZHJhZ29uU3ByaXRlLnJlbmRlcigpO1xuXG4gICAgbGFzdFRpbWUgPSBub3c7XG4gICAgcmVxdWVzdEFuaW1GcmFtZShtYWluKTsgICAgXG59XG5cblxubGV0IGRyYWdvbkltZyA9IG5ldyBJbWFnZSgpO1xubGV0IGRyYWdvblNwcml0ZSA9IG5ldyBTcHJpdGUoY3R4LCAxODgsIDEzNiwgZHJhZ29uSW1nLCAxNiwgWzAsMSwyLDNdKTtcblxuZHJhZ29uSW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBtYWluKTtcblxuZHJhZ29uSW1nLnNyYyA9ICdpbWcvZHJhZ29uLWZseS5wbmcnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9