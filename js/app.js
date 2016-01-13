var board, boardSize, tiles, openTile, generateBoard, randomizeBoard, moveTile, findAdjacent, tileElement, startBool;

board = document.getElementById("board");
boardSize = 16;
tiles = [];
tileElement = document.createElement("div");
startBool = false;

for (i=1; i<boardSize + 1; i++) {
  tiles.push(i);
}

openTile = tiles[tiles.length - 1];

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

generateBoard = function() {
  s = Math.sqrt(boardSize);
  b = s * 100;
  p = 0;
  c = [];
  cx = 0;
  cy = 0;
  ax = 0;
  ay = 0;

  for (i=0; i<boardSize; i++) {
    if (i % s <= 0) {
      cy = (ay * 100) * -1;
      ay++;
      ax = 0;
      cx = 0;
    } else {
      ax++;
      cx = (ax * 100) * -1;
    }

    c.push({i: i, x: cx, y: cy});
  }

  $("#board").html("").css({
    "height": b,
    "width": b
  });

  for (i=0; i<tiles.length; i++) {
    originalTilePos = tiles.indexOf(tiles[i]);
    $("#board").append("<span class='tile' data-tile='" + tiles[i] + "' data-pos='" + originalTilePos + "'>" + tiles[i] + "</span>");
  }

  $(".tile[data-tile='" + openTile + "']").addClass("open");
}

regenerateBoard = function() {
  $("#board").html("");

  for (i=0; i<tiles.length; i++) {
    originalTilePos = tiles.indexOf(tiles[i]);
    $("#board").append("<span class='tile' data-tile='" + tiles[i] + "' data-pos='" + originalTilePos + "'>" + tiles[i] + "</span>");
  }

  addTileBackgrounds();
}

generateTileBackgrounds = function() {
  for (i=0; i<tiles.length; i++) {
    if (i !== (boardSize-1)) {
      $("#board").find(".tile[data-tile=" + tiles[i] + "]").css({
        "background-image": "url(lib/img/image.png)",
        "background-position-x": c[i]['x'] + "px",
        "background-position-y": c[i]['y'] + "px"
      });
    } else {
      $("#board").find(".tile[data-tile=" + openTile + "]").css({
        "background-image": "none"
      });
    }
  }
}

addTileBackgrounds = function() {
  for (i=0; i<tiles.length; i++) {
    if (i !== (boardSize-1)) {
      m = tiles.indexOf(tiles[i]) + 1;
      console.log(tiles[i], m, c[m]['x'], c[m]['y']);
      $("#board").find(".tile[data-pos=" + tiles[m] + "]").css({
        "background-image": "url(lib/img/image.png)",
        "background-position-x": c[m]['x'] + "px",
        "background-position-y": c[m]['y'] + "px"
      });
    } else {
      $("#board").find(".tile[data-tile=" + openTile + "]").css({
        "background-image": "none"
      });
    }
  }
}

randomizeBoard = function() {
  shuffle(tiles);

  regenerateBoard();
}

moveTile = function(tile, pos) {
  o = tiles.indexOf(openTile);

  tiles.splice(o, 1);
  tiles.splice(pos, 0, openTile);

  regenerateBoard();
}

findAdjacent = function(pos) {
  i = tiles.indexOf(openTile);
  j = tiles.indexOf(pos);
  s = Math.sqrt(boardSize);

  var a = i - 1;
  var b = i + 1;
  var c = i + s;
  var d = i - s;

  if (a === j) {
    moveTile(a, j);
  }

  if (b === j) {
    moveTile(b, j);
  }

  if (c === j) {
    moveTile(c, j);
  }

  if (d === j) {
    moveTile(d, j);
  }
}

generateBoard();
generateTileBackgrounds();

$(document).ready(function(){
  $(document).on("click", ".tile", function(event) {
    if (startBool === false) {
      randomizeBoard();
      startBool = true;
    } else {
      pos = $(this).data("tile");

      findAdjacent(pos);
    }
  });
});

