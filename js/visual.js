function Toolkit(temp_canvas, temp_brush, temp_height, temp_width)
{
    this.canvas = temp_canvas;
    this.brush = temp_brush;
    this.height = temp_height;
    this.width = temp_width;

    this.canvas.style.height = temp_height;
    this.canvas.style.width = temp_width;
    this.canvas.height = temp_height;
    this.canvas.width = temp_width;
}

function initialise_visual_tools(temp_height, temp_width)
{
    var temp_canvas = document.getElementById('playfield_section');
    return new Toolkit(temp_canvas,temp_canvas.getContext('2d'),temp_height,temp_width);
}

function draw_block_full(temp_toolkit,temp_y,temp_x)
{
    temp_toolkit.brush.fillStyle = color_block_full;
    temp_toolkit.brush.fillRect(temp_x+2,temp_y+2,12,12);
    temp_toolkit.brush.lineWidth = 2;
    temp_toolkit.brush.strokeStyle = color_block_ghost;
    temp_toolkit.brush.strokeRect(temp_x,temp_y,16,16);
}

function draw_block_full_old(temp_toolkit,temp_y,temp_x)
{
    temp_toolkit.brush.fillStyle = color_block_full;
    temp_toolkit.brush.fillRect(temp_x,temp_y,item_height,item_height);
}

function draw_block_empty(temp_toolkit,temp_y,temp_x)
{
    temp_toolkit.brush.fillStyle = color_block_empty;
    temp_toolkit.brush.fillRect(temp_x,temp_y,16,16);
    temp_toolkit.brush.lineWidth = 2;
    temp_toolkit.brush.strokeStyle = color_block_ghost;
    temp_toolkit.brush.strokeRect(temp_x,temp_y,16,16);
}

function draw_block_ghost(temp_toolkit,temp_y,temp_x)
{
    temp_toolkit.brush.fillStyle = color_block_ghost;
    temp_toolkit.brush.fillRect(temp_x+2,temp_y+2,12,12);
}

function update_visuals(temp_playfield, temp_block, temp_toolkit)
{
    print_playfield_to_canvas(temp_playfield,temp_toolkit);
    print_ghost_to_canvas(playfield,kit);
    print_currentblock_to_canvas(temp_block,temp_toolkit);
}

function print_playfield_to_canvas(temp_playfield, temp_toolkit)
{
    for(var cany = initialy ; cany < temp_playfield.height; cany++)
    {
        for(var canx = 0 ; canx < temp_playfield.width; canx++)
        {
            if(temp_playfield.field[cany][canx])
            {
                draw_block_full(temp_toolkit,((cany-initialy) * item_padding * zoom * 2),canx * item_padding * zoom * 2);
            }
            else
            {
                draw_block_empty(temp_toolkit,((cany-initialy) * item_padding * 2),canx * item_padding * 2);
            }
        }
    }
}

function print_currentblock_to_canvas(temp_current_block, temp_toolkit)
{
    for(var y = 0 ; y < temp_current_block.size; y++)
    {
        for(var x = 0 ; x < temp_current_block.size; x++)
        {
            if(temp_current_block.field[y][x])
            {
                draw_block_full(temp_toolkit,(y + (temp_current_block.positiony-initialy)) * item_padding * 1 * 2,(x + temp_current_block.positionx) * item_padding * 1 * 2);
            }
        }
    }
}

function print_ghost_to_canvas(temp_playfield, temp_toolkit)
{
    var temp_block = generate_block(current_block.type,current_block.positiony,current_block.positionx);
    drop(temp_block);

    for(var y = 0 ; y < temp_block.size; y++)
    {
        for(var x = 0 ; x < temp_block.size; x++)
        {
            if(temp_block.field[y][x])
            {
                draw_block_ghost(temp_toolkit,(y +  (temp_block.positiony-initialy)) * item_padding*2,(x + temp_block.positionx) * item_padding * 1 * 2);
            }
        }
    }
}

function update_next_block_window()
{
    //FIX 'X' OFFSET
    var offset_x = item_padding * 2;
    var offset_y = (item_padding * 2 * playfield.width) + item_padding * 2;

    var temp_block;
    if(blocks.length <= 0)
    {
        generate_block_ids();
    }
    var size = get_correct_field_size(blocks[blocks.length-1])
    temp_block = get_field(blocks[blocks.length-1],size);

    for(var y = 0 ; y < size; y++)
    {
        for(var x = 0 ; x < size; x++)
        {
            if(temp_block[y][x])
            {
                draw_block_full(kit,offset_x+(x*item_padding*2),offset_y+(y*item_padding*2));
            }
        }
    }
}

function update_next_block_window_frame()
{

    var offset_x = item_padding * 2 * playfield.width + item_padding;
    var offset_y = item_padding;
    kit.brush.fillStyle = "#000000";
    kit.brush.fillRect(offset_x,offset_y,(item_padding+2)*(current_block.size+2)*2,(item_padding+2)*(8));
}

function update_hold_block_window()
{
    var offset_x = item_padding * 2 * playfield.width + item_padding;
    var offset_y = (item_padding * 2 * playfield.width) + item_padding * 2;

    temp_block = saved_block;

    for(var y = 0 ; y < temp_block.size; y++)
    {
        for(var x = 0 ; x < temp_block.size; x++)
        {
            if(temp_block.field[y][x])
            {
                draw_block_full(kit,offset_x+(x*item_padding*2),offset_y+(y*item_padding*2));
            }
        }
    }
}

function update_hold_block_window_frame()
{

    var offset_x = item_padding + (item_padding * 10);
    var offset_y = (item_padding * 2 * playfield.width) + item_padding * 4;

    temp_block = saved_block;
    kit.brush.fillStyle = "black";
    kit.brush.fillRect(offset_x,offset_y,(item_padding+2)*(current_block.size+2)*2,(item_padding+2)*(current_block.size+2)*2);
}
