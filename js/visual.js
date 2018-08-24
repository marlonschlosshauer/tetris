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

Toolkit.prototype.draw_block_full = function (y,x) {

    this.brush.fillStyle = color_block_full;
    this.brush.fillRect(    x+(block_border*zoom)+(block_border*zoom),
                            y+(block_border*zoom)+(block_border*zoom),
                            (block_size-block_border*2)*zoom,
                            (block_size-block_border*2)*zoom);
    this.brush.lineWidth = block_border*zoom;
    this.brush.strokeStyle = color_block_ghost;
    this.brush.strokeRect(  x+(block_border*zoom),
                            y+(block_border*zoom),
                            block_size*zoom,
                            block_size*zoom);
};

Toolkit.prototype.draw_block_empty = function (y,x) {
    this.brush.fillStyle = color_block_empty;
    this.brush.fillRect(x+(block_border*zoom),y+(block_border*zoom),block_size*zoom,block_size*zoom);
    this.brush.lineWidth = block_border*zoom;
    this.brush.strokeStyle = color_block_ghost;
    this.brush.strokeRect(x+(block_border*zoom),y+(block_border*zoom),block_size*zoom,block_size*zoom);
}

Toolkit.prototype.draw_block_ghost = function (y,x)
{
    this.brush.fillStyle = color_block_ghost;
    this.brush.fillRect(x+(block_border*zoom)+(block_border*zoom),y+(block_border*zoom)+(block_border*zoom),(block_size-block_border*2)*zoom,(block_size-block_border*2)*zoom);
}

Toolkit.prototype.print_playfield_to_canvas = function (temp_playfield)
{
    for(var y = initialy ; y < temp_playfield.height; y++)
    {
        for(var x = 0 ; x < temp_playfield.width; x++)
        {
            if(temp_playfield.field[y][x])
            {
                this.draw_block_full((y-initialy) * ((block_size*zoom)+(block_border*2*zoom)),x * ((block_size*zoom)+(block_border*2*zoom)));
            }
            else
            {
                this.draw_block_empty((y-initialy) * ((block_size*zoom)+(block_border*2*zoom)),x * ((block_size*zoom)+(block_border*2*zoom)));
            }
        }
    }
};

Toolkit.prototype.print_currentblock_to_canvas = function (temp_current_block)
{
    for(var y = 0 ; y < temp_current_block.size; y++)
    {
        for(var x = 0 ; x < temp_current_block.size; x++)
        {
            if(temp_current_block.field[y][x])
            {
                this.draw_block_full((y + (temp_current_block.positiony-initialy)) * ((block_size*zoom)+(block_border*2*zoom)),(x+temp_current_block.positionx) * (((block_size*zoom)+(block_border*2*zoom))));
            }
        }
    }
};


Toolkit.prototype.print_ghost_to_canvas = function (temp_playfield, temp_block)
{
    temp_block = generate_block(temp_block.type,temp_block.positiony,temp_block.positionx);
    temp_block.drop();

    for(var y = 0 ; y < temp_block.size; y++)
    {
        for(var x = 0 ; x < temp_block.size; x++)
        {
            if(temp_block.field[y][x])
            {
                this.draw_block_ghost((y + (temp_block.positiony-initialy)) * ((block_size*zoom)+(block_border*2*zoom)),(x+temp_block.positionx) * (((block_size*zoom)+(block_border*2*zoom))));
            }
        }
    }
};

Toolkit.prototype.update_next_block_window = function ()
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
                this.draw_block_full(offset_y+(((block_size*zoom)+(block_border*2*zoom))*y),offset_x+(((block_size*zoom)+(block_border*2*zoom))*x));
            }
        }
    }
}

Toolkit.prototype.update_next_block_window_frame = function (temp_playfield)
{
    var offset_x = (((block_size*zoom)+(block_border*zoom))*(temp_playfield.width+2)) - (block_border*zoom);
    var offset_y = (block_size*zoom)+(block_border*zoom) - (block_border*zoom);

    this.brush.clearRect(offset_x,offset_y,
        (((block_size*zoom)+(block_border+zoom))*4)+(block_border*7*zoom),
        (((block_size*zoom)+(block_border+zoom*2))*4)+(block_border*7*zoom));
}

Toolkit.prototype.update_hold_block_window = function (temp_playfield,temp_saved)
{
    var offset_x = (((block_size*zoom)+(block_border*zoom))*(temp_playfield.width+2));
    var offset_y = ((block_size*zoom)+(block_border*zoom))*8;

    for(var y = 0 ; y < temp_saved.size; y++)
    {
        for(var x = 0 ; x < temp_saved.size; x++)
        {
            if(saved_block.field[y][x])
            {
                this.draw_block_full(offset_y+(((block_size*zoom)+(block_border*2*zoom))*y),offset_x+(((block_size*zoom)+(block_border*2*zoom))*x));
            }
        }
    }
}

Toolkit.prototype.update_hold_block_window_frame = function (temp_playfield)
{
    var offset_x = (((block_size*zoom)+(block_border*zoom))*(temp_playfield.width+2)) - (block_border*zoom);
    var offset_y = ((block_size*zoom)+(block_border*zoom))*8 - (block_border*zoom);

    this.brush.clearRect(offset_x,offset_y,
        (((block_size*zoom)+(block_border+zoom))*4)+(block_border*zoom*7),
        (((block_size*zoom)+(block_border+zoom*2))*4)+(block_border*zoom*7));
}

Toolkit.prototype.update_line_count = function ()
{
    document.title = "Tetris : ["+line_count+"]";
}
