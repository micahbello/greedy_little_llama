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
    this.inSession = true;
    // this.resetRequested = false;
  }

  checkBallStatus() {
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

  keyDownHandler(e) {


     if (e.keyCode === 13 && this.inSession === false) {
       let randomXCoord = (min, max) => {
         return Math.random() * (max - min) + min;
       }

       let randomYCoord = (min, max) => {
         return Math.random() * (max - min) + min;
       }
       this.ledges = [];
       this.balls = [new Ball("black", 150, 150)];
       this.prize = new Prize(randomXCoord(10, 550), randomYCoord(0, 250));
       this.score = 0;
       this.inSession = true;
       this.jumper = new Jumper("red", 30, 25, 0, 275);

       window.addEventListener("keydown", (e) => this.jumper.keyDownHandler(e));

       window.addEventListener("keyup", (e) => this.jumper.keyUpHandler(e));
     }
  }
  //


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


  ledgeStartPosition(trackNumber, trackDirection) {

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

      this.ledges.push(new Ledge("#8FBC8F", this.ledgeStartPosition("one", "left"), randomYCoord(37.5, 37.5),
      -(this.ledgeSpeed("one")), "left", "one"));

      //track 2 from y 75 - 90 going right

      this.ledges.push(new Ledge("#8FBC8F", this.ledgeStartPosition("two", "right"), randomYCoord(75, 75),
      this.ledgeSpeed("two"), "right", "two"));

      //track 3 from y 108 - 130 going left

      this.ledges.push(new Ledge("#8FBC8F", this.ledgeStartPosition("three", "left"), randomYCoord(108, 108),
      -(this.ledgeSpeed("three")), "left", "three"));

      //track 4 from y 150 - 170 going right

      this.ledges.push(new Ledge("#8FBC8F", this.ledgeStartPosition("four", "right"), randomYCoord(150, 150),
      this.ledgeSpeed("four"), "right", "four"));

      //track 5 from y 187 - 210 going left

      this.ledges.push(new Ledge("#8FBC8F", this.ledgeStartPosition("five", "left"), randomYCoord(187, 187),
      -(this.ledgeSpeed("five")), "left", "five"));

      //track 6 from y 225 - 250 going right

      this.ledges.push(new Ledge("#8FBC8F", this.ledgeStartPosition("six", "right"), randomYCoord(225, 225),
      this.ledgeSpeed("six"), "right", "six"));

    }
  }

  // newLegde() {
  //   let randomSpeed = (min, max) => {
  //     return Math.random() * (max - min) + min;
  //   }
  //
  //   let randomXCoord = (min, max) => {
  //     return Math.random() * (max - min) + min;
  //   }
  //
  //   let randomYCoord = (min, max) => {
  //     return Math.random() * (max - min) + min;
  //   }
  //   this.ledges.push(new Ledge("blue", -(randomXCoord(100, 250)), randomYCoord(50, 255),
  //  randomSpeed(.1, .3)));
  // }

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
    this.balls.push(new Ball(color, 595, 5));
    } else {
     if (this.isSpecialBallOut() === false && this.jumper.status === "normal") { ////why does this woek but === here doesnt???
      this.balls.push(new Ball(color, 570, 5));
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


  loop() {

  if (this.jumper.health > 0) {


    this.jumper.update(this.ctx);

    let jumperFront = this.jumper.x + this.jumper.width;
    let jumperBottom = this.jumper.y + this.jumper.height;
    for (let i = 0; i < this.ledges.length; i++) {

      if (this.ledges[i].x > 600 && this.ledges[i].direction === "right") {
        this.ledges.splice(i, 1);
        // this.newLegde();

      } else if (this.ledges[i].x < -100 && this.ledges[i].direction === "left") {
        this.ledges.splice(i, 1);
        // this.newLegde();
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
          if (this.jumper.x < 575 && this.jumper.x > 0){
            this.jumper.x += this.ledges[i].speed}
        }
      }
     }

    let allObjects = (this.ledges.concat(this.balls)).concat([this.jumper].concat(this.prize));

    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        if (allObjects[i] instanceof Ball && allObjects[j] instanceof Ball) {
          if (allObjects[i] != allObjects[j]) {
            // if (allObjects[i].ballsColliding(allObjects[j])[0] === true) {
            //     allObjects[j].dy = -allObjects[j].dy;
            //     // allObjects[i].angle = (allObjects[i].ballsColliding(allObjects[j])[1])
            //     }
            allObjects[i].ballsColliding(allObjects[j])
          }
        } else if (allObjects[i] instanceof Ball && allObjects[j] instanceof Ledge) {
          // this.ballLedgeCollision(allObjects[i], allObjects[j]) === true) {
          //   allObjects[i].dy = -allObjects[i].dy;

              this.ballLedgeCollision(allObjects[i], allObjects[j])


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
               // if (this.jumper.health < 5)  // i am allwoing no upper limit on health
               {
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

  } else if (this.jumper.health <= 0) {
    this.inSession = false;
    this.allowReset(this.ctx);

  }
}
}


export default Game;
