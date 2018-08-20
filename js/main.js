var playfield;
var field_width = 11;
// field_width = 12;
var field_height = 20;
var field_total_height = 40;

var kit;
var visual_height = (16+10)*field_height;
var visual_width = (16+10+4)*field_width;

// var item_height = 16;
var zoom = 1;
var item_height = 16;
var block_height = 16;
var item_padding = 10;

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

function initialise_game()
{

    playfield = new Playfield(field_total_height,field_height,field_width);
    reset_array(playfield.field, playfield.height, playfield.width);

    kit = initialise_visual_tools(visual_height, visual_width);
    current_block = generate_block(choose_next_block(),initialy,initialx);
    update_visuals(playfield, current_block, kit);
    update_next_block_window_frame();
    update_next_block_window();

    logic_interval = initialise_game_logic();
    set_input_capture(true);
}

//TODO: show next and show backup
//TODO: infinite move and rotate if blocked
//TODO: speed up key repeat
//TODO: line counter (and timer)
//TODO: update collision to allow spins (no idea how)
//TODO: visual upgrade (full blocks ?)
//TODO: change from draw entire to just undraw
//TODO: add own scaling (visual)
