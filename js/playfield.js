function Playfield(temp_total_height, temp_height, temp_width) {
  this.height = temp_total_height;
  this.visible_height = temp_height;
  this.width = temp_width;
  this.field = [this.height];

  for (var y = 0; y < this.height; y++) {
    this.field[y] = [this.width];
  }
}
