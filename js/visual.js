function Toolkit(canvas, brush) {
  this.canvas = canvas;
  this.brush = brush;

  // Update pixel height and width of block, border and canvas.
  this.updateBlockSizes();
  this.updateCanvasSizes();

  window.addEventListener("resize", () => {
    this.updateBlockSizes();
    this.updateCanvasSizes();
    this.draw();
  });
}

Toolkit.prototype.drawFullBlock = function(y, x) {
  this.brush.fillStyle = BLOCK_COLOR_FULL;
  this.brush.fillRect(
    x * (BLOCK_BORDER + BLOCK_SIZE + BLOCK_BORDER) + BLOCK_BORDER * 2,
    y * (BLOCK_BORDER + BLOCK_SIZE + BLOCK_BORDER) + BLOCK_BORDER * 2,
    BLOCK_SIZE - BLOCK_BORDER * 2,
    BLOCK_SIZE - BLOCK_BORDER * 2
  );
  this.brush.lineWidth = BLOCK_BORDER;

  this.brush.strokeStyle = BLOCK_COLOR_GHOST;
  this.brush.strokeRect(
    x * (BLOCK_BORDER + BLOCK_SIZE + BLOCK_BORDER) + BLOCK_BORDER,
    y * (BLOCK_BORDER + BLOCK_SIZE + BLOCK_BORDER) + BLOCK_BORDER,
    BLOCK_SIZE,
    BLOCK_SIZE
  );
};

Toolkit.prototype.drawEmptyBlock = function(y, x) {
  this.brush.fillStyle = BLOCK_COLOR_EMPTY;
  this.brush.fillRect(
    x * (BLOCK_BORDER + BLOCK_SIZE + BLOCK_BORDER) + BLOCK_BORDER * 2,
    y * (BLOCK_BORDER + BLOCK_SIZE + BLOCK_BORDER) + BLOCK_BORDER * 2,
    BLOCK_SIZE - BLOCK_BORDER * 2,
    BLOCK_SIZE - BLOCK_BORDER * 2
  );
  this.brush.lineWidth = BLOCK_BORDER;

  this.brush.strokeStyle = BLOCK_COLOR_GHOST;
  this.brush.strokeRect(
    x * (BLOCK_BORDER + BLOCK_SIZE + BLOCK_BORDER) + BLOCK_BORDER,
    y * (BLOCK_BORDER + BLOCK_SIZE + BLOCK_BORDER) + BLOCK_BORDER,
    BLOCK_SIZE,
    BLOCK_SIZE
  );
};
Toolkit.prototype.drawGhostBlock = function(y, x) {
  this.brush.fillStyle = BLOCK_COLOR_GHOST;
  this.brush.fillRect(
    x * (BLOCK_BORDER + BLOCK_SIZE + BLOCK_BORDER) + BLOCK_BORDER * 2,
    y * (BLOCK_BORDER + BLOCK_SIZE + BLOCK_BORDER) + BLOCK_BORDER * 2,
    BLOCK_SIZE - BLOCK_BORDER * 2,
    BLOCK_SIZE - BLOCK_BORDER * 2
  );
  this.brush.lineWidth = BLOCK_BORDER;
  this.brush.strokeRect(
    x * (BLOCK_BORDER + BLOCK_SIZE + BLOCK_BORDER) + BLOCK_BORDER,
    y * (BLOCK_BORDER + BLOCK_SIZE + BLOCK_BORDER) + BLOCK_BORDER,
    BLOCK_SIZE,
    BLOCK_SIZE
  );
};

Toolkit.prototype.printPlayfield = function(playfield) {
  for (var y = 0; y < playfield.height; y++) {
    for (var x = 0; x < playfield.width; x++) {
      if (playfield.field[y][x] > 0) {
        this.drawFullBlock(y - INITIALY, x);
      } else {
        this.drawEmptyBlock(y - INITIALY, x);
      }
    }
  }
};

Toolkit.prototype.printCurrentBlock = function(block) {
  for (var y = 0; y < block.size; y++) {
    for (var x = 0; x < block.size; x++) {
      if (block.field[y][x] > 0) {
        this.drawFullBlock(y + block.positiony - INITIALY, x + block.positionx);
      }
    }
  }
};

Toolkit.prototype.printGhost = function(field, block) {
  block = generateBlock(block.type, block.positiony, block.positionx);
  block.drop();

  for (var y = 0; y < block.size; y++) {
    for (var x = 0; x < block.size; x++) {
      if (block.field[y][x]) {
        this.drawGhostBlock(
          y - INITIALY + block.positiony,
          x + block.positionx
        );
      }
    }
  }
};

Toolkit.prototype.draw = function() {
  this.printPlayfield(playfield);
  this.printGhost(playfield, currentBlock);
  this.printCurrentBlock(currentBlock);
  this.updateTitle();
};

Toolkit.prototype.updateCanvasSizes = function() {
  const height = this.calcCanvasHeight();
  const width = this.calcCanvasWidth();

  this.canvas.height = height;
  this.canvas.width = width;
  this.canvas.style.height = height;
  this.canvas.style.width = width;
};

Toolkit.prototype.calcCanvasWidth = function() {
  return FIELD_WIDTH * (BLOCK_SIZE + 2 * BLOCK_BORDER);
};

Toolkit.prototype.calcCanvasHeight = function() {
  return FIELD_HEIGHT * (BLOCK_SIZE + 2 * BLOCK_BORDER);
};

Toolkit.prototype.updateBlockSizes = function() {
  BLOCK_SIZE = Math.floor((window.innerHeight * 0.75) / FIELD_HEIGHT);
  BLOCK_BORDER = Math.floor(BLOCK_SIZE / 8);
  // Do we have enough horizontal space ?
  if (window.innerWidth < this.calcCanvasWidth()) {
    BLOCK_SIZE = Math.floor(window.innerWidth / FIELD_HEIGHT);
    BLOCK_BORDER = Math.floor(BLOCK_SIZE / 8);
  }

  if (BLOCK_SIZE < 16) {
    BLOCK_SIZE = 16;
  }
  if (BLOCK_BORDER < 2) {
    BLOCK_BORDER = 2;
  }
};

Toolkit.prototype.updateTitle = function() {
  document.title = line_count + "";
};
