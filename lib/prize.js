const SPRITES = {
  position1: [15, 13, 27, 29],
  position2: [49, 13, 27, 29],
  position3: [83, 13, 27, 29],
  position4: [115, 13, 27, 29]
}


class Prize {
  constructor(x, y) {
    this.color = "blue";
    this.height = 25;
    this.width = 25;
    this.x = x;
    this.y = y;
    this.spritesheet = new Image();
    this.spritesheet.src = './assets/images/coin-sprite.png';
    this.coinCycle = 0;
  }

  getSprite() {
    this.coinCycle += 1;

    if (this.coinCycle < 35) {
      return SPRITES.position1;
    } else if (this.coinCycle < 45) {
      return SPRITES.position2;
    } else if (this.coinCycle < 55) {
      return SPRITES.position3;
    } else if (this.coinCycle < 65) {
      return SPRITES.position4;
    } else {
      this.coinCycle = 0;
      return SPRITES.position1;
    }
  }

  draw(ctx) {
    // ctx.fillStyle = this.color;                                 //comment out
    // ctx.fillRect(this.x, this.y, this.width, this.height);      //commnt out

    let sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y, sprite[2], sprite[3])
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
