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
    temp_toolkit.brush.fillRect(temp_x+(block_border*zoom)+(block_border*zoom),temp_y+(block_border*zoom)+(block_border*zoom),(block_size-block_border*2)*zoom,(block_size-block_border*2)*zoom);
    temp_toolkit.brush.lineWidth = block_border*zoom;
    temp_toolkit.brush.strokeStyle = color_block_ghost;
    temp_toolkit.brush.strokeRect(temp_x+(block_border*zoom),temp_y+(block_border*zoom),block_size*zoom,block_size*zoom);
}

function draw_block_empty(temp_toolkit,temp_y,temp_x)
{
    temp_toolkit.brush.fillStyle = color_block_empty;
    temp_toolkit.brush.fillRect(temp_x+(block_border*zoom),temp_y+(block_border*zoom),block_size*zoom,block_size*zoom);
    temp_toolkit.brush.lineWidth = block_border*zoom;
    temp_toolkit.brush.strokeStyle = color_block_ghost;
    temp_toolkit.brush.strokeRect(temp_x+(block_border*zoom),temp_y+(block_border*zoom),block_size*zoom,block_size*zoom);
}

function draw_block_ghost(temp_toolkit,temp_y,temp_x)
{
    temp_toolkit.brush.fillStyle = color_block_ghost;
    temp_toolkit.brush.fillRect(temp_x+(block_border*zoom)+(block_border*zoom),temp_y+(block_border*zoom)+(block_border*zoom),(block_size-block_border*2)*zoom,(block_size-block_border*2)*zoom);
}

function update_visuals(temp_playfield, temp_block, temp_toolkit)
{
    print_playfield_to_canvas(temp_playfield,temp_toolkit);
    print_ghost_to_canvas(playfield,kit);
    print_currentblock_to_canvas(temp_block,temp_toolkit);
    update_line_count();
}

function print_playfield_to_canvas(temp_playfield, temp_toolkit)
{
    for(var cany = initialy ; cany < temp_playfield.height; cany++)
    {
        for(var canx = 0 ; canx < temp_playfield.width; canx++)
        {
            if(temp_playfield.field[cany][canx])
            {
                draw_block_full(temp_toolkit,(cany-initialy) * ((block_size*zoom)+(block_border*2*zoom)),canx * ((block_size*zoom)+(block_border*2*zoom)));
            }
            else
            {
                draw_block_empty(temp_toolkit,(cany-initialy) * ((block_size*zoom)+(block_border*2*zoom)),canx * ((block_size*zoom)+(block_border*2*zoom)));
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
                draw_block_full(temp_toolkit,(y + (temp_current_block.positiony-initialy)) * ((block_size*zoom)+(block_border*2*zoom)),(x+temp_current_block.positionx) * (((block_size*zoom)+(block_border*2*zoom))));
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
                draw_block_ghost(temp_toolkit,(y + (temp_block.positiony-initialy)) * ((block_size*zoom)+(block_border*2*zoom)),(x+temp_block.positionx) * (((block_size*zoom)+(block_border*2*zoom))));
            }
        }
    }
}

function update_next_block_window()
{
    var offset_x = (((block_size*zoom)+(block_border*zoom))*(playfield.width+2));
    var offset_y = (block_size*zoom)+(block_border*zoom);
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
                draw_block_full(kit,offset_y+(((block_size*zoom)+(block_border*2*zoom))*y),offset_x+(((block_size*zoom)+(block_border*2*zoom))*x));
            }
        }
    }
}

function update_next_block_window_frame()
{
    var offset_x = (((block_size*zoom)+(block_border*zoom))*(playfield.width+2)) - (block_border*zoom);
    var offset_y = (block_size*zoom)+(block_border*zoom) - (block_border*zoom);

    kit.brush.clearRect(offset_x,offset_y,
        (((block_size*zoom)+(block_border+zoom))*4)+(block_border*7*zoom),
        (((block_size*zoom)+(block_border+zoom*2))*4)+(block_border*7*zoom));
}

function update_hold_block_window()
{
    var offset_x = (((block_size*zoom)+(block_border*zoom))*(playfield.width+2));
    var offset_y = ((block_size*zoom)+(block_border*zoom))*8;
    temp_block = saved_block;

    for(var y = 0 ; y < temp_block.size; y++)
    {
        for(var x = 0 ; x < temp_block.size; x++)
        {
            if(temp_block.field[y][x])
            {
                draw_block_full(kit,offset_y+(((block_size*zoom)+(block_border*2*zoom))*y),offset_x+(((block_size*zoom)+(block_border*2*zoom))*x));
            }
        }
    }
}

function update_hold_block_window_frame()
{
    var offset_x = (((block_size*zoom)+(block_border*zoom))*(playfield.width+2)) - (block_border*zoom);
    var offset_y = ((block_size*zoom)+(block_border*zoom))*8 - (block_border*zoom);

    kit.brush.clearRect(offset_x,offset_y,
        (((block_size*zoom)+(block_border+zoom))*4)+(block_border*zoom*7),
        (((block_size*zoom)+(block_border+zoom*2))*4)+(block_border*zoom*7));
}

function change_canvas_size(temp_height,temp_width)
{
    kit.canvas.style.height = visual_height;
    kit.canvas.style.width = visual_width;
    kit.canvas.height = visual_height;
    kit.canvas.width = visual_width;
}

function update_line_count()
{
    return;
    var offset_x = (((block_size*zoom)+(block_border*zoom))*(playfield.width+2)) - (block_border*zoom);
    var offset_y = ((block_size*zoom)+(block_border*zoom))*16 - (block_border*zoom);

    var font_size = Math.pow(2,zoom);
    font_size *= 20;
    var string = font_size + "px monospace";

    kit.brush.clearRect(offset_x,offset_y-font_size,offset_x,offset_y);
    kit.brush.font = string;
    kit.brush.fillStyle = color_block_full;
    kit.brush.fillText(line_count+" ",offset_x,offset_y);
}
