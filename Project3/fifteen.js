"use strict";
var ROWS; //Global variable stores the number of rows for the selected the puzzle board.
var COLUMNS; //Global variable stores the number of columns for the selected the puzzle board.
var EMPTY_SPACE_ROW; //Global variable stores the row location of the empty space on the board.
var EMPTY_SPACE_COLUMN; /** Global variable stores the column location of the empty space on the
board. */
var PUZZLECOORDINATES; /** Global variable holds representative matrix for the puzle board. Used
for creation, background image positions for board, moving a puzzle piece, shuffling board. */
var MOVES = 0; /** Global variable stores number of moves a user makes while solving a puzzle.
Initialized at 0 at creation of puzzle and when puzzle is solved, increments by 1 with each puzzle
movement. */
var TIMER; /** Global variable used for timing function in game. Used to reset the time, and to
start the time. */
var SECONDS = 0; /** Global variable stores number of seconds a user takes to solve the puzzle.
Initialized at 0 at creation of puzzle and before the board is shuffled and after the puzzle is
solved*/
var MOVING = new Audio('move.wav'); /** Global variable that holds the sound that is played when a
move is made. */
var WIN = new Audio('win.wav'); /** Global variable that holds the sound that is played when the
game has been won. */

/** The start() function takes the puzzle size determines the puzzle size choice the user gives,
and runs the startWithPuzzleSize(rws, clmns) setting the appropriate number of rows represented by
"rws" and the appropriate number of columns in "clmns" into the parameters. */
function start() {
  var option = document.getElementById("puzzleSize").value;
  if (option == "4x4") {
    startWithPuzzleSize(4, 4)
  } else if (option == "3x3") {
    startWithPuzzleSize(3, 3)
  } else if (option == "6x6") {
    startWithPuzzleSize(6, 6)
  } else if (option == "8x8") {
    startWithPuzzleSize(8, 8)
  } else if (option == "10x10") {
    startWithPuzzleSize(10, 10)
  }
  changeBackground();
}
/** The startWithPuzzleSize(rws, clmns) function takes the number of rows represented by "rws" and
number of columns represented by "clmns", and sets the global parameters ROWS and COLUMNS,
respectfully, to those numbers*/
function startWithPuzzleSize (rws, clmns) {
  ROWS = rws;
  COLUMNS = clmns;
  startPuzzle();
}
/** The startPuzzle() function creates a puzzle grid with the number of rows
represented in the variable "ROWS", and the number of columns represented in "COLUMNS". The
function then calls the checkForMovable() function and the getBackground() function. Then the
function makes the shuffle button and background image selector appear. */
function startPuzzle() {
  var music = new Audio('main.mp3'); //------------------------ Main Background music Changes ------------//
  music.volume= 0.5;//------------------------ Main Background music Changes ------------//
  music.loop=true;

  music.play();
  var instruction = document.getElementById("instructions");
  instruction.style.display = 'none';
  PUZZLECOORDINATES = new Array(ROWS);
  for (var i = 0; i < ROWS; i++) {
    PUZZLECOORDINATES[i] = new Array(COLUMNS);
  }
  var output = "";
  document.getElementById('Grid').innerHTML = output;
  var col = "";
  for (var i1 = 0; i1 < COLUMNS; i1++) {
    col += "auto ";
  }
  /** After trying to change the class name to make this style effect change, se determined using a
  DOM .style statement would be the most effective way to not only create a grid with multiple
  column apportionments, but to make the grid at all. */
  document.getElementById("Grid").style.gridTemplateColumns = col;
  var k = 0;
  for (var i2 = 0; i2 < ROWS; i2++) {
    for (var j = 0; j < COLUMNS; j++) {
      if(!((i2 + 1) == ROWS && (j + 1) == COLUMNS)) {
        k++;
        output += "<div id=\"piece " + k + "\" class=\"grid-container-item\" onclick=\"checkPuzzlePiece(" + i2 + ", " + j + ")\">" + "<p id=\"p" + k + "\">" + k + "</p>" + "</div>";
        PUZZLECOORDINATES[i2][j] = k;
      }
      else {
        output += "<div id=\"blank\" class=\"grid-container-blank\" onclick=\"\">" + "<p id=\"pblank\"></p>" + "</div>";
        PUZZLECOORDINATES[i2][j] = 0;
        EMPTY_SPACE_ROW = i2;
        EMPTY_SPACE_COLUMN = j;
      }
    }
  }
  document.getElementById('Grid').innerHTML = output;
  checkForMovable();
  getBackground();
  document.getElementById("shuffle").className = "visibleElement";
  MOVES = 0;
  document.getElementById("backgroundImage").className = "visibleElement";
  document.getElementById("backgroundSelector").className = "visibleElement";
}
/** The checkForMovable() function scans the puzzle and finds pieces that are neighbors of the
empty space and changes their class names to effectivly give them hover CSS effects (red text
color, underlined, dark green border, etc.). */
function checkForMovable() {
  var selection = 0;
  for (var i = 0; i < ROWS; i++) {
    for(var j = 0; j < COLUMNS; j++) {
      if (PUZZLECOORDINATES[i][j] != 0) {
        if(((i - 1) >= 0) && PUZZLECOORDINATES[i - 1][j] == 0) {
          selection = PUZZLECOORDINATES[i][j];
          document.getElementById("piece " + selection).className = "grid-container-item-moveable";
        }
        else if (((i + 1) < ROWS) && PUZZLECOORDINATES[i + 1][j] == 0) {
          selection = PUZZLECOORDINATES[i][j];
          document.getElementById("piece " + selection).className = "grid-container-item-moveable";
        }
        else if (((j - 1) >= 0) && PUZZLECOORDINATES[i][j - 1] == 0) {
          selection = PUZZLECOORDINATES[i][j];
          document.getElementById("piece " + selection).className = "grid-container-item-moveable";
        }
        else if (((j + 1) < COLUMNS) && PUZZLECOORDINATES[i][j + 1] == 0) {
          selection = PUZZLECOORDINATES[i][j];
          document.getElementById("piece " + selection).className = "grid-container-item-moveable";
        }
        else {
          selection = PUZZLECOORDINATES[i][j];
          document.getElementById("piece " + selection).className = "grid-container-item";
        }
      }
    }
  }
}
/** The getBackground() function scans the puzzle, whether it is being created, being shuffled, or
being solved by moving pieces, and modifies the background images of the tiles in the form of a
completed image behind the solved puzzle board. That means if the puzzle is not solved, the pieces
will be shuffled, and so will the image. It also ensures the image of the puzzle board is changed
accoring to the size of the puzzle board, so that no two different sizes use the same image,
compromising the integrety of the offset settings of the tiles and the completed solution. */
function getBackground() {
  var picLink;
  if (ROWS == 4 && COLUMNS == 4) {
    picLink = "background.jpg";
  }
  else if (ROWS == 3 && COLUMNS == 3) {
    picLink = "background3x3.jpg";
  }
  else if (ROWS == 6 && COLUMNS == 6) {
    picLink = "background6x6.jpg";
  }
  else if (ROWS == 8 && COLUMNS == 8) {
    picLink = "background8x8.jpg";
  }
  else if (ROWS == 10 && COLUMNS == 10) {
    picLink = "background10x10.jpg";
  }
  else {
    alert("Invalid arrangment of rows and columns");
  }
  var imageCoordinates = new Array(ROWS);
  for (var i = 0; i < ROWS; i++) {
    imageCoordinates[i] = new Array(COLUMNS);
  }
  var k = 0;
  for (var i1 = 0; i1 < ROWS; i1++) {
    for (var j = 0; j < COLUMNS; j++) {
      if(!((i1 + 1) == ROWS && (j + 1) == COLUMNS)) {
        k++;
        imageCoordinates[i1][j] = k;
      }
      else {
        imageCoordinates[i1][j] = 0;
      }
    }
  }
  var selection = 0;
  var link = "url(\"" + picLink + "\")";
  var position;
  for (var i2 = 0; i2 < ROWS; i2++) {
    for (var j1 = 0; j1 < COLUMNS; j1++) {
      var puzzlePlace = PUZZLECOORDINATES[i2][j1];
      if (puzzlePlace != 0) {
        if (imageCoordinates[i2][j1] == 0 || imageCoordinates[i2][j1] != puzzlePlace) {
          var oldRow;
          var oldColumn;
          selection = puzzlePlace;
          for (var i3 = 0; i3 < ROWS; i3++) {
            for (var j2 = 0; j2 < COLUMNS; j2++) {
              if (imageCoordinates[i3][j2] == selection) {
                oldRow = i3;
                oldColumn = j2;
              }
            }
          }
          document.getElementById("piece " + selection).style.backgroundImage = link;
          position = "" + (-100 * oldColumn) + "px " + (-100 * oldRow) + "px";
          document.getElementById("piece " + selection).style.backgroundPosition = position;
        }
        else {
          selection = imageCoordinates[i2][j1];
          document.getElementById("piece " + selection).style.backgroundImage = link;
          position = "" + (-100 * j1) + "px " + (-100 * i2) + "px";
          document.getElementById("piece " + selection).style.backgroundPosition = position;
        }
      }
      else {
        selection = imageCoordinates[i2][j1];
        document.getElementById("blank").style.backgroundImage = "url(\"\")";
        document.getElementById("blank").style.backgroundPosition = "";
      }
    }
  }
}
/** The changeBackground() function gives the user a random background image at the creation of the
puzzle board. It chooses a random number between 0-3, and changes the class of the body to match
the image depending on the number it is assigned. */
function changeBackground() {
  var randomNumber = Math.floor(Math.random() * 4);
  if (randomNumber == 0) {
    document.body.className = "image1";
  }
  else if (randomNumber == 1) {
    document.body.className = "image2";
  }
  else if (randomNumber == 2){
    document.body.className = "image3";
  }
  else {
    document.body.className = "image4";
  }
}
/** The shuffle() function finds a random neighbor of the empty square in the puzzle and moves it
with the checkPuzzlePiece() functionand repeats that action 1000 times to effectivley shuffle the board
pieces in a solvable manner. Then the function starts the timer and it hides the shuffle button,
effectivley starting the game. */
function shuffle() {
  for (var i = 0; i < 1000; i++) {
    MOVES = 1;
    var neighbors = [];
    var neighborsRows = [];
    var neighborsColumns = [];
    var size = 0;
    if (EMPTY_SPACE_ROW - 1 >= 0) {
      neighbors[size] = "up";
      neighborsRows[size] = (EMPTY_SPACE_ROW - 1);
      neighborsColumns[size] = EMPTY_SPACE_COLUMN;
      size++;
    }
    if (EMPTY_SPACE_ROW + 1 < ROWS) {
      neighbors[size] = "down";
      neighborsRows[size] = (EMPTY_SPACE_ROW + 1);
      neighborsColumns[size] = EMPTY_SPACE_COLUMN;
      size++;
    }
    if (EMPTY_SPACE_COLUMN - 1 >= 0) {
      neighbors[size] = "left";
      neighborsRows[size] = EMPTY_SPACE_ROW;
      neighborsColumns[size] = (EMPTY_SPACE_COLUMN - 1);
      size++;
    }
    if (EMPTY_SPACE_COLUMN + 1 < COLUMNS) {
      neighbors[size] = "right";
      neighborsRows[size] = EMPTY_SPACE_ROW;
      neighborsColumns[size] = (EMPTY_SPACE_COLUMN + 1);
      size++;
    }
    var random = parseInt(Math.random() * size);
    checkPuzzlePiece(neighborsRows[random], neighborsColumns[random], neighbors[random]);
  }
  MOVES = 0;
  clearInterval(TIMER);
  SECONDS = 0;
  TIMER = setInterval(function(){document.getElementById("time").innerHTML = "Seconds: " + SECONDS++}, 1000);
  document.getElementById("shuffle").className = "hiddenElement";
}
/** The checkPuzzlePiece(rowSelected, columnSelected) function checks whether a puzzle piece, on a
row that is represented by "rowSelected", and a column that represented by columnSelected, that has
been clicked can be moved. A puzzle piece that can be moved is next to an empty square, and  moves
by switching places with the empty square. If it can be moved, the function determines the
direction it can move in, and it calls the movePuzzlePiece(rowSelected, columnSelected, direction)
function to complete the switch, and increments the move count. After moving the puzzle piece, it
checks to see if the ifWon() function returns true. If it does, it will call the gameWon()
function. */
function checkPuzzlePiece(rowSelected, columnSelected) {
  var r = rowSelected;
  var c = columnSelected;
  if(((r - 1) >= 0) && PUZZLECOORDINATES[r - 1][c] == 0) {
    movePuzzlePiece(r, c, "up");
    MOVING.play();
  }
  else if (((r + 1) < ROWS) && PUZZLECOORDINATES[r + 1][c] == 0) {
    movePuzzlePiece(r, c, "down");
    MOVING.play();
  }
  else if (((c - 1) >= 0) && PUZZLECOORDINATES[r][c - 1] == 0) {
    movePuzzlePiece(r, c, "left");
    MOVING.play();
  }
  else if (((c + 1) < COLUMNS) && PUZZLECOORDINATES[r][c + 1] == 0) {
    movePuzzlePiece(r, c, "right");
    MOVING.play();
  }
  checkForMovable();
  getBackground();
  if (ifWon() && MOVES != 1) {
    gameWon();
  }
  MOVES++;
}
/** The movePuzzlePiece(rowSelected, columnSelected, direction) function completes the switch of a
puzzle piece on the row represented by "rowSelected" and column represented by "columnSelected"
and the empty space in the direction represented by "direction", and switches all features of both
to effectively represent a 'move'. */
function movePuzzlePiece(rowSelected, columnSelected, direction) {
  var rowMovement = 0;
  var columnMovement = 0;
  var compass = direction.toString();
  if (compass == "up") {
    rowMovement = -1;
  }
  else if (compass == "down") {
    rowMovement = 1;
  }
  else if (compass == "left") {
    columnMovement = -1;
  }
  else if (compass == "right") {
    columnMovement = 1;
  }
  var rowLimit = rowSelected + rowMovement;
  var columnLimit = columnSelected + columnMovement;
  var selected = PUZZLECOORDINATES[rowSelected][columnSelected];
  PUZZLECOORDINATES[rowLimit][columnLimit] = PUZZLECOORDINATES[rowSelected][columnSelected];
  PUZZLECOORDINATES[rowSelected][columnSelected] = 0;
  EMPTY_SPACE_ROW = rowSelected;
  EMPTY_SPACE_COLUMN = columnSelected;
  document.getElementById("blank").id = "piece " + selected + " new";
  document.getElementById("pblank").id = "p" + selected + " new";
  document.getElementById("piece " + selected).id = "blank";
  document.getElementById("p" + selected).id = "pblank";
  document.getElementById("piece " + selected + " new").id = "piece " + selected;
  document.getElementById("p" + selected + " new").id = "p" + selected;

  document.getElementById("blank").className = "grid-container-blank";
  document.getElementById("piece " + selected).className = "grid-container-item-moveable";

  document.getElementById("pblank").innerHTML = "";
  document.getElementById("p" + selected).innerHTML = "";
  document.getElementById("p" + selected).innerHTML = "" + selected + "";

  document.getElementById("blank").setAttribute('onclick','');
  var action = "checkPuzzlePiece(" + rowLimit + ", " + columnLimit + ")";
  document.getElementById("piece " + selected).setAttribute('onclick', action.toString());
}
/** The ifWon() function scans the puzzle board and determines if all of the puzzle pieces are in
their original positions. If they are, the function returns the "true" boolean value, and returns
the visibility of the shuffle button*/
function ifWon() {
  var count = 1;
  for (var i = 0; i < ROWS; i++) {
    for (var j = 0; j < COLUMNS; j++) {
      if (PUZZLECOORDINATES[i][j] != count) {
        if ( !(count === ROWS * COLUMNS && PUZZLECOORDINATES[i][j] === 0 )) {
          return false;
        }
      }
      count++;
    }
  }
  document.getElementById("shuffle").className = "visibleElement";
  return true;
}
/** The gameWon() function makes visible the page that congragulates the player for solving the
puzzle. The function then hides the other elements on the page except for the completed puzzle and
the change background image selector, forcing the user to submit his name for the leaderboard. */
function gameWon() {
  clearInterval(TIMER);
  document.getElementById("moves-count").innerHTML = "It only took " + MOVES + " moves! Please enter your name:"
  document.getElementById("WinningPage").className = "visiblePage";
  document.getElementById("puzzleSize-label").className = "hiddenElement";
  document.getElementById("puzzleSize").className = "hiddenElement";
  document.getElementById("startGame").className = "hiddenElement";
  WIN.play();
}
/** upon getting the name, loop through the saved scores and prints them to the table until the new
score is lower then the next saved score, in which the the new score is added and the rest of the
saved scores, Then prints the table to the <p> and saves the new leaderboard in a localStorage,
"score". DELETEBOARD is an available command when inputting a name to delete the saved score
values. The submitName() function also edits all the puzzle tiles to add a spinning animation with
the function spin(id, i, j).*/
function submitName() {
	var person = document.getElementById("name").value;
	for (var i = 0; i < ROWS; i++) {
		for(var j = 0; j < COLUMNS; j++) {
			var id = PUZZLECOORDINATES[i][j];
			console.log(id);
			if(id != 0){
				spin(id, i, j);
			}
		}
	}
	if(localStorage.getItem("score") == null) localStorage.setItem("score", "");
	var oldScore = localStorage.getItem("score");
	var newScore = person + ", " + MOVES + ", " + SECONDS + "<br>";
	var people = oldScore.split(", ");
	var temp = people.join("<br>");
	console.log(people);
	people = temp.split("<br>");
	people = people.filter(Boolean);
	console.log(people);
	console.log(people.length);
	var savedScores = "";
	var added = 0;
	if (people.length != 1) {
		for (var i = 0; i < people.length; i = i+3) {
			if (person == "DELETEBOARD") {
				savedScores = "";
				added = 1;
				break;
			}
			console.log(people[i+1]);
			if (MOVES < parseInt(people[i+1]) && added == 0) {
				savedScores += newScore;
				savedScores += people[i] + ", " + people[i+1] + ", " + people[i+2] + "<br>";
				added = 1;
			} else {
				savedScores += people[i] + ", " + people[i+1] + ", " + people[i+2] + "<br>";
			}
		}
	} else {
		savedScores += newScore;
		added = 1;
	}
	if(added == 0) savedScores += newScore;

	localStorage.setItem("score", savedScores);

	var output = savedScores.split(", ");
	temp = output.join("<br>");
	console.log(output);
	output = temp.split("<br>");
	output = output.filter(Boolean);
	var table = "<table class='scoreboard'><tr><th>Name</th><th>Moves</th><th>Time</th></tr>";
	for(var i = 0; i < output.length; i = i+3){
		table += "<tr><td>" + output[i] + "</td><td>" + output[i+1] + "</td><td>" + output[i+2] + "</td></tr>";
	}
	table += "</table>";
  document.getElementById("scoreBoard").innerHTML = table; //localStorage.getItem("score")
  document.getElementById("WinningPage").className = "hiddenPage";
  document.getElementById("puzzleSize-label").className = "visibleElement";
  document.getElementById("puzzleSize").className = "visibleElement";
  document.getElementById("startGame").className = "visibleElement";
  SECONDS = 0;
  document.getElementById("time").innerHTML = "";
}
/** The spin(id, i, j) function adds a spinning animation to each tile once the submitName()
function is called. */
function spin(id, i, j) {
	var wait = (i*100)+(j*100);
	if (i == 0 || j == 0) wait - 100;
	setTimeout(function() {document.getElementById("piece " + id).classList.add("spin");}, wait);
}
/** The selectBackgroundImage() function changes the image of the background depending on the
selection of the user. */
function selectBackgroundImage() {
  var image = document.getElementById("backgroundImage").value;
  if (image == "Mountians_1") {
    document.body.className = "image1";
  }
  else if (image == "Mountians_2") {
    document.body.className = "image2";
  }
  else if (image == "Mountians_3") {
    document.body.className = "image3";
  }
  else if (image == "Mountians_4") {
    document.body.className = "image4";
  }
  else {
    alert("Invalid background image")
  }
}
