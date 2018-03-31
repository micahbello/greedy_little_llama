import Game from './lib/game';
import Jumper from './lib/jumping_person';
import Ledge from './lib/ledge';
import Ball from './lib/ball';


document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("mycanvas");
  const ctx = canvasEl.getContext("2d");

  canvasEl.width = 600;
  canvasEl.height = 300;
  //the jumper
  let jumperMan = new Jumper("red", 25, 25, 0, 275)
  //the Balls

  let balls = [
    new Ball("blue", 100, 300, 5),
    new Ball("black", 10, 20, 5),
    new Ball("red", 10, 300, 5),
    new Ball("green", 200, 300, 5)];

  //the ledges
  let ledges = [];


  let randomSpeed = (min, max) => {
    return Math.random() * (max - min) + min;
  }

  let randomXCoord = (min, max) => {
    return Math.random() * (max - min) + min;
  }

  let randomYCoord = (min, max) => {
    return Math.random() * (max - min) + min;
  }


  for (let i = 0; i < 10; i++) {
     ledges.push(new Ledge("purple", -(randomXCoord(0, 600)), randomYCoord(50, 250),
    randomSpeed(.1, .3)));
  }

  // for (let i = 0; i < 1; i++) { // only for testing
  //    ledges.push(new Ledge("purple", 50, 270,
  //   randomSpeed(0, 0)));
  // }

  //the gameloop
  let game = new Game(jumperMan, balls, ledges, ctx);

  window.addEventListener("keydown", (e) => jumperMan.keyDownHandler(e));
  window.addEventListener("keyup", (e) => jumperMan.keyUpHandler(e));

  setInterval(() => game.loop(), 1);


});
