function Block(size,y,x,type,save,field)
{
    this.size = size;
    this.type = type;
    this.positiony = y;
    this.positionx = x;
    this.saveable = save;
    this.field = field;
    this.blocked = false;
}

function move(temp_block,movementy, movementx)
{
    //We can only move if there is no block in our way
    var coll = collided(temp_block,movementy,movementx);
    if(coll == 0)
    {
        //The actual moving part
        temp_block.positiony += movementy;
        temp_block.positionx += movementx;
    }

    return coll;
}

function rotate_block()
{
    //Make next blocks
    //Check if anything is out of bounds
    //Check if overlap with playfield
    //If overlap on y axis, break (rotate not possible)
    //If overlap on x axis, try moving to center twice
    //If that works, return new sucess block
    //else break

    //Choose next block
    var next_type = current_block.type;
    next_type *= 10;

    if(Math.floor(next_type / 10000) > 0)
    {
        next_type = next_type/10000;
    }

    //Create next block
    temp_block = generate_block(next_type,current_block.positiony,current_block.positionx);

    var direction = 1;
    var max_mov = 2;
    if(temp_block.positionx > playfield.width / 2) direction = -1;

    //If collided, don't change block
    if(collided(temp_block,0,0))
    {
        return;
    }

    current_block = temp_block;
}

function drop(temp_block)
{
    while(!at_bottom(temp_block) && !move(temp_block,1,0)){}
}

function at_bottom(temp_block)
{
    //Is at line 19 ?
    if(temp_block.positiony + temp_block.size >= playfield.height - 1)
    {

    //Find which line in field of temp_block is the last
    var targety = 0;
    while(targety + temp_block.positiony < playfield.height - 1)
    {
        targety++;
    }

    //Savety check : No out of bounds on temp_block.field
    if(targety >= temp_block.size)
    {
        return false;
    }
        //Check if it's not an empty line
        for(var x = 0; x < temp_block.size; x++)
        {
            if(temp_block.field[targety][x])
            {
                return true;
            }
        }
    }

    return false;
}

function collided(temp_block,movementy, movementx)
{
    for(var tempy = 0 ; tempy < temp_block.size; tempy++)
    {
        for(var tempx = 0; tempx < temp_block.size; tempx++)
        {
            if(temp_block.field[tempy][tempx] == 1)
            {
                //Make sure we don't move out of bounds
                while(temp_block.positionx+tempx+movementx >= playfield.width)
                {
                    temp_block.positionx--;
                }

                while(temp_block.positionx+tempx+movementx < 0)
                {
                    temp_block.positionx++;
                }

                while(temp_block.positiony+tempy+movementy < 0)
                {
                    temp_block.positiony++;
                }

                //Blocked
                if(temp_block.positiony + tempy + movementy > 39)
                {
                    return 1;
                }
                if(playfield.field[temp_block.positiony+tempy+movementy][temp_block.positionx+tempx+movementx])
                {
                    return 2;
                }
            }
        }
    }

    return 0;
}

function is_rotateable_xd(temp_block)
{
    //Make sure we don't hit any walls
    //Check if we're blocked
    //If we are, look if move by 2 on x fixes
    //else return false

    correct_possible_wall_collision(temp_block,0,0);

    var available_x_movement = 2;
    //Move right by default
    var movement_direction = 1;

    if(temp_block.postionx > playfield.width / 2)
    {
        movement_direction = -1;
    }

    //Try resolving block
    while(available_x_movement > 0 && collided_block(temp_block,0,0))
    {
        if(available_x_movement > 0)
        {
            temp_block.positionx += movement_direction;
            available_x_movement--;
        }
    }

    if(available_x_movement > 0)
    {
        return true;
    }
    return false;
}

function toggle_backup()
{
    //Save current block id
    //Generate new block with id that is != current
    //Set backup flag to false

    if(!current_block.saveable)
    {
        return;
    }
    update_hold_block_window_frame();
    //Load from backup
    if(saved_block != 0)
    {
        current_block.positionx = initialx;
        current_block.positiony = initialy;
        current_block = saved_block;
        current_block.saveable = false;
        saved_block = 0;
        return;
    }

    //Save into backup
    current_block.positionx = initialx;
    current_block.positiony = initialy;

    saved_block = current_block;

    //need to make sure the same type can't gotten twice
    var block_type = choose_next_block();
    var field_size = get_correct_field_size(block_type);

    current_block = new Block(field_size,initialy,initialx,block_type,false,get_field(block_type, field_size));
    update_hold_block_window();
    update_next_block_window_frame();
    update_next_block_window();
}
