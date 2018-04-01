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
  let jumperMan = new Jumper("red", 25, 25, 0, 275)
  //the Balls

  let balls = [new Ball("black", 200, 300)];

  //the ledges
  let ledges = [];

  let randomXCoord = (min, max) => {
    return Math.random() * (max - min) + min;
  }

  let randomYCoord = (min, max) => {
    return Math.random() * (max - min) + min;
  }

  let prize = new Prize(randomXCoord(10, 550), randomYCoord(0, 250))


  let randomSpeed = (min, max) => {
    return Math.random() * (max - min) + min;
  }

  randomXCoord = (min, max) => {
    return Math.random() * (max - min) + min;
  }

  randomYCoord = (min, max) => {
    return Math.random() * (max - min) + min;
  }


  for (let i = 0; i < 10; i++) {
     ledges.push(new Ledge("blue", -(randomXCoord(0, 600)), randomYCoord(50, 250),
    randomSpeed(.1, .3)));
  }

  //the gameloop
  let game = new Game(jumperMan, balls, ledges, prize, ctx);


  window.addEventListener("keydown", (e) => jumperMan.keyDownHandler(e));
  window.addEventListener("keyup", (e) => jumperMan.keyUpHandler(e));



  setInterval(() => game.loop(), 1);
  setInterval(() => game.prize.prizeFlash(), 150)

  let specialBalls = ["red", "green", "yellow", "brown"]

  // setInterval(() => game.newBall("red"), 1000);


  setInterval(() => game.newBall(specialBalls[Math.floor(Math.random() * 3)]), 100000);
  // setInterval(() => game.checkBallStatus(), 1000)

});
