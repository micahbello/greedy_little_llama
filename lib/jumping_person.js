const SPRITES = {
  leftPosition1: [19, 77, 25, 44],
  leftPosition2: [82, 77, 25, 44],
  leftPosition3: [145, 77, 25, 44],
  leftPosition4: [208, 77, 25, 44],

  rightPosition1: [20, 204, 25, 44],
  rightPosition2: [83, 204, 25, 44],
  rightPosition3: [146, 204, 25, 44],
  rightPosition4: [209, 204, 25, 44],

  jumpPosition1: [19, 12, 25, 50],
  jumpPosition2: [82, 12, 25, 50],
  jumpPosition3: [145, 12, 25, 50],
  jumpPosition4: [208, 12, 25, 50]
}

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
    this.walkCycle = 0;
    this.spritesheet = new Image();
    this.spritesheet.src = './assets/images/llama-sprite.png';
    this.lastDirectionFaced = "none"

  }

  keyDownHandler(e) {
    this.keysPressed[e.keyCode] = (e.type === "keydown")
  }

  keyUpHandler(e) {
    this.keysPressed[e.keyCode] = (e.type === "keydown");

      if (e.keyCode === 37) {
        this.lastDirectionFaced = "left";
      } else if (e.keyCode === 39) {
        this.lastDirectionFaced = "right";
      }
  }

  getSprite() {

    if (!this.keysPressed[39] && !this.keysPressed[37] && !this.keysPressed[38]) {
      this.walkCycle = 0;
        if (this.lastDirectionFaced === "none" || this.lastDirectionFaced === "right") {
      return SPRITES.rightPosition1;
    } else if (this.lastDirectionFaced === "left") {
      return SPRITES.leftPosition1;
        }
    } else if (this.keysPressed[39] === true) {
      this.walkCycle += 1;
      if (this.walkCycle < 35) {
        return SPRITES.rightPosition1;
      } else if (this.walkCycle < 45) {
        return SPRITES.rightPosition2;
      } else if (this.walkCycle < 55) {
        return SPRITES.rightPosition3;
      } else if (this.walkCycle < 65) {
        return SPRITES.rightPosition4;
      } else {
        this.walkCycle = 0;
        return SPRITES.rightPosition1;
      }
    } else if (this.keysPressed[37] === true) {
      this.walkCycle += 1;
      if (this.walkCycle < 35) {
        return SPRITES.leftPosition1;
      } else if (this.walkCycle < 45) {
        return SPRITES.leftPosition2;
      } else if (this.walkCycle < 55) {
        return SPRITES.leftPosition3;
      } else if (this.walkCycle < 65) {
        return SPRITES.leftPosition4;
      } else {
        this.walkCycle = 0;
        return SPRITES.leftPosition1;
      }
    } else if (this.keysPressed[38] === true) {
      this.walkCycle += 1;
      if (this.walkCycle < 35) {
        return SPRITES.jumpPosition1;
      } else if (this.walkCycle < 45) {
        return SPRITES.jumpPosition2;
      } else if (this.walkCycle < 55) {
        return SPRITES.jumpPosition3;
      } else if (this.walkCycle < 65) {
        return SPRITES.jumpPosition4;
      } else {
        this.walkCycle = 0;
        return SPRITES.jumpPosition1;
      }
    }
  }

  draw(ctx) {
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, this.width, this.height);

    let sprite = this.getSprite();
    // ctx.drawImage(this.spritesheet, 208, 12, 25, 50, this.x, this.y, 25, 50)
    ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y, sprite[2], sprite[3])

  }


  update(ctx) {
    ctx.clearRect(0, 0, 600, 300);

      if (this.keysPressed[37] && this.keysPressed[38] && this.x > 0 && this.jumped === false) {
        this.x -= 1;
        this.velocity = this.jumpPower;
        this.jumped = true

      } else if (this.keysPressed[39] && this.keysPressed[38] && this.x < 575 && this.jumped === false) {
        this.x += 1;
        this.velocity = this.jumpPower;
        this.jumped = true

      } else if (this.keysPressed[37] && this.x > 0) { //left
        this.x -= 1;
      } else if (this.keysPressed[39] && this.x < 575) { //rigth
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

      if (this.y > 270 || this.y === 270) {
        this.y = 270;
        this.jumped = false;
        this.velocity = 0;
      }

      this.draw(ctx);
  }

}

export default Jumper;
