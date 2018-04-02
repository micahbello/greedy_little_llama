class Jumper {
  constructor(color, height, width, x, y) {
    this.color = color;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.jumped = false;
    this.keysPressed = [];
    this.velocity = 0;
    this.jumpPower = -13;
    this.health = 5;
    this.status = "normal"
    this.statusClock = 0;

  }

  keyDownHandler(e) {

    this.keysPressed[e.keyCode] = (e.type === "keydown")
  }

  keyUpHandler(e) {
    this.keysPressed[e.keyCode] = (e.type === "keydown");
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }


  update(ctx) {
    ctx.clearRect(0, 0, 600, 300);

      if (this.keysPressed[37] && this.keysPressed[38] && this.x > 0 && this.jumped === false) {
        this.x -= 1;
        this.velocity = this.jumpPower;
        this.jumped = true

      } else if (this.keysPressed[39] && this.keysPressed[38] && this.x < 585 && this.jumped === false) {
        this.x += 1;
        this.velocity = this.jumpPower;
        this.jumped = true

      } else if (this.keysPressed[37] && this.x > 0) { //left
        this.x -= 1;
      } else if (this.keysPressed[39] && this.x < 585) { //rigth
        this.x += 1;
      } else if (this.keysPressed[38] && this.jumped === false) {//up
        this.velocity = this.jumpPower;
        this.jumped = true;
      }

      if (this.velocity < 0) {
        this.velocity += 1;
      }
      else {
        this.velocity += 0.03;
      }

      this.y += this.velocity

      if (this.y > 275 || this.y === 275) {
        this.y = 275;
        this.jumped = false;
        this.velocity = 0;
      }

      this.draw(ctx);
  }

}

export default Jumper;
