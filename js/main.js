var kit;
var playfield;
var current_block;
var visual_interval;
var logic_interval;
var saved_block = 0;

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
