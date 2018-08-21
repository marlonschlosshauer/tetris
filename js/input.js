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
        move(current_block,1,0);
        update_visuals(playfield, current_block,kit);
    break;

    case "l":
    case "L":
    case "d":
    case "D":
    case "ArrowRight":
        move(current_block,0,1);
        update_visuals(playfield, current_block,kit);
    break;

    case "h":
    case "H":
    case "a":
    case "A":
    case "ArrowLeft":
        move(current_block,0,-1);
        update_visuals(playfield, current_block,kit);
    break;

    case "j":
    case "J":
    case "w":
    case "W":
    case "ArrowUp":
        rotate_block(current_block);
        update_visuals(playfield,current_block,kit);
    break;

    case " ":
        drop(current_block);
        locked();
    break;

    case "c":
    case "C":
        toggle_backup();
        update_visuals(playfield, current_block,kit);
    break;

    case "[":
        zoom++;

        visual_height = block_size * zoom;
        visual_height += block_border * zoom * 2;
        visual_height *= field_height;
        visual_height += block_border*zoom;

        visual_width = ((block_size*zoom)+(block_border+zoom)) * (field_width + 10);
        change_canvas_size(visual_height,visual_width);

        kit.brush.clearRect(0,0,visual_width,visual_height);
        update_next_block_window();

        if(saved_block != 0)
        {
            update_hold_block_window();
        }

        update_visuals(playfield,current_block,kit);
    break;

    case "]":
        if(zoom > 1)
        {
            zoom--;
            kit.brush.clearRect(0,0,visual_width,visual_height);
            update_next_block_window();

            visual_height = block_size * zoom;
            visual_height += block_border * zoom * 2;
            visual_height *= field_height;
            visual_height += block_border*zoom;

            visual_width = ((block_size*zoom)+(block_border+zoom)) * (field_width + 10);

            change_canvas_size(visual_height,visual_width);
            update_next_block_window();
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
