//  * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
//  * column until a player gets four-in-a-row (horiz, vert, or diag) or until
//  * board fills (tie)
//  */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for(let i=0;i<HEIGHT;i++){
    board.push(Array.from({length: WIDTH}))
}
//we are adding arrays to to each index established from height 
//then we are destructring to create as many elementsin the arrays as WIDTH is long
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard(){
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const board = document.getElementById('board');
  // we are setting htmlBoard equal to the element with the id of board
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  //here we are creating a new element of tr and adding a click event listener 

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
    //here we create the data cell and append it to our row (top)
  }
  board.append(top);
  // then we append the top to the actual board 

  // TODO: add comment for this code
  for (let y = 0; y<HEIGHT; y++) {
    const row = document.createElement("tr");
    //we are creating rows
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      // we are creating data cells
      cell.setAttribute("id", `${y}-${x}`);
      //this assigns the unique id of each cell based on y and x axis positions
      row.append(cell);
      //we are adding all cells to the row
      board.append(row);
      //we are adding all rows to the board
    }
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT-1; y >=0; y--) {
    if (!board[y][x]){
      return y;
    }
  }
  return null;
}
//here we are setting index 0 to be the bottom of each row and stating that if it is occupied return null

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
const divPiece = document.createElement('div');
//we create the divs that will prepresent the pieces
divPiece.classList.add('piece')
divPiece.classList.add(`p${currPlayer}`);
//we are adding the class 

const curCell= document.getElementById(`${y}-${x}`);
curCell.append(divPiece)
//we are applying the piece to the correct cell
  // TODO: make a div and insert into correct table cell
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  setTimeout (alert(msg), 5000);
   //the winning piece shows up after the winning alert. I tried to fix it with setTimeOut
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);
  

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
    //the winning piece shows up after the winning alert. I tried to fix it with setTimeOut
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if(board.every(row=>row.every(cell => cell))){
    return endGame(`It's a tie...`);
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1?2:1
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      //here we are checking the value of the x axis for 4 of a kind
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      //here we are checking the value of the y axis for four of a kind 
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      //here we are checking the value diagonal to the right for four of a kind
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //here we are checking the value diagonal to the left for four of a kind

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      //if one is true then return a win 
      }
    }
  }
}

makeBoard();
makeHtmlBoard();