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
  //the jumper
  let jumperMan = new Jumper("red", 30, 25, 0, 275)
  //the Balls

  let balls = [new Ball("black", 150, 150)];

  //the ledges
  let ledges = [];

  let randomXCoord = (min, max) => {
    return Math.random() * (max - min) + min;
  }

  let randomYCoord = (min, max) => {
    return Math.random() * (max - min) + min;
  }

  let prize = new Prize(randomXCoord(10, 550), randomYCoord(0, 250))

  //
  // let randomSpeed = (min, max) => {
  //   return Math.random() * (max - min) + min;
  // }
  //
  // randomXCoord = (min, max) => {
  //   return Math.random() * (max - min) + min;
  // }
  //
  // randomYCoord = (min, max) => {
  //   return Math.random() * (max - min) + min;
  // }
  //
  //
  // // for (let i = 0; i < 10; i++) {
  // //    ledges.push(new Ledge("blue", -(randomXCoord(0, 600)), randomYCoord(50, 250),
  // //   randomSpeed(.1, .3)));
  // // }

  //the gameloop
  let game = new Game(jumperMan, balls, ledges, prize, ctx);


  window.addEventListener("keydown", (e) => game.keyDownHandler(e));
  window.addEventListener("keydown", (e) => jumperMan.keyDownHandler(e));

  window.addEventListener("keyup", (e) => jumperMan.keyUpHandler(e));
  // window.addEventListener("keyup", (e) => game.keyUpHandler(e));



  setInterval(() => game.loop(), 2);

  // setInterval(() => game.prize.prizeFlash(), 150)

  let specialBalls = ["red", "green", "yellow", "brown"]

  setInterval(() => game.newBall(specialBalls[Math.floor(Math.random() * 4)]), 15000);
  setInterval(() => game.checkBallStatus(), 1000);
  setInterval(() => game.newLegdes(), 700);

});
