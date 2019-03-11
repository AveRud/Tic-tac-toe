let origBoard;

const humanPlayer = '0';
const computerPlayer = 'X';
const winnerCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
];

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {    //delete all stuff inside
    document.querySelector('.endgame').style.display ='none';
    origBoard = Array.from(Array(9).keys());
    // console.log(origBoard)
    for (i =0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
    if (typeof origBoard[square.target.id] === 'number') {
        turn(square.target.id, humanPlayer);
        if (!checkTie()) turn(bestSpot(), computerPlayer);
    }
}

function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    if (gameWon) gameOver (gameWon);
}

function checkWin(board, player) {
    let plays = board.reduce((a, e , i) =>
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null; // if nobody wins
    for (let [index, win] of winnerCombinations.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player}; // if smb wins
            break;
        }
    }
    return gameWon; // draw
}

function gameOver(gameWon) {
    for (let index of winnerCombinations[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player === humanPlayer ? 'blue' : 'red'; // whats wrong with this line?? == or === (WS recommends 3 line)
    }  // how to do this color with opacity
    for (i=0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player === humanPlayer ? 'You win!' : 'You lose');
}

function declareWinner(who) {
    document.querySelector('.endgame').style.display = 'block';
    document.querySelector('.text').innerText = who;
}


function emptySquares() {
    return origBoard.filter(s => typeof s === 'number')
}

function bestSpot() {
    return emptySquares()[0];
}

function checkTie() {
    if (emptySquares().length === 0) {
        for (i=0; i < cells.length; i++) {
            cells[i].style.backgroundColor = 'green';
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner('Tie Game');
        return true;
    }
    return false;
}


