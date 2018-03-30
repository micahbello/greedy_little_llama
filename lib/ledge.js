class Ledge {
  constructor(color, x, y, speed) {
    this.color = color;
    this.height = 10;
    this.width = 100;
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(ctx) {
    this.draw(ctx);
    this.x += this.speed
  }


}

export default Ledge;
