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


  newLegde() {
    let randomSpeed = (min, max) => {
      return Math.random() * (max - min) + min;
    }

    let randomXCoord = (min, max) => {
      return Math.random() * (max - min) + min;
    }

    let randomYCoord = (min, max) => {
      return Math.random() * (max - min) + min;
    }
    this.ledges.push(new Ledge("purple", -(randomXCoord(100, 250)), randomYCoord(50, 255),
   randomSpeed(.1, .3)));
  }

  ballLedgeCollision(ball, ledge) {
    let ledgeFront = ledge.x + ledge.width;
    let ledgeBottom = ledge.y + ledge.height;

    if (ball.x > ledge.x
        && ball.x < ledgeFront
        && ball.y > ledge.y
        && ball.y < ledgeBottom){
        return true;
    } else {
       return false;
    }
  }


  loop() {

  this.jumper.update(this.ctx);

  let jumperFront = this.jumper.x + this.jumper.width;
  let jumperBottom = this.jumper.y + this.jumper.height;

  for (let i = 0; i < this.ledges.length; i++) {

    if (this.ledges[i].x > 600) {
      this.ledges.splice(i, 1);
      this.newLegde();

    } else {
    let ledgeFront = this.ledges[i].x + this.ledges[i].width;
    let ledgeBottom = this.ledges[i].y + this.ledges[i].height;

      if (jumperFront > this.ledges[i].x
          && this.jumper.x < ledgeFront
          &&  jumperBottom < ledgeBottom
          && this.ledges[i].y < jumperBottom
          && this.jumper.velocity > 0) {

        this.jumper.color = "orange";
        this.jumper.y = this.ledges[i].y - this.jumper.height;
        this.jumper.jumped = false;
        this.jumper.velocity = 0;
        if (this.jumper.x < 575){
          this.jumper.x += this.ledges[i].speed}
      } else {
        this.jumper.color = "red";
      }
    }
   }

  let allObjects = (this.ledges.concat(this.balls)).concat([this.jumper]);

  for (let i = 0; i < allObjects.length; i++) {
    for (let j = 0; j < allObjects.length; j++) {
      if (allObjects[i] instanceof Ball && allObjects[j] instanceof Ball) {
        if (allObjects[i] != allObjects[j]) {
          if (allObjects[i].getDistance(allObjects[j]) <
              (allObjects[i].radius + allObjects[j].radius)) {
              allObjects[j].dy = -allObjects[j].dy;
              }
              else {
              allObjects[i].color = "black";
              allObjects[j].color = "black";
          }
        }
      } else if (allObjects[i] instanceof Ball && allObjects[j] instanceof Ledge) {
        if (this.ballLedgeCollision(allObjects[i], allObjects[j]) === true) {
          allObjects[i].dy = -allObjects[i].dy;
        }
      }
    }
  }


  this.balls.forEach(ball => ball.update(this.ctx));
  this.ledges.forEach(ledge => ledge.update(this.ctx));

  // console.log(`${allObjects.length}`)

  }
}


export default Game;

// //loop through the balls to see if any are touching
// for (let i = 0; i < this.balls.length; i++) {
//   for (let j = 0; j < this.balls.length; j++) {
//     if (this.balls[i] != this.balls[j]) {
//       if (this.balls[i].getDistance(this.balls[j]) <
//           (this.balls[i].radius + this.balls[j].radius)) {
//           // this.balls[j].dx = -this.balls[j].dx;
//           this.balls[j].dy = -this.balls[j].dy;
//           }
//           else {
//           this.balls[i].color = "black";
//           this.balls[j].color = "black";
//       }
//     }
//   }
// }
