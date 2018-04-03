class Ledge {
  constructor(color, x, y, speed, direction, trackNumber) {
    this.color = color;
    this.height = 10;
    this.width = 100;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = direction;
    this.trackNumber = trackNumber;
    this.image = new Image();
    this.image.src = "./assets/images/cloud-image.png";
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, 0, 6, 100, 30 ,this.x, this.y - 7, 100, 30)

  }

  update(ctx) {
    this.draw(ctx);
    this.x += this.speed
  }


}

export default Ledge;
