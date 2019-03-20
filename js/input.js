function set_input_capture(bool)
{
    if(bool)
    {
        document.addEventListener('keypress',this.check_input);
    }
    else
    {
        //Will do later.
    }
}

function check_input(e)
{
  switch (e.key) {

    case "k":
    case "K":
    case "s":
    case "S":
    case "ArrowDown":
        current_block.move(1,0);
        update_visuals(playfield, current_block,kit);
    break;

    case "l":
    case "L":
    case "d":
    case "D":
    case "ArrowRight":
        current_block.move(0,1);
        update_visuals(playfield, current_block,kit);
    break;

    case "h":
    case "H":
    case "a":
    case "A":
    case "ArrowLeft":
        current_block.move(0,-1);
        update_visuals(playfield, current_block,kit);
    break;

    case "j":
    case "J":
    case "w":
    case "W":
    case "ArrowUp":
        current_block.rotate_block();
        update_visuals(playfield,current_block,kit);
    break;

    case " ":
        current_block.drop();
        locked();
    break;

    case "c":
    case "C":
        current_block.toggle_backup();

        kit.update_hold_block_window_frame(playfield);
        kit.update_hold_block_window(playfield,saved_block);
        update_visuals(playfield, current_block,kit);
    break;

    case "[":
        ZOOM++;

        VISUAL_HEIGHT = BLOCK_SIZE * ZOOM;
        VISUAL_HEIGHT += BLOCK_BORDER * ZOOM * 2;
        VISUAL_HEIGHT *= FIELD_HEIGHT;
        VISUAL_HEIGHT += BLOCK_BORDER*ZOOM;

        VISUAL_WIDTH = ((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER+ZOOM)) * (FIELD_WIDTH + 10);
        change_canvas_size(visual_height,visual_width);

        kit.brush.clearRect(0,0,visual_width,visual_height);
        kit.update_next_block_window();

        if(saved_block != 0)
        {
           this.update_hold_block_window();
        }

        update_visuals(playfield,current_block,kit);
    break;

    case "]":
        if(ZOOM > 1)
        {
            ZOOM--;
            kit.brush.clearRect(0,0,visual_width,visual_height);
            update_next_block_window();

            VISUAL_HEIGHT = BLOCK_SIZE * ZOOM;
            VISUAL_HEIGHT += BLOCK_BORDER * ZOOM * 2;
            VISUAL_HEIGHT *= FIELD_HEIGHT;
            VISUAL_HEIGHT += BLOCK_BORDER*ZOOM;

            VISUAL_WIDTH = ((BLOCK_SIZE*ZOOM)+(BLOCK_BORDER+ZOOM)) * (FIELD_WIDTH + 10);

            change_canvas_size(visual_height,visual_width);
            kit.update_next_block_window();
            if(saved_block != 0)
            {
                update_hold_block_window();
            }

            update_visuals(playfield,current_block,kit);
        }
    break;

    case "Escape":
        reset_game();
    break;

    default:
    break;
  }
}
