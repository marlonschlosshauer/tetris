function handleInput(e) {
  switch (e.key) {
    case "k":
    case "K":
    case "s":
    case "S":
    case "ArrowDown":
      currentBlock.move(1, 0);
      kit.draw();
      break;

    case "l":
    case "L":
    case "d":
    case "D":
    case "ArrowRight":
      currentBlock.move(0, 1);
      kit.draw();
      break;

    case "h":
    case "H":
    case "a":
    case "A":
    case "ArrowLeft":
      currentBlock.move(0, -1);
      kit.draw();
      break;

    case "j":
    case "J":
    case "w":
    case "W":
    case "ArrowUp":
      currentBlock.rotateBlock();
      kit.draw();
      break;

    case " ":
      currentBlock.drop();
      lock();
      break;

    case "Escape":
      resetGame();
      break;
  }
}
