var playfield;
var field_width = 11;
var field_height = 20;
var field_total_height = 40;

var kit;
var visual_height = 800;
var visual_width = 450;

var item_height = 16;
var item_padding = item_height;

var zoom = 1;

var color_block_full = '#e3ffcc';
var color_block_empty = '#4c6344';
var color_block_ghost = '#8fab85';

//O J L S T Z I
var blocks = [];
// var blocks = [0,0,0,0,0,0,0];
var initialx = 4;
var initialy = 20;
// var initialy = 1;

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

    logic_interval = initialise_game_logic();
    set_input_capture(true);
}

//TODO: infinite move and rotate if blocked
//TODO: show next and show backup
//TODO: speed up key repeat
//TODO: line counter (and timer)
//TODO: update collision to allow spins (no idea how)
//TODO: visual upgrade (full blocks ?)
