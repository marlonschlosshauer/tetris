var field_width = 11;
var field_height = 20;
var field_total_height = 40;

var zoom = 2;
var block_border = 2;
var block_size = 16;

var visual_height = block_size * zoom;
visual_height += block_border * zoom * 2;
visual_height *= field_height;
visual_height += block_border*zoom;

var visual_width = ((block_size*zoom)+(block_border+zoom)) * (field_width + 10);

var color_block_full = '#bfcd99';
var color_block_empty = '#000000';
var color_block_ghost = '#373837';

//O J L S T Z I
var blocks = [];
var initialx = 4;
var initialy = 20;

var line_count = 0;

