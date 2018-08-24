var playfield;
var field_width = 11;
var field_height = 20;
var field_total_height = 40;

var zoom = 2;
var block_border = 2;
var block_size = 16;

var kit;
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

var current_block;
var saved_block = 0;

var visual_interval;
var logic_interval;

var line_count = 0;

function initialise_game()
{
    playfield = new Playfield(field_total_height,field_height,field_width);
    reset_array(playfield.field, playfield.height, playfield.width);
    kit = initialise_visual_tools(visual_height, visual_width);
    current_block = generate_block(choose_next_block(),initialy,initialx);
    update_visuals(playfield, current_block, kit);
    kit.update_next_block_window_frame(playfield);
    kit.update_next_block_window(playfield);

    logic_interval = initialise_game_logic();
    set_input_capture(true);
}

//TODO: line counter (and timer) change font to hellovetica
//TODO: change block to object based

//TODO: infinite move and rotate if blocked
//TODO: speed up key repeat
//TODO: update collision to allow spins (no idea how)
//TODO: change from draw entire to just undraw
//TODO: change functions to be from object instead of global
