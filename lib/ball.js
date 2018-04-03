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
    "green": "super-jump", "yellow": "invinsibilty",
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
    // this.spritesheet.src = "./assets/images/mud-image.png";

    this.ballCycle = 0;
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
  //
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
    } else if (this.type === "invinsibilty") {
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
    ctx.fillStyle = this.color;
    // ctx.fill();
    ctx.closePath();
    this.x += this.dx;
    this.y += this.dy;

    let sprite = this.getSprite();

    ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x - 15, this.y - 10, sprite[2], sprite[3])

    // ctx.drawImage(this.spritesheet, 0, 9, 35, 24, this.x - 15, this.y - 10, 35, 24)


    }

  // update(ctx) {
  //   if(this.y - this.dy > 300 || this.y - this.dy < 0) {
  //   this.dy = -this.dy;
  //   } else if (this.x + this.dx < 0 || this.x + this.dx > 600) {
  //   this.dx = -this.dx;
  //   }
  //
  //   this.draw(ctx);
  // }

  update(ctx) {
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

export default Ball;
