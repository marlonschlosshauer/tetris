function Toolkit(temp_canvas, temp_brush, temp_height, temp_width) {
  this.canvas = temp_canvas;
  this.brush = temp_brush;
  this.height = temp_height;
  this.width = temp_width;

  // Update pixel height and width of block, border and canvas.
  this.updateBlockSizes();
  this.updateCanvasSizes();

  window.addEventListener("resize", e => {
    this.draw();
  });
}

Toolkit.prototype.draw_block_full = function(y, x) {
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

Toolkit.prototype.draw_block_empty = function(y, x) {
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
Toolkit.prototype.draw_block_ghost = function(y, x) {
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

Toolkit.prototype.print_playfield_to_canvas = function(playfield) {
  for (var y = 0; y < playfield.height; y++) {
    for (var x = 0; x < playfield.width; x++) {
      if (playfield.field[y][x] > 0) {
        this.draw_block_full(y - INITIALY, x);
      } else {
        this.draw_block_empty(y - INITIALY, x);
      }
    }
  }
};

Toolkit.prototype.print_currentblock_to_canvas = function(temp_block) {
  for (var y = 0; y < temp_block.size; y++) {
    for (var x = 0; x < temp_block.size; x++) {
      if (temp_block.field[y][x] > 0) {
        this.draw_block_full(
          y + temp_block.positiony - INITIALY,
          x + temp_block.positionx
        );
      }
    }
  }
};

Toolkit.prototype.print_ghost_to_canvas = function(temp_playfield, temp_block) {
  temp_block = generate_block(
    temp_block.type,
    temp_block.positiony,
    temp_block.positionx
  );
  temp_block.drop();

  for (var y = 0; y < temp_block.size; y++) {
    for (var x = 0; x < temp_block.size; x++) {
      if (temp_block.field[y][x]) {
        this.draw_block_ghost(
          y - INITIALY + temp_block.positiony,
          x + temp_block.positionx
        );
      }
    }
  }
};

Toolkit.prototype.draw = function() {
  this.updateBlockSizes();
  this.updateCanvasSizes();
  this.print_playfield_to_canvas(playfield);
  this.print_currentblock_to_canvas(current_block);
  this.print_ghost_to_canvas(playfield, current_block);
};

Toolkit.prototype.updateCanvasSizes = function() {
  var height = this.calcCanvasHeight();
  var width = this.calcCanvasWidth();

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

Toolkit.prototype.update_line_count = function() {
  document.title = line_count + "";
};
