function initialise_game_logic()
{
    return setInterval(lower_piece,1200);
}

function initialise_visual_tools(temp_height, temp_width)
{
    var temp_canvas = document.getElementById('playfield_section');
    return new Toolkit(temp_canvas,temp_canvas.getContext('2d'),temp_height,temp_width);
}

function save_current_blocks_to_playfield()
{
    //TODO: current_block and playfield
    for(var cany = 0 ; cany < current_block.size; cany++)
    {
        for(var canx = 0 ; canx < current_block.size ; canx++)
        {
            if(cany + current_block.positiony >= playfield.height || canx + current_block.positionx >= playfield.width)
            {
                continue;
            }

            playfield.field[cany + current_block.positiony][canx + current_block.positionx] += current_block.field[cany][canx];
        }
    }
}

function no_slots_available()
{
    for(var block_index = 0; block_index < blocks.length; block_index++)
    {
        if(!blocks[block_index]) return false;
    }

    return true;
}

function get_correct_field_size(block_type)
{
    //Default field_size
    var field_size = 3;
    if(block_type == 0) field_size = 2;
    if(block_type == 6 || block_type == 60 || block_type == 600 || block_type == 6000) field_size = 4;

    return field_size;
}

function generate_block_ids()
{
    //GOAL :
    //Have list of next Ids in order of all tetri in array

    //Load all possible numbers in array
    //Choose next entry (at random)
    //Remove that entry from the array (by swap and pop)
    //Decrement % Counter (default is 7)

    blocks = [];
    var counter = 7;
    var temp_blocks = [0,1,2,3,4,5,6];
    while(counter > 1)
    {
        //Get random number
        var next = Math.random() * 10 % counter;
        next = Math.floor(next);

        //Swap entries (for pop)
        var temp = temp_blocks[temp_blocks.length-1];
        temp_blocks[temp_blocks.length-1] = temp_blocks[next];
        temp_blocks[next] = temp;

        blocks.push(temp_blocks.pop());
        counter--;
    }

    blocks.push(temp_blocks[0]);
}

function choose_next_block()
{
    if(blocks.length <= 0)
    {
        generate_block_ids();
    }

    return blocks.pop();
}


function generate_block(block_type, temp_position_y,temp_position_x)
{
    var field_size = get_correct_field_size(block_type);
    return new Block(field_size,temp_position_y,temp_position_x,block_type,true,get_field(block_type, field_size));
}

function locked()
{
    //TODO: kit, playfield current_block
    save_current_blocks_to_playfield();
    check_playfield_for_completed_line();
    current_block = generate_block(choose_next_block(),initialy,initialx);
    kit.update_next_block_window_frame(playfield);
    kit.update_next_block_window(playfield);
    //Check if game over
    if(check_game_over()) reset_game();
    update_visuals(playfield,current_block,kit);
}

function check_game_over()
{
    for(var i = 0; i < playfield.width; i++)
    {
        if(playfield.field[initialy+1][i])
        {
            return true;
        }
    }
    return false;
}

function lower_piece()
{
    //TODO: current_block
    //move
    //check if locked
    if(current_block.at_bottom() || current_block.blocked)
    {
        locked();
    }

    if(current_block.move(1,0) == 2)
    {
        current_block.blocked = true;
    }

    update_visuals(playfield,current_block,kit);
}

function check_playfield_for_completed_line()
{
    for(var y = initialy ; y < playfield.height; y++)
    {
        if(check_line(playfield,y))
        {
            line_count++;
            for(var x = 0 ; x < playfield.width; x++)
            {
                playfield.field[y][x] = 0;
            }
            lower_array_entries(playfield.field,y,0,playfield.width);
        }
    }
}

function lower_array_entries(temp_array, starting, ending, width)
{
    for(var tempy = starting; tempy >= ending + 1; tempy--)
    {
        for(var tempx = 0; tempx < width; tempx++)
        {
            temp_array[tempy][tempx] = temp_array[tempy-1][tempx];
            temp_array[tempy-1][tempx] = 0;
        }
    }
}


function check_line(temp_playfield,targety)
{
    for(var x = 0 ; x < temp_playfield.width; x++)
    {
            if(temp_playfield.field[targety][x] == 0)
            {
                return false;
            }
    }
    return true;
}

function load_test_into_playfield(temp_playfield, bool)
{
    for(var x = 0 ; x < temp_playfield.width; x++)
    {
        temp_playfield.field[17][x] = 1;
    }
}

function reset_array(temp_target_array, temp_height, temp_width)
{
    for(var y = 0; y < temp_height; y++)
    {
        for(var x = 0; x < temp_width; x++)
        {
            temp_target_array[y][x] = 0;
        }
    }

    return temp_target_array;
}

function reset_game()
{
    reset_array(playfield.field, playfield.height, playfield.width);
    generate_block_ids();
    current_block = generate_block(choose_next_block(),initialy,initialx);
    saved_block = 0;
    kit.update_next_block_window_frame(playfield);
    kit.update_next_block_window(playfield);
    kit.update_hold_block_window_frame(playfield);
    kit.update_hold_block_window(playfield, saved_block);
    update_visuals(playfield, current_block, kit);
}

function overwrite_array_dimensions(temp_target_array, old_x, old_y)
{
    temp_target_array = [old_y];

    for(var x = 0; x < old_y; x++)
    {
        field[x] = [old_x];
    }

    reset_array(temp_target_array,old_y,old_x);
}

function update_visuals(temp_playfield, temp_block, temp_toolkit)
{
    temp_toolkit.print_playfield_to_canvas(temp_playfield);
    temp_toolkit.print_ghost_to_canvas(temp_playfield,temp_block);
    temp_toolkit.print_currentblock_to_canvas(temp_block);
    temp_toolkit.update_line_count();
}

function change_canvas_size(temp_height,temp_width)
{
    //TODO kit
    kit.canvas.style.height = visual_height;
    kit.canvas.style.width = visual_width;
    kit.canvas.height = visual_height;
    kit.canvas.width = visual_width;
}
