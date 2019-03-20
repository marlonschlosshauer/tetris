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

    this.brush.fillStyle = BLOCK_COLOR_FULL;
    this.brush.fillRect(    x+(BLOCK_BORDER*ZOOM)+(BLOCK_BORDER*ZOOM),
                            y+(BLOCK_BORDER*ZOOM)+(BLOCK_BORDER*ZOOM),
                            (BLOCK_SIZE-BLOCK_BORDER*2)*ZOOM,
                            (BLOCK_SIZE-BLOCK_BORDER*2)*ZOOM);
    this.brush.lineWidth = BLOCK_BORDER*ZOOM;
    this.brush.strokeStyle = BLOCK_COLOR_GHOST;
    this.brush.strokeRect(  x+(BLOCK_BORDER*ZOOM),
                            y+(BLOCK_BORDER*ZOOM),
                            BLOCK_SIZE*ZOOM,
                            BLOCK_SIZE*ZOOM);
};

Toolkit.prototype.draw_block_empty = function (y,x) {
    this.brush.fillStyle = BLOCK_COLOR_EMPTY;
    this.brush.fillRect(x+(BLOCK_BORDER*ZOOM),y+(BLOCK_BORDER*ZOOM),BLOCK_SIZE*ZOOM,BLOCK_SIZE*ZOOM);
    this.brush.lineWidth = BLOCK_BORDER*ZOOM;
    this.brush.strokeStyle = BLOCK_COLOR_GHOST;
    this.brush.strokeRect(x+(BLOCK_BORDER*ZOOM),y+(BLOCK_BORDER*ZOOM),BLOCK_SIZE*ZOOM,BLOCK_SIZE*ZOOM);
}

Toolkit.prototype.draw_block_ghost = function (y,x)
{
    this.brush.fillStyle = BLOCK_COLOR_GHOST;
    this.brush.fillRect(x+(BLOCK_BORDER*ZOOM)+(BLOCK_BORDER*ZOOM),y+(BLOCK_BORDER*ZOOM)+(BLOCK_BORDER*ZOOM),(BLOCK_SIZE-BLOCK_BORDER*2)*ZOOM,(BLOCK_SIZE-BLOCK_BORDER*2)*ZOOM);
}

Toolkit.prototype.print_playfield_to_canvas = function (temp_playfield)
{
    for(var y = INITIALY ; y < temp_playfield.height; y++)
    {
        for(var x = 0 ; x < temp_playfield.width; x++)
        {
            if(temp_playfield.field[y][x])
            {
                this.draw_block_full((y-INITIALY) * ((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*2*ZOOM)),x * ((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*2*ZOOM)));
            }
            else
            {
                this.draw_block_empty((y-INITIALY) * ((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*2*ZOOM)),x * ((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*2*ZOOM)));
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
                this.draw_block_full((y + (temp_current_block.positiony-INITIALY)) * ((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*2*ZOOM)),(x+temp_current_block.positionx) * (((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*2*ZOOM))));
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
                this.draw_block_ghost((y + (temp_block.positiony-INITIALY)) * ((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*2*ZOOM)),(x+temp_block.positionx) * (((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*2*ZOOM))));
            }
        }
    }
};

Toolkit.prototype.update_next_block_window = function ()
{
	return;
    var offset_x = (((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*ZOOM))*(playfield.width+2));
    var offset_y = (BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*ZOOM);
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
                this.draw_block_full(offset_y+(((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*2*ZOOM))*y),offset_x+(((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*2*ZOOM))*x));
            }
        }
    }
}

Toolkit.prototype.update_next_block_window_frame = function (temp_playfield)
{
	return;
    var offset_x = (((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*ZOOM))*(temp_playfield.width+2)) - (BLOCK_BORDER*ZOOM);
    var offset_y = (BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*ZOOM) - (BLOCK_BORDER*ZOOM);

    this.brush.clearRect(offset_x,offset_y,
        (((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER+ZOOM))*4)+(BLOCK_BORDER*7*ZOOM),
        (((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER+ZOOM*2))*4)+(BLOCK_BORDER*7*ZOOM));
}

Toolkit.prototype.update_hold_block_window = function (temp_playfield,temp_saved)
{
	return;
    var offset_x = (((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*ZOOM))*(temp_playfield.width+2));
    var offset_y = ((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*ZOOM))*8;

    for(var y = 0 ; y < temp_saved.size; y++)
    {
        for(var x = 0 ; x < temp_saved.size; x++)
        {
            if(saved_block.field[y][x])
            {
                this.draw_block_full(offset_y+(((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*2*ZOOM))*y),offset_x+(((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*2*ZOOM))*x));
            }
        }
    }
}

Toolkit.prototype.update_hold_block_window_frame = function (temp_playfield)
{
	return;
    var offset_x = (((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*ZOOM))*(temp_playfield.width+2)) - (BLOCK_BORDER*ZOOM);
    var offset_y = ((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER*ZOOM))*8 - (BLOCK_BORDER*ZOOM);

    this.brush.clearRect(offset_x,offset_y,
        (((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER+ZOOM))*4)+(BLOCK_BORDER*ZOOM*7),
        (((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER+ZOOM*2))*4)+(BLOCK_BORDER*ZOOM*7));
}

Toolkit.prototype.update_line_count = function ()
{
    document.title = "Tetris : ["+line_count+"]";
}
