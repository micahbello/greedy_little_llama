class Jumper {
  constructor(color, height, width, x, y) {
    this.color = color;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.jumped = "false";
    this.keysPressed = [];
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
      if (this.keysPressed[37] && this.keysPressed[38] && this.x > 0 && this.jumped === "false") {
        this.x -= 1;
        this.y -= 100;
        this.jumped = "true"

      } else if (this.keysPressed[39] && this.keysPressed[38] && this.x < 575 && this.jumped === "false") {
        this.x += 1;
        this.y -= 100;
        this.jumped = "true"

      } else if (this.keysPressed[37] && this.x > 0) { //left
        this.x -= 1;
      } else if (this.keysPressed[39] && this.x < 575) { //rigth
        this.x += 1;
      } else if (this.keysPressed[38] && this.jumped === "false") {//up
        this.y -= 100;
        this.jumped = "true"
      }

        if (this.y < 275) {
          this.y += 1
        } else if (this.y > 275 || this.y === 275) {
          this.y = 275;
          this.jumped = "false";
        }

        // if (this.x < 575) {
        //   this.x += .25}

      this.draw(ctx);
  }

}



export default Jumper;
