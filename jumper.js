import Game from './lib/game';
import Jumper from './lib/jumping_person';
import Ledge from './lib/ledge';
import Ball from './lib/ball';
import Prize from './lib/prize';

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("mycanvas");
  const ctx = canvasEl.getContext("2d");

  canvasEl.width = 600;
  canvasEl.height = 300;

  let jumperMan = new Jumper("red", 30, 25, 0, 275)


  let balls = [
  new Ball("black", 150, 150),
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

  let prize = new Prize(randomXCoord(10, 550), randomYCoord(0, 250))


  let game = new Game(jumperMan, balls, ledges, prize, ctx);
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
