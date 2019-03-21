function saveBlock() {
  for (var cany = 0; cany < currentBlock.size; cany++) {
    for (var canx = 0; canx < currentBlock.size; canx++) {
      if (
        cany + currentBlock.positiony >= playfield.height ||
        canx + currentBlock.positionx >= playfield.width
      ) {
        continue;
      }

      playfield.field[cany + currentBlock.positiony][
        canx + currentBlock.positionx
      ] += currentBlock.field[cany][canx];
    }
  }
}

function calcBlockSize(type) {
  //Default field_size
  let size = 3;
  if (type == 0) size = 2;
  if (type == 6 || type == 60 || type == 600 || type == 6000) size = 4;

  return size;
}

function generateBlockQueue() {
  //Have list of next Ids in order of all tetri in array

  //Load all possible numbers in array
  //Choose next entry (at random)
  //Remove that entry from the array (by swap and pop)
  //Decrement % Counter (default is 7)

  blocks = [];
  let counter = 7;
  let nextBlocks = [0, 1, 2, 3, 4, 5, 6];
  while (counter > 1) {
    //Get random number
    let next = (Math.random() * 10) % counter;
    next = Math.floor(next);

    //Swap entries (for pop)
    let temp = nextBlocks[nextBlocks.length - 1];
    nextBlocks[nextBlocks.length - 1] = nextBlocks[next];
    nextBlocks[next] = temp;

    blocks.push(nextBlocks.pop());
    counter--;
  }

  blocks.push(nextBlocks[0]);
}

function getNextBlock() {
  if (blocks.length <= 0) {
    generateBlockQueue();
  }

  return blocks.pop();
}

function generateBlock(type, positiony, positionx) {
  let size = calcBlockSize(type);
  return new Block(size, positiony, positionx, type, buildField(type, size));
}

function lock() {
  saveBlock();
  handleCompletedLines();
  currentBlock = generateBlock(getNextBlock(), INITIALY, INITIALX);
  //Check if game over
  if (isGameOver()) resetGame();
  kit.draw();
}

function isGameOver() {
  for (var i = 0; i < playfield.width; i++) {
    if (playfield.field[INITIALY + 1][i]) {
      return true;
    }
  }
  return false;
}

function lowerCurrentBlock() {
  //move and check if lock
  if (currentBlock.atBottom() || currentBlock.blocked) {
    lock();
  }

  if (currentBlock.move(1, 0) == 2) {
    currentBlock.blocked = true;
  }

  kit.draw();
}

function handleCompletedLines() {
  for (var y = INITIALY; y < playfield.height; y++) {
    if (checkLine(playfield, y)) {
      line_count++;
      for (var x = 0; x < playfield.width; x++) {
        playfield.field[y][x] = 0;
      }
      lowerArrayEntries(playfield.field, y, 0, playfield.width);
    }
  }
}

function lowerArrayEntries(array, starting, ending, length) {
  for (var tempy = starting; tempy >= ending + 1; tempy--) {
    for (var tempx = 0; tempx < length; tempx++) {
      array[tempy][tempx] = array[tempy - 1][tempx];
      array[tempy - 1][tempx] = 0;
    }
  }
}

function checkLine(field, y) {
  for (var x = 0; x < field.width; x++) {
    if (field.field[y][x] == 0) {
      return false;
    }
  }
  return true;
}

function resetGame() {
  for (var y = 0; y < playfield.height; y++) {
    for (var x = 0; x < playfield.width; x++) {
      playfield.field[y][x] = 0;
    }
  }

  generateBlockQueue();
  currentBlock = generateBlock(getNextBlock(), INITIALY, INITIALX);
  kit.draw();
}
