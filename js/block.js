function Block(size, y, x, type, field) {
  this.size = size;
  this.type = type;
  this.positiony = y;
  this.positionx = x;
  this.field = field;
  this.blocked = false;
  this.canMove = true;
}

Block.prototype.move = function(y, x) {
  let coll = false;
  if (this.canMove) {
    //We can only move if there is no block in our way
    coll = this.collided(y, x);
    if (coll == 0) {
      //The actual moving part
      this.positiony += y;
      this.positionx += x;
    }
  }
  return coll;
};

Block.prototype.rotateBlock = function() {
  //Make next blocks
  //Check if anything is out of bounds
  //Check if overlap with playfield
  //If overlap on y axis, break (rotate not possible)
  //If overlap on x axis, try moving to center twice
  //If that works, return new sucess block
  //else break

  //Choose next block
  let type = this.type;
  type *= 10;

  if (Math.floor(type / 10000) > 0) {
    type = type / 10000;
  }

  //Create next block
  block = generateBlock(type, this.positiony, this.positionx);

  //If collided, don't change block
  if (block.collided(0, 0)) {
    return;
  }

  this.size = block.size;
  this.type = block.type;
  this.positiony = block.positiony;
  this.positionx = block.positionx;
  this.field = block.field;
  this.blocked = block.blocked;
};

Block.prototype.drop = function() {
  while (!this.atBottom() && !this.move(1, 0)) {}
};

Block.prototype.atBottom = function() {
  //Is at line the end of the field (19) ?
  if (this.positiony + this.size >= playfield.height - 1) {
    //Find which line in field of block is the last
    var targety = 0;
    while (targety + this.positiony < playfield.height - 1) {
      targety++;
    }

    //Savety check : No out of bounds on block.field
    if (targety >= this.size) {
      return false;
    }
    //Check if it's not an empty line
    for (var x = 0; x < this.size; x++) {
      if (this.field[targety][x]) {
        return true;
      }
    }
  }

  return false;
};

Block.prototype.collided = function(y, x) {
  for (var tempy = 0; tempy < this.size; tempy++) {
    for (var tempx = 0; tempx < this.size; tempx++) {
      if (this.field[tempy][tempx] == 1) {
        //Make sure we don't move out of bounds
        while (this.positionx + tempx + x >= playfield.width) {
          this.positionx--;
        }

        while (this.positionx + tempx + x < 0) {
          this.positionx++;
        }

        while (this.positiony + tempy + y < 0) {
          this.positiony++;
        }

        //Blocked
        if (this.positiony + tempy + y > playfield.height - 1) {
          return 1;
        }
        if (
          playfield.field[this.positiony + tempy + y][
            this.positionx + tempx + x
          ]
        ) {
          return 2;
        }
      }
    }
  }

  return 0;
};
