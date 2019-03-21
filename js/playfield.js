function Playfield(height, width) {
  this.height = height;
  this.width = width;
  this.field = [this.height];

  for (var y = 0; y < this.height; y++) {
    this.field[y] = [this.width];

    for (var x = 0; x < width; x++) {
      this.field[y][x] = 0;
    }
  }
}
