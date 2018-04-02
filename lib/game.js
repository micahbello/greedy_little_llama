import Jumper from './jumping_person';
import Ledge from './ledge';
import Ball from './ball';
import Prize from './prize';

class Game {
  constructor(jumper, balls, ledges, prize, ctx) {
    this.jumper = jumper;
    this.balls = balls;
    this.ledges = ledges;
    this.prize = prize;
    this.ctx = ctx;
    this.score = 0;
  }

  checkBallStatus() {
    console.log(`${this.jumper.status}`);
    console.log(`${this.jumper.health}`);


    this.jumper.statusClock += 1;
    if (this.jumper.statusClock > 10 && this.jumper.status === "invinsibility") {
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
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${this.score} | Health: ${this.jumper.health}`, 8, 20);
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
    this.ledges.push(new Ledge("blue", -(randomXCoord(100, 250)), randomYCoord(50, 255),
   randomSpeed(.1, .3)));
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
    this.balls.push(new Ball(color, 598, 3));
    } else {
     if (this.isSpecialBallOut() === false && this.jumper.status === "normal") { ////why does this woek but === here doesnt???
      this.balls.push(new Ball(color, 598, 3));
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

    this.prize = new Prize(randomXCoord(10, 550), randomYCoord(0, 250))
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

        this.jumper.y = this.ledges[i].y - this.jumper.height;
        this.jumper.jumped = false;
        this.jumper.velocity = 0;
        if (this.jumper.x < 585){
          this.jumper.x += this.ledges[i].speed}
      }
    }
   }

  let allObjects = (this.ledges.concat(this.balls)).concat([this.jumper].concat(this.prize));

  for (let i = 0; i < allObjects.length; i++) {
    for (let j = 0; j < allObjects.length; j++) {
      if (allObjects[i] instanceof Ball && allObjects[j] instanceof Ball) {
        if (allObjects[i] != allObjects[j]) {
          if (allObjects[i].getDistance(allObjects[j]) <
              (allObjects[i].radius + allObjects[j].radius)) {
              allObjects[j].dy = -allObjects[j].dy;
              }

        }
      } else if (allObjects[i] instanceof Ball && allObjects[j] instanceof Ledge) {
        if (this.ballLedgeCollision(allObjects[i], allObjects[j]) === true) {
          allObjects[i].dy = -allObjects[i].dy;
        }
      } else if (allObjects[i] === this.jumper && allObjects[j] === this.prize) {
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
      } else if (allObjects[i] instanceof Ball && allObjects[j] === this.jumper) {
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
              jumper.status === "invinsibility" ? null : jumper.health -= 1; //
            } else if (ball.type === "ball-reducer") {
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

          } else if (ball.type === "healing") {
            this.balls.splice(this.balls.indexOf(ball), 1);
             if (this.jumper.health < 5) {
               this.jumper.health += 1;
             }
          } else if (ball.type === "invinsibilty") {
            this.balls.splice(this.balls.indexOf(ball), 1);
            this.jumper.status = "invinsibility";
            this.jumper.color = "yellow";
            this.jumper.statusClock = 0;
          } else if (ball.type === "super-jump") {
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


  this.prize.update(this.ctx);
  this.balls.forEach(ball => ball.update(this.ctx));
  this.ledges.forEach(ledge => ledge.update(this.ctx));
  this.drawScore(this.ctx);
  }
}


export default Game;
