function set_input_capture(bool)
{
    if(bool)
    {
        document.addEventListener('keydown',this.check_input);
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

    case "+":
        // zoom *= 2;
        update_visuals(playfield,current_block,kit);
    break;

    case "-":
        // zoom = Math.floor(zoom/2);
        update_visuals(playfield,current_block,kit);
    break;

    case "Escape":
        reset_game();
    break;

    default:
    break;
  }
}
