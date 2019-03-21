var kit;
var playfield;
var currentBlock;
var blocks = [];

function start() {
  playfield = new Playfield(FIELD_TOTAL_HEIGHT, FIELD_WIDTH);

  let canvas = document.getElementById("playfield_section");
  kit = new Toolkit(canvas, canvas.getContext("2d"));

  currentBlock = generateBlock(getNextBlock(), INITIALY, INITIALX);

  kit.draw();
  setInterval(lowerCurrentBlock, 1200);
  document.addEventListener("keypress", handleInput);
}
