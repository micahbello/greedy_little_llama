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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const SPRITES = {
  leftPosition1: [19, 77, 25, 44],
  leftPosition2: [82, 77, 25, 44],
  leftPosition3: [145, 77, 25, 44],
  leftPosition4: [208, 77, 25, 44],

  rightPosition1: [20, 204, 25, 44],
  rightPosition2: [83, 204, 25, 44],
  rightPosition3: [146, 204, 25, 44],
  rightPosition4: [209, 204, 25, 44],

  jumpPosition1: [19, 12, 25, 50],
  jumpPosition2: [82, 12, 25, 50],
  jumpPosition3: [145, 12, 25, 50],
  jumpPosition4: [208, 12, 25, 50]
}

class Jumper {
  constructor(color, height, width, x, y) {
    this.color = color;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.jumped = false;
    this.keysPressed = [];
    this.velocity = 0;
    this.jumpPower = -13;
    this.health = 5;
    this.status = "normal"
    this.statusClock = 0;
    this.walkCycle = 0;
    this.spritesheet = new Image();
    this.spritesheet.src = './assets/images/llama-sprite.png';
    this.lastDirectionFaced = "none"
  }

  keyDownHandler(e) {
    this.keysPressed[e.keyCode] = (e.type === "keydown")
  }

  keyUpHandler(e) {
    this.keysPressed[e.keyCode] = (e.type === "keydown");

    if (e.keyCode === 37) {
      this.lastDirectionFaced = "left";
    } else if (e.keyCode === 39) {
      this.lastDirectionFaced = "right";
    }
  }

  getSprite() {

    if (this.status === "super-jump"){
      this.spritesheet.src = "./assets/images/llama-green-sprite.png"
    } else if (this.status === "invincibility") {
      this.spritesheet.src = "./assets/images/llama-yellow-sprite.png"
    } else {
      this.spritesheet.src = './assets/images/llama-sprite.png';
    }

    if (!this.keysPressed[39] && !this.keysPressed[37] && !this.keysPressed[38]) {
      this.walkCycle = 0;
        if (this.lastDirectionFaced === "none" || this.lastDirectionFaced === "right") {
      return SPRITES.rightPosition1;
    } else if (this.lastDirectionFaced === "left") {
      return SPRITES.leftPosition1;
        }
    } else if (this.keysPressed[39] === true) {
      this.walkCycle += 1;
      if (this.walkCycle < 2) {
        return SPRITES.rightPosition1;
      } else if (this.walkCycle < 20) {
        return SPRITES.rightPosition2;
      } else if (this.walkCycle < 55) {
        return SPRITES.rightPosition3;
      } else if (this.walkCycle < 65) {
        return SPRITES.rightPosition4;
      } else {
        this.walkCycle = 0;
        return SPRITES.rightPosition1;
      }
    } else if (this.keysPressed[37] === true) {
      this.walkCycle += 1;
      if (this.walkCycle < 2) {
        return SPRITES.leftPosition1;
      } else if (this.walkCycle < 20) {
        return SPRITES.leftPosition2;
      } else if (this.walkCycle < 55) {
        return SPRITES.leftPosition3;
      } else if (this.walkCycle < 65) {
        return SPRITES.leftPosition4;
      } else {
        this.walkCycle = 0;
        return SPRITES.leftPosition1;
      }
    } else if (this.keysPressed[38] === true) {
      this.walkCycle += 1;
      if (this.walkCycle < 35) {
        return SPRITES.jumpPosition1;
      } else if (this.walkCycle < 45) {
        return SPRITES.jumpPosition2;
      } else if (this.walkCycle < 55) {
        return SPRITES.jumpPosition3;
      } else if (this.walkCycle < 65) {
        return SPRITES.jumpPosition4;
      } else {
        this.walkCycle = 0;
        return SPRITES.jumpPosition1;
      }
    }
  }

  draw(ctx) {
    // ctx.fillStyle = this.color;    //comment out, use for testing
    // ctx.fillRect(this.x, this.y, this.width, this.height);  //comment out, use for testing
    let sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y, sprite[2], sprite[3])
  }


  update(ctx) {
    console.log(this.velocity);

    ctx.clearRect(0, 0, 600, 300);

      if (this.keysPressed[37] && this.keysPressed[38] && this.x > 0 && this.jumped === false) {
        this.x -= 1;
        this.velocity = this.jumpPower;
        this.jumped = true
      }
      else if (this.keysPressed[39] && this.keysPressed[38] && this.x < 575 && this.jumped === false) {
        this.x += 1;
        this.velocity = this.jumpPower;
        this.jumped = true
      }
      else if (this.keysPressed[37] && this.x > 0) {              //left
        this.x -= 1;
      }
      else if (this.keysPressed[39] && this.x < 575) {             //rigth
        this.x += 1;
      }
      else if (this.keysPressed[38] && this.jumped === false) {    //up
        this.velocity = this.jumpPower;
        this.jumped = true;
      }

      if (this.velocity < 0) {
        this.velocity += 1;
      } else {
        this.velocity += 0.019;  //this slows the llama down when he jumps
      }

      this.y += this.velocity

      if (this.y > 270 || this.y === 270) {
        this.y = 270;
        this.jumped = false;
        this.velocity = 0;
      }

      this.draw(ctx);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Jumper);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Ledge {
  constructor(color, x, y, speed, direction, trackNumber) {
    this.color = color;
    this.height = 10;
    this.width = 100;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = direction;
    this.trackNumber = trackNumber;
    this.image = new Image();
    this.image.src = "./assets/images/cloud-image.png";
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, this.width, this.height);  //comment out, use for testing
    ctx.drawImage(this.image, 0, 6, 100, 30 ,this.x, this.y - 7, 100, 30)

  }

  update(ctx) {
    this.draw(ctx);
    this.x += this.speed
  }
  
}

/* harmony default export */ __webpack_exports__["a"] = (Ledge);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const SPRITES = {
  leftPosition1: [19, 100, 33, 25],
  leftPosition2: [92, 100, 33, 25],
  leftPosition3: [164, 100, 33, 25],
  leftPosition4: [237, 100, 33, 25],

  rightPosition1: [21, 247, 33, 25],
  rightPosition2: [94, 247, 33, 25],
  rightPosition3: [168, 247, 33, 25],
  rightPosition4: [241, 247, 33, 25],

  heart:[-5, -2, 35, 20],
  star: [-3, 2, 35, 20],
  taco: [11, 5, 35, 20],
  mud: [0, 9, 35, 24]
}

class Ball {
  constructor(color, x, y, radius) {

    let colors = {"black": "deadly", "red": "healing",
                  "green": "super-jump", "yellow": "invincibility",
                  "brown": "ball-reducer"}

    let sources = {"black": './assets/images/pig-ball-sprite-sheet.png',
                    "red": "./assets/images/heart-image.png",
                    "green": "./assets/images/taco-image.png",
                    "yellow": "./assets/images/star-image.png",
                    "brown": "./assets/images/mud-image.png"}

    this.color = color;
    this.x = x;
    this.y = y;
    this.radius = 9;
    this.type = colors[color];
    this.angle = 45;
    this.speed = .8;
    this.radians = this.angle * Math.PI/ 180;
    this.dx = Math.cos(this.radians) * this.speed;
    this.dy = Math.sin(this.radians) * this.speed;
    this.status = "nothit";
    this.statusCount = 0;
    this.spritesheet = new Image();
    this.spritesheet.src = sources[color];
    this.ballCycle = 0;

    //for tests
    this.collisionTimer = 0;
    this.xPositions = [];

  }

  ballsColliding(ball) {
    let xDistance = ball.x - this.x;
      let yDistance = ball.y - this.y;

      let distance = Math.sqrt(Math.pow(xDistance, 2) +
      Math.pow(yDistance, 2));

      let minDistance = this.radius + ball.radius;

      if (distance < minDistance) {
        ball.dy = -ball.dy;
      }
  }

  getSprite() {

    this.ballCycle += 1;

    if (this.type === "deadly") {
      if (this.dx === Math.abs(this.dx)) {
        if (this.x < 0 && this.x > 5) {
          this.ballCycle = 0;
        }
          if (this.ballCycle < 55) {
            return SPRITES.rightPosition1;
          } else if (this.ballCycle < 75) {
            return SPRITES.rightPosition2;
          } else if (this.ballCycle < 95) {
            return SPRITES.rightPosition3;
          } else if (this.ballCycle < 115) {
            return SPRITES.rightPosition4;
          } else {
            this.ballCycle = 0;
            return SPRITES.rightPosition1;
          }

      } else {
        if (this.x > 600 && this.x < 595) {
          this.ballCycle = 0;
        }
          if (this.ballCycle < 55) {
            return SPRITES.leftPosition1;
          } else if (this.ballCycle < 75) {
            return SPRITES.leftPosition2;
          } else if (this.ballCycle < 95) {
            return SPRITES.leftPosition3;
          } else if (this.ballCycle < 115) {
            return SPRITES.leftPosition4;
          } else {
            this.ballCycle = 0;
            return SPRITES.leftPosition1;
          }
      }
    } else if (this.type === "healing") {
      return SPRITES.heart;
    } else if (this.type === "invincibility") {
      return SPRITES.star;

    } else if (this.type === "super-jump") {
      return SPRITES.taco;
    } else if (this.type === "ball-reducer"){
      return SPRITES.mud;
    }
  }


  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    // ctx.fillStyle = this.color;     //comment in for tests
    // ctx.fill();                     //comment in for tests
    ctx.closePath();
    this.x += this.dx;
    this.y += this.dy;

    let sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x - 15, this.y - 10, sprite[2], sprite[3])
    }


  update(ctx) {

    //for tests
    // if (this.color === "pink") {
    //   console.log(`${this.collisionTimer}`)
    // }
    //for tests

    if (this.x > 600) {
      this.x = 590;
      this.angle = 180 - this.angle;
      this.radians = this.angle * Math.PI/ 180;
      this.dx = Math.cos(this.radians) * this.speed;
      this.dy = Math.sin(this.radians) * this.speed;
    } else if (this.x < 0) {
      this.x = 6;
      this.angle = 180 - this.angle;
      this.radians = this.angle * Math.PI/ 180;
      this.dx = Math.cos(this.radians) * this.speed;
      this.dy = Math.sin(this.radians) * this.speed;
    } else if ((this.y < 0)) {
      this.y = 6;
      this.angle = 360 - this.angle;
      this.radians = this.angle * Math.PI/ 180;
      this.dx = Math.cos(this.radians) * this.speed;
      this.dy = Math.sin(this.radians) * this.speed;
    } else if ((this.y + this.radius ) > 300) {
      this.y = 290;
      this.angle = 360 - this.angle;
      this.radians = this.angle * Math.PI/ 180;
      this.dx = Math.cos(this.radians) * this.speed;
      this.dy = Math.sin(this.radians) * this.speed;
    }
    this.draw(ctx);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Ball);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const SPRITES = {
  position1: [15, 13, 27, 29],
  position2: [49, 13, 27, 29],
  position3: [83, 13, 27, 29],
  position4: [115, 13, 27, 29]
}


class Prize {
  constructor(x, y) {
    this.color = "blue";
    this.height = 25;
    this.width = 25;
    this.x = x;
    this.y = y;
    this.spritesheet = new Image();
    this.spritesheet.src = './assets/images/coin-sprite.png';
    this.coinCycle = 0;
  }

  getSprite() {
    this.coinCycle += 1;

    if (this.coinCycle < 35) {
      return SPRITES.position1;
    } else if (this.coinCycle < 45) {
      return SPRITES.position2;
    } else if (this.coinCycle < 55) {
      return SPRITES.position3;
    } else if (this.coinCycle < 65) {
      return SPRITES.position4;
    } else {
      this.coinCycle = 0;
      return SPRITES.position1;
    }
  }

  draw(ctx) {
    // ctx.fillStyle = this.color;                                 //comment out
    // ctx.fillRect(this.x, this.y, this.width, this.height);      //commnt out

    let sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y, sprite[2], sprite[3])
  }


  prizeFlash() {
    if (this.color === "blue") {
      this.color = "red";
    } else {
      this.color = "blue";
    }
  }

  update(ctx) {
    this.draw(ctx);
  }
}


/* harmony default export */ __webpack_exports__["a"] = (Prize);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_game__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_jumping_person__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_ledge__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_ball__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_prize__ = __webpack_require__(3);






document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("mycanvas");
  const ctx = canvasEl.getContext("2d");

  canvasEl.width = 600;
  canvasEl.height = 300;

  let jumperMan = new __WEBPACK_IMPORTED_MODULE_1__lib_jumping_person__["a" /* default */]("red", 30, 25, 0, 275)


  let balls = [
  new __WEBPACK_IMPORTED_MODULE_3__lib_ball__["a" /* default */]("black", 150, 150),
  // new Ball("yellow", 10, 150), // TESTS
  // // new Ball("pink", 100, 150), //
  // new Ball("green", 50, 150), //
  // new Ball("yellow", 10, 200), //
  // // new Ball("pink", 100, 10), //
  // new Ball("green", 50, 70) //
  ];

  let ledges = [];


  let randomXCoord = (min, max) => {                //used for placing the prize
    return Math.random() * (max - min) + min;
  }

  let randomYCoord = (min, max) => {                //used for placing the prize
    return Math.random() * (max - min) + min;
  }

  let prize = new __WEBPACK_IMPORTED_MODULE_4__lib_prize__["a" /* default */](randomXCoord(10, 550), randomYCoord(0, 250))


  let game = new __WEBPACK_IMPORTED_MODULE_0__lib_game__["a" /* default */](jumperMan, balls, ledges, prize, ctx);
  let specialBalls = ["red", "green", "yellow", "brown"]


  window.addEventListener("keydown", (e) => game.keyDownHandler(e));
  window.addEventListener("keydown", (e) => jumperMan.keyDownHandler(e));
  window.addEventListener("keyup", (e) => jumperMan.keyUpHandler(e));

  // const audio = document.getElementById("salvation");
  // audio.play();
  //
  // const audio = new Audio("./assets/audio/sneakysnitch.mp3");
  // audio.play();

  setInterval(() => game.loop(), 2);
  // setInterval(() => game.prize.prizeFlash(), 150)   //no longer needed since coin is spinning
  setInterval(() => game.newBall(specialBalls[Math.floor(Math.random() * 4)]), 15000);
  setInterval(() => game.checkJumperStatus(), 1000);
  setInterval(() => game.newLegdes(), 700);     // commented out for testing

  setInterval(() => game.detectLongCollision(), 350)

});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jumping_person__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ledge__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ball__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__prize__ = __webpack_require__(3);





class Game {
  constructor(jumper, balls, ledges, prize, ctx) {
    this.jumper = jumper;
    this.balls = balls;
    this.ledges = ledges;
    this.prize = prize;
    this.ctx = ctx;
    this.score = 0;
    this.inSession = true;
    this.pigAudio = new Audio("./assets/audio/pig.m4a")
  }

  checkJumperStatus() {
    this.jumper.statusClock += 1;
    if (this.jumper.statusClock > 10 && this.jumper.status === "invincibility") {
      this.jumper.status = "normal";
      this.jumper.statusClock = 0;
      this.jumper.color = "red";
    } else if (this.jumper.statusClock > 10 && this.jumper.status === "super-jump") {
      this.jumper.status = "normal";
      this.jumper.statusClock = 0;
      this.jumper.jumpPower = -13;
      this.jumper.color = "red";
    }
  }

  drawScore(ctx) {
    ctx.font = "16px Monospace";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${this.score} | Health: ${this.jumper.health}`, 8, 20);
  }

  allowReset(ctx) {
    ctx.font = "24px Monospace";
    ctx.fillStyle = "black";
    ctx.fillText(`Your score: ${this.score}`, 220, 160);
    ctx.fillText("Press enter to face the pigs again", 70, 180);
  }

  keyDownHandler(e) {                                         //this method allows for a restart after game over.
   if (e.keyCode === 13 && this.inSession === false) {
     let randomXCoord = (min, max) => {
       return Math.random() * (max - min) + min;
     }

     let randomYCoord = (min, max) => {
       return Math.random() * (max - min) + min;
     }

     this.ledges = [];
     this.balls = [new __WEBPACK_IMPORTED_MODULE_2__ball__["a" /* default */]("black", 150, 150)];
     this.prize = new __WEBPACK_IMPORTED_MODULE_3__prize__["a" /* default */](randomXCoord(10, 550), randomYCoord(0, 250));
     this.score = 0;
     this.inSession = true;
     this.jumper = new __WEBPACK_IMPORTED_MODULE_0__jumping_person__["a" /* default */]("red", 30, 25, 0, 275);

     window.addEventListener("keydown", (e) => this.jumper.keyDownHandler(e));
     window.addEventListener("keyup", (e) => this.jumper.keyUpHandler(e));
   }
  }

  ledgeSpeed(trackNumber) {

    let randomSpeed = (min, max) => {
      return Math.random() * (max - min) + min;
    }

    for (let i = 0; i < this.ledges.length; i++) {
      if (this.ledges[i].trackNumber === trackNumber) {
        return this.ledges[i].speed;
      }
    }
    return randomSpeed(.3, .5);
  }


  ledgeStartPosition(trackNumber, trackDirection) {    // this is not working as expected!

    let randomXCoord = (min, max) => {
      return Math.random() * (max - min) + min;
    }

    for (let i = this.ledges.length - 1; i > 0; i--) {
      if (this.ledges[i].trackNumber === trackNumber
          && this.ledges[i].trackDirection === "right"
          && this.ledges[i].x > 10) {
          return -(randomXCoord(100, 800));
      } else if (this.ledges[i].trackNumber === trackNumber
          && this.ledges[i].trackDirection === "left"
          && this.ledges[i].x < 490) {
          return (randomXCoord(600, 1000));
      } else if (this.ledges[i].trackNumber === trackNumber
          && this.ledges[i].trackDirection === "right"
          && this.ledges[i].x < 0) {
          return (randomXCoord(this.ledges[i].x - 130), this.ledges[i].x - 600);
      } else if (this.ledges[i].trackNumber === trackNumber
          && this.ledges[i].trackDirection === "left"
          && this.ledges[i].x > 500) {
          return (randomXCoord(this.ledges[i].x + 120, this.ledges[i].x + 600));
      }
    }

    if (trackDirection === "right") {
      return -(randomXCoord(100, 800));
    } else {
      return (randomXCoord(600, 1000));
    }
  }

  newLegdes() {
    let randomYCoord = (min, max) => {
      return Math.random() * (max - min) + min;
    }
      //track 1 from y 37 - 60 going left

      if (!(this.ledges.length > 15)) {

      this.ledges.push(new __WEBPACK_IMPORTED_MODULE_1__ledge__["a" /* default */]("#8FBC8F", this.ledgeStartPosition("one", "left"), randomYCoord(37.5, 37.5),
      -(this.ledgeSpeed("one")), "left", "one"));

      //track 2 from y 75 - 90 going right

      this.ledges.push(new __WEBPACK_IMPORTED_MODULE_1__ledge__["a" /* default */]("#8FBC8F", this.ledgeStartPosition("two", "right"), randomYCoord(75, 75),
      this.ledgeSpeed("two"), "right", "two"));

      //track 3 from y 108 - 130 going left

      this.ledges.push(new __WEBPACK_IMPORTED_MODULE_1__ledge__["a" /* default */]("#8FBC8F", this.ledgeStartPosition("three", "left"), randomYCoord(108, 108),
      -(this.ledgeSpeed("three")), "left", "three"));

      //track 4 from y 150 - 170 going right

      this.ledges.push(new __WEBPACK_IMPORTED_MODULE_1__ledge__["a" /* default */]("#8FBC8F", this.ledgeStartPosition("four", "right"), randomYCoord(150, 150),
      this.ledgeSpeed("four"), "right", "four"));

      //track 5 from y 187 - 210 going left

      this.ledges.push(new __WEBPACK_IMPORTED_MODULE_1__ledge__["a" /* default */]("#8FBC8F", this.ledgeStartPosition("five", "left"), randomYCoord(187, 187),
      -(this.ledgeSpeed("five")), "left", "five"));

      //track 6 from y 225 - 250 going right

      this.ledges.push(new __WEBPACK_IMPORTED_MODULE_1__ledge__["a" /* default */]("#8FBC8F", this.ledgeStartPosition("six", "right"), randomYCoord(225, 225),
      this.ledgeSpeed("six"), "right", "six"));

    }
  }

  isSpecialBallOut() {
    let answer = false;
    this.balls.forEach((ball) => {
      if (ball.type != "deadly") {
        answer = true;
      }
    });
    return answer
  }

  newBall(color) {
    if (color === "black") {
    this.balls.push(new __WEBPACK_IMPORTED_MODULE_2__ball__["a" /* default */](color, 595, 5));
    } else {
     if (this.isSpecialBallOut() === false && this.jumper.status === "normal") { ////why does this work but === here doesnt???
      this.balls.push(new __WEBPACK_IMPORTED_MODULE_2__ball__["a" /* default */](color, 570, 5));
     }
    }
  }

  newPrize() {
    let randomXCoord = (min, max) => {
      return Math.random() * (max - min) + min;
    }

    let randomYCoord = (min, max) => {
      return Math.random() * (max - min) + min;
    }

    this.prize = new __WEBPACK_IMPORTED_MODULE_3__prize__["a" /* default */](randomXCoord(10, 550), randomYCoord(0, 250))
  }

  ballLedgeCollision(ball, ledge) {
    let ledgeFront = ledge.x + ledge.width;
    let ledgeBottom = ledge.y + ledge.height;

    if (ball.x + ball.radius > ledge.x
        && ball.x - ball.radius < ledgeFront
        && ball.y + ball.radius > ledge.y
        && ball.y - ball.radius < ledgeBottom){

          if (ball.dy === Math.abs(ball.dy)) {
            ball.y = ledge.y - 9
          } else {
            ball.y = ledgeBottom + 9
          }

          ball.angle = 360 - ball.angle;
          ball.radians = ball.angle * Math.PI/ 180;
          ball.dx = Math.cos(ball.radians) * ball.speed;
          ball.dy = Math.sin(ball.radians) * ball.speed;
    }
    // the code below was my attempt to have the balls bounce of the ledges width
    // angle being taken into account. Come back to this later.

    // let ledgeFront = ledge.x + ledge.width;
    // let ledgeBottom = ledge.y + ledge.height;
    //
    // if (ball.x < ledge.x && ball.x > ledge.x - 10 && ball.y > ledge.y && ball.y < ledgeBottom) {
    //     ball.angle = 180 - ball.angle;
    //     ball.radians = ball.angle * Math.PI/ 180;
    //     ball.dx = Math.cos(ball.radians) * ball.speed;
    //     ball.dy = Math.sin(ball.radians) * ball.speed;
    // } else if (ball.x > ledgeFront && ball.x < ledgeFront + 10 && ball.y > ledge.y && ball.y < ledgeBottom) {
    //   ball.angle = 180 - ball.angle;
    //   ball.radians = ball.angle * Math.PI/ 180;
    //   ball.dx = Math.cos(ball.radians) * ball.speed;
    //   ball.dy = Math.sin(ball.radians) * ball.speed;
    // }
  }


  detectLongCollision() {
  //tests
    let balls = this.balls;


    for(let i = 0; i < balls.length; i++) {
      balls[i].xPositions.push(balls[i].x);
      if (balls[i].xPositions.length > 10) {
        balls[i].xPositions.shift();
      }
    }

    for (let i = 0; i < balls.length; i++) {
      for (let j = 0; j < balls.length; j++) {

        let ball1 = balls[i];
        let ball2 = balls[j];

        if (ball1 != ball2
          // && ball1.color === "pink" && ball2.color === "pink"
        ) {

          let length1 = ball1.xPositions.length
          let length2 = ball2.xPositions.length

          if (length1 > 4 && length2 > 4) {

          let firstDiff = ball1.xPositions[length1 - 1] - ball2.xPositions[length2 - 1];
          let secondDiff = ball1.xPositions[length1 - 2] - ball2.xPositions[length2 - 2];
          let thirdDiff = ball1.xPositions[length1 - 3] - ball2.xPositions[length2 - 3];


          if (firstDiff === secondDiff
            && firstDiff === thirdDiff
            && secondDiff === thirdDiff

            && firstDiff < 10 && firstDiff >= 0
            && ball1.y - ball2.y < 23 && ball1.y - ball2.y >= 0) {
              // console.log("they are stuck")
            debugger
            if (ball1.y < ball2.y && ball2.y < 150) {
              ball2.y += 15;
            } else if (ball1.y > ball2.y && ball1.y < 150) {
              ball1.y += 15;
            } else if (ball1.y < ball2.y && ball1.y > 150) {
                ball1.y -= 15;
              } else if (ball1.y > ball2.y && ball2.y > 150) {
                ball2.y -= 15;
              }

            }
          }
        }
      }
    }
  }
  //tests

  loop() {
  //the 'if' below runs until the player runs out of health
  if (this.jumper.health > 0) {
    this.jumper.update(this.ctx);

    let jumperFront = this.jumper.x + this.jumper.width;
    let jumperBottom = this.jumper.y + this.jumper.height;

    for (let i = 0; i < this.ledges.length; i++) { //iterate through all the ledges in play
      if (this.ledges[i].x > 600 && this.ledges[i].direction === "right") {   //eliminate ledges that go out of the the frame
        this.ledges.splice(i, 1);
      }
      else if (this.ledges[i].x < -100 && this.ledges[i].direction === "left") {
        this.ledges.splice(i, 1);
      }
      else {
      let ledgeFront = this.ledges[i].x + this.ledges[i].width;
      let ledgeBottom = this.ledges[i].y + this.ledges[i].height;

        if (jumperFront > this.ledges[i].x
          && this.jumper.x < ledgeFront
          &&  jumperBottom < ledgeBottom
          && this.ledges[i].y < jumperBottom
          && this.jumper.velocity > 0) {

          this.jumper.y = this.ledges[i].y - this.jumper.height;
          this.jumper.jumped = false;
          this.jumper.velocity = 0;
          if (this.jumper.x < 575 && this.jumper.x > 0){
            this.jumper.x += this.ledges[i].speed}
        }
      }
     }

    let allObjects = (this.ledges.concat(this.balls)).concat([this.jumper].concat(this.prize)); //iterate through all objects

    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        if (allObjects[i] instanceof __WEBPACK_IMPORTED_MODULE_2__ball__["a" /* default */] && allObjects[j] instanceof __WEBPACK_IMPORTED_MODULE_2__ball__["a" /* default */]) {  //check balls/pigs against balls/pigs

            if (allObjects[i] != allObjects[j]) {

              allObjects[i].ballsColliding(allObjects[j]) // checks ball coliisions

            }
        }
        else if (allObjects[i] instanceof __WEBPACK_IMPORTED_MODULE_2__ball__["a" /* default */] && allObjects[j] instanceof __WEBPACK_IMPORTED_MODULE_1__ledge__["a" /* default */]) {

            this.ballLedgeCollision(allObjects[i], allObjects[j])

        }
        else if (allObjects[i] === this.jumper && allObjects[j] === this.prize) {

          let Jumper = allObjects[i];
          let Prize = allObjects[j];
          let JumperFront = this.jumper.x + this.jumper.width;
          let JumperBottom = this.jumper.y + this.jumper.height;
          let PrizeFront = this.prize.x + this.prize.width;
          let PrizeBottom = this.prize.y + this.prize.height;

          if ((Jumper.y < PrizeBottom && Prize.y < JumperBottom
              && JumperFront > Prize.x && PrizeFront > JumperFront)
            || (Jumper.y < PrizeBottom && Prize.y < JumperBottom
              && Jumper.x < PrizeFront && JumperFront > Prize.x))
          {
            this.newPrize();
            this.newBall("black");
            this.score += 1
          }
        }
        else if (allObjects[i] instanceof __WEBPACK_IMPORTED_MODULE_2__ball__["a" /* default */] && allObjects[j] === this.jumper) {
          let ball = allObjects[i];
          let jumper = this.jumper;
          let JumperFront = this.jumper.x + this.jumper.width;
          let JumperBottom = this.jumper.y + this.jumper.height;

          if (ball.x > jumper.x
              && ball.x < jumperFront
              && ball.y > jumper.y
              && ball.y < jumperBottom){
              if (ball.type === "deadly"){
                this.balls.splice(this.balls.indexOf(ball), 1);
                jumper.status === "invincibility" ? null : jumper.health -= 1;
                // this.pigAudio.play(); //
              }
              else if (ball.type === "ball-reducer") {
                this.balls.splice(this.balls.indexOf(ball), 1);

                let idxToDelete = [];

                for(let i = 0; i < this.balls.length; i++){
                  if (this.balls[i].type === "deadly") {
                    idxToDelete.push(i);
                  }
                }
                if (idxToDelete.length != 0) {
                  this.balls.splice(idxToDelete[0], 1);
                }

            }
            else if (ball.type === "healing") {
              this.balls.splice(this.balls.indexOf(ball), 1);

               {
                 this.jumper.health += 1;
               }
            }
            else if (ball.type === "invincibility") {
              this.balls.splice(this.balls.indexOf(ball), 1);
              this.jumper.status = "invincibility";
              this.jumper.color = "yellow";
              this.jumper.statusClock = 0;
            }
            else if (ball.type === "super-jump") {
              this.balls.splice(this.balls.indexOf(ball), 1);
              this.jumper.status = "super-jump";
              this.jumper.color = "green";
              this.jumper.statusClock = 0;
              this.jumper.jumpPower = -17;
            }
          }
        }
      }
    }
                                                            //updates as long as inSession is true;
    this.prize.update(this.ctx);
    this.balls.forEach(ball => ball.update(this.ctx));
    this.ledges.forEach(ledge => ledge.update(this.ctx));
    this.drawScore(this.ctx);

  }
    else if (this.jumper.health <= 0) {               //this runs when health falls below 1;
      this.inSession = false;
      this.allowReset(this.ctx);
    }
  }
}


/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map