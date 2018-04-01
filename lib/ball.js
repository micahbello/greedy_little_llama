class Ball {
  constructor(color, x, y, radius) {

    let colors = {"black": "deadly", "red": "healing",
    "green": "super-jump", "yellow": "invinsibilty",
    "brown": "ball-reducer"}

    this.color = color;
    this.x = x;
    this.y = y;
    this.dx = -.5;
    this.dy = .5;
    this.radius = 5;
    this.type = colors[color]
  }

  getDistance(ball) {
    let xDistance = ball.x - this.x;
    let yDistance = ball.y - this.y;

    return Math.sqrt(Math.pow(xDistance, 2) +
    Math.pow(yDistance, 2));
  }


  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    this.x += this.dx;
    this.y -= this.dy;
    }

  update(ctx) {
    if(this.y - this.dy > 300 || this.y - this.dy < 0) {
    this.dy = -this.dy;
    } else if (this.x + this.dx < 0 || this.x + this.dx > 600) {
    this.dx = -this.dx;
    }

    this.draw(ctx);
  }

}

export default Ball;
