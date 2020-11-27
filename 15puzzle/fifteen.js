var moves;
var table;
var rows;
var columns;
var arrayForBoard;
var r;
var c;
var randomNumber = 0;
var randomNumber2 = 0;

function start() {
  var button = document.getElementById("shuffle");
  button.addEventListener( "click", shuffle, false );
  var button2 = document.getElementById("gridchange");
  button2.addEventListener( "click", startNewGame, false );
  table = document.getElementById("table");
  rows = 4;
  columns = 4;
  startNewGame();
}

function startNewGame() {
  var arrayOfNumbers = new Array();
  var arrayHasNumberBeenUsed;
  var count = 0;
  moves = 0;
  rows = document.getElementById("rows").value;
  columns = document.getElementById("columns").value;
  // Create the proper board size.
  arrayForBoard = new Array(rows);
  for (var i = 0; i < rows; i++) {
    arrayForBoard[i] = new Array(columns);
  }
  // Set up a temporary array for
  // allocating unique numbers.
  arrayHasNumberBeenUsed = new Array( rows * columns );
  for (var i = 0; i < rows * columns; i++) {
    arrayHasNumberBeenUsed[i] = 0;
  }

  // Assign random numbers to the board.
  for (var i = 0; i < rows * columns; i++) {
    arrayHasNumberBeenUsed[i] = 1;
    arrayOfNumbers.push(i+1);
  }

  // Assign numbers to the game board.
  count = 0;
  var limit = (rows * columns) - 1;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      if (count < limit) {
        arrayForBoard[i][j] = arrayOfNumbers[count];
        count++;
      }
      else {
        arrayForBoard[i][j] = 0;
      }
    }
  }
  showTable();
}

function showTable() {
  var outputString = "";
  for (var i = 0; i < rows; i++) {
    outputString += "<tr>";
    for (var j = 0; j < columns; j++) {
      if (arrayForBoard[i][j] == 0) {
        outputString += "<td class=\"blank\"> </td>";
      }
      else {
        var id = arrayForBoard[i][j];
        outputString += "<td id=\"t" + id + "\"class=\"tile\" onclick=\"moveThisTile(" + i + ", " + j + ")\">" + arrayForBoard[i][j] + "</td>";
      }
    } // end for (var j = 0; j < columns; j++)
    outputString += "</tr>";
  } // end for (var i = 0; i < rows; i++)

  table.innerHTML = outputString;
}

function moveThisTile( tableRow, tableColumn)
{
  if (checkIfMoveable(tableRow, tableColumn, "up") ||
      checkIfMoveable(tableRow, tableColumn, "down") ||
      checkIfMoveable(tableRow, tableColumn, "left") ||
      checkIfMoveable(tableRow, tableColumn, "right") ) {
    incrementMoves();
  }
  else {
    randomNumber = 0;
    randomNumber2 = 0;
  }
  if (checkIfWinner() && moves != 1) {
    gameWon();
  }
}

function checkIfMoveable(rowCoordinate, columnCoordinate, direction) {
  // The following variables an if else statements
  // make the function work for all directions.
  rowOffset = 0;
  columnOffset = 0;
  if (direction == "up") {
    rowOffset = -1;
  }
  else if (direction == "down") {
    rowOffset = 1;
  }
  else if (direction == "left") {
    columnOffset = -1;
  }
  else if (direction == "right") {
    columnOffset = 1;
  }
  // Check if the tile can be moved to the spot.
  // If it can, move it and return true.
  if (rowCoordinate + rowOffset >= 0 && columnCoordinate + columnOffset >= 0 &&
    rowCoordinate + rowOffset < rows && columnCoordinate + columnOffset < columns
  ) {
    if ( arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] == 0) {
      arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] = arrayForBoard[rowCoordinate][columnCoordinate];
      arrayForBoard[rowCoordinate][columnCoordinate] = 0;
      showTable();
      return true;
    }
  }
  return false;
}


function incrementMoves()
{
  moves++;
}

function checkIfWinner() {
  var count = 1;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      if (arrayForBoard[i][j] != count) {
        if ( !(count === rows * columns && arrayForBoard[i][j] === 0 )) {
          return false;
        }
      }
      count++;
    }
  }
  return true;
}

function shuffle() {
  for (var i = 0; i < 1000; i++)
  {
    moves = 1;
    randomNumber = Math.floor(Math.random() * rows );
    randomNumber2 = Math.floor(Math.random() * columns);
    r = randomNumber;
    c = randomNumber2;
    moveThisTile(r, c);
  }
  moves = 0;
  changeBackground();
}

function changeBackground() {
  var i = "url('background_1.jpg')";
  var j = "url('background_2.jpg')";
  var k = "url('background_3.jpg')";

  randomNumber = Math.floor(Math.random() * 3);
  if (randomNumber == 0) {
    document.body.style.backgroundImage = i
  }
  else if (randomNumber == 1) {
    document.body.style.backgroundImage = j;
  }
  else {
    document.body.style.backgroundImage = k;
  }
}

function gameWon() {
  alert("Game Won! It only took " + moves + " moves!");
}

window.addEventListener( "load", start, false ); // This event listener makes the function start() execute when the window opens.
