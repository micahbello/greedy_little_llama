class Ball {
  constructor(color, x, y, radius) {

    let colors = {"black": "deadly", "red": "healing",
    "green": "super-jump", "yellow": "invinsibilty",
    "brown": "ball-reducer"}

    this.color = color;
    this.x = x;
    this.y = y;
    this.radius = 7;
    this.type = colors[color];
    this.angle = 45;
    this.speed = 1;
    this.radians = this.angle * Math.PI/ 180;
    this.dx = Math.cos(this.radians) * this.speed;
    this.dy = Math.sin(this.radians) * this.speed;
    this.status = "nothit";
    this.statusCount = 0;
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


  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    this.x += this.dx;
    this.y += this.dy;
    console.log(`${this.y}`)
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
      this.x = 592;
      this.angle = 180 - this.angle;
      this.radians = this.angle * Math.PI/ 180;
      this.dx = Math.cos(this.radians) * this.speed;
      this.dy = Math.sin(this.radians) * this.speed;
    } else if (this.x < 0) {
      this.x = 4;
      this.angle = 180 - this.angle;
      this.radians = this.angle * Math.PI/ 180;
      this.dx = Math.cos(this.radians) * this.speed;
      this.dy = Math.sin(this.radians) * this.speed;
    } else if ((this.y < 0)) {
      this.y = 4;
      this.angle = 360 - this.angle;
      this.radians = this.angle * Math.PI/ 180;
      this.dx = Math.cos(this.radians) * this.speed;
      this.dy = Math.sin(this.radians) * this.speed;
    } else if ((this.y + this.radius ) > 300) {
      this.y = 292;
      this.angle = 360 - this.angle;
      this.radians = this.angle * Math.PI/ 180;
      this.dx = Math.cos(this.radians) * this.speed;
      this.dy = Math.sin(this.radians) * this.speed;
    }
    this.draw(ctx);
  }
}

export default Ball;
