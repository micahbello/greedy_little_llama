import Jumper from './jumping_person';
import Ledge from './ledge';
import Ball from './ball';

class Game {
  constructor(jumper, balls, ledges, ctx) {
    this.jumper = jumper;
    this.balls = balls;
    this.ledges = ledges;
    this.ctx = ctx;
  }


  loop() {

  this.jumper.update(this.ctx);

  //loop through the ledges to see if the jumper is on any

  for (let i = 0; i < this.ledges.length; i++) {
    if (this.jumper.y + this.jumper.height > this.ledges[i].y &&
    this.jumper.height < this.ledges[i].y + this.ledges[i].height &&
    this.jumper.x + this.jumper.width > this.ledges[i].x &&
    this.jumper.x < this.ledges[i].x + this.ledges[i].width) {
      console.log("collision")
    }
  }

  //loop through the balls to see if any are touching
  for (let i = 0; i < this.balls.length; i++) {
    for (let j = 0; j < this.balls.length; j++) {
      if (this.balls[i] != this.balls[j]) {
        if (this.balls[i].getDistance(this.balls[j]) <
            (this.balls[i].radius + this.balls[j].radius)) {
            // this.balls[j].dx = -this.balls[j].dx;
            this.balls[j].dy = -this.balls[j].dy;
            }
            else {
            this.balls[i].color = "black";
            this.balls[j].color = "black";
        }
      }
    }
  }

  this.balls.forEach(ball => ball.update(this.ctx));
  this.ledges.forEach(ledge => ledge.update(this.ctx));

  }
}


export default Game;
