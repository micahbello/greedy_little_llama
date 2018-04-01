class Prize {
  constructor(x, y) {
    this.color = "blue";
    this.height = 10;
    this.width = 10;
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  prizeFlash() {
    if (this.color === "blue") {
      this.color = "red";
    } else {
      this.color = "blue";
    }
  }

  update(ctx) {

    this.draw(ctx);
  }
}


export default Prize;
