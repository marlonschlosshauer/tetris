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

Block.prototype.move = function (y,x)
{
    //We can only move if there is no block in our way
    var coll = this.collided(y,x);
    if(coll == 0)
    {
        //The actual moving part
        this.positiony += y;
        this.positionx += x;
    }

    return coll;
};
Block.prototype.rotate_block = function ()
{
    //Make next blocks
    //Check if anything is out of bounds
    //Check if overlap with playfield
    //If overlap on y axis, break (rotate not possible)
    //If overlap on x axis, try moving to center twice
    //If that works, return new sucess block
    //else break

    //Choose next block
    var next_type = this.type;
    next_type *= 10;

    if(Math.floor(next_type / 10000) > 0)
    {
        next_type = next_type/10000;
    }

    //Create next block
    temp_block = generate_block(next_type,this.positiony,this.positionx);

    var direction = 1;
    var max_mov = 2;
    if(temp_block.positionx > playfield.width / 2) direction = -1;

    //If collided, don't change block
    if(temp_block.collided(0,0))
    {
        return;
    }

    this.size = temp_block.size;
    this.type = temp_block.type;
    this.positiony = temp_block.positiony;
    this.positionx = temp_block.positionx;
    this.saveable = temp_block.saveable;
    this.field = temp_block.field;
    this.blocked = temp_block.blocked;
};

Block.prototype.drop = function ()
{
    while(!this.at_bottom() && !this.move(1,0)){}
};

Block.prototype.at_bottom = function ()
{
    //Is at line the end of the field (19) ?
    if(this.positiony + this.size >= playfield.height - 1)
    {

    //Find which line in field of temp_block is the last
    var targety = 0;
    while(targety + this.positiony < playfield.height - 1)
    {
        targety++;
    }

    //Savety check : No out of bounds on temp_block.field
    if(targety >= this.size)
    {
        return false;
    }
        //Check if it's not an empty line
        for(var x = 0; x < this.size; x++)
        {
            if(this.field[targety][x])
            {
                return true;
            }
        }
    }

    return false;
};

Block.prototype.collided = function (y,x) {
    for(var tempy = 0 ; tempy < this.size; tempy++)
    {
        for(var tempx = 0; tempx < this.size; tempx++)
        {
            if(this.field[tempy][tempx] == 1)
            {
                //Make sure we don't move out of bounds
                while(this.positionx+tempx+x >= playfield.width)
                {
                    this.positionx--;
                }

                while(this.positionx+tempx+x < 0)
                {
                    this.positionx++;
                }

                while(this.positiony+tempy+y < 0)
                {
                    this.positiony++;
                }

                //Blocked
                if(this.positiony + tempy + y > playfield.height - 1)
                {
                    return 1;
                }
                if(playfield.field[this.positiony+tempy+y][this.positionx+tempx+x])
                {
                    return 2;
                }
            }
        }
    }

    return 0;
};

Block.prototype.toggle_backup = function ()
{
    //If nothing is saved, put curr into saved
    //generate new block and put into temp

    if(!this.saveable)
    {
        return;
    }

    //Save current_block into temp
    var temp = this;

    //Load curr into temp
    //Load saved into curr
    //Load temp into saved

    if(saved_block == 0)
    {
        //No backup has been made yet
        //need to make sure the same type can't gotten twice
        var block_type = choose_next_block();
        var field_size = get_correct_field_size(block_type);

        saved_block = new Block(field_size,INITIALY,INITIALX,block_type,false,get_field(block_type, field_size));
    }

    this.size = saved_block.size;
    this.type = saved_block.type;
    this.field = saved_block.field;
    this.blocked = saved_block.blocked;
    this.positionx = INITIALX;
    this.positiony = INITIALY;
    this.saveable = false;
    saved_block = temp;
};
