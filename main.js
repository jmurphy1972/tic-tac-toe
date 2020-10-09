console.log('connected');

'use strict';

let LENGTH_OF_SIDE = 3;
let NUMBER_OF_SQUARES = LENGTH_OF_SIDE * LENGTH_OF_SIDE;
let turn;

let tokenX = 'X';
let tokenO = 'O';

let boardObj = [];
let playerBoard = [];
let boardInPlay;

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

let indicatorState;

let playAgainButtonObj = document.querySelector('#playAgainButton');
let resetButtonObj = document.querySelector('#resetButton');
let customXObj = document.querySelector('#customX');
let customOObj = document.querySelector('#customO');

let titleXObj = document.querySelector('#titleforX');
let titleOObj = document.querySelector('#titleforO');

let countXObj = document.querySelector('#CountforX');
let countOObj = document.querySelector('#CountforO');
let countforDraw = document.querySelector('#CountforDraw');

init();

for (let i=0; i<NUMBER_OF_SQUARES; i++) {
    
    boardObj[i].addEventListener('click', () => {

        if (boardInPlay) {
            console.log(`Square ${i} has been clicked`);
            
            if (playerBoard[i] == '') {
                playerBoard[i] = turn;
                localStorage.setItem('sq' + i, playerBoard[i]);
                boardObj[i].innerHTML = getToken();

                if (isPlayerWinner(i)) {
                    boardInPlay = false;
                    localStorage.setItem('boardInPlay', boardInPlay);
                    indicateWinner();
                }
                else {
                    switchTurn();
                    localStorage.setItem('turn', turn);
                    console.log(localStorage.getItem('turn'));
                }
            }

            if (isBoardFull()) {
                if (boardInPlay) {
                    console.log("There is NO winner");
                    turn = '';
                    localStorage.setItem('turn', turn);
                    indicateNoWinner();
                }

                boardInPlay = false;
            }

        }
    });
}

playAgainButtonObj.addEventListener('click', () => {
    console.log('Play Again Button clicked');
    
    for (let i=0; i<NUMBER_OF_SQUARES; i++) {
        boardObj[i] = document.querySelector(`#square${i}`);
        boardObj[i].style.fontsize = '12pt';
        
        playerBoard[i] = '';
        boardObj[i].innerHTML = '';
        localStorage.setItem('sq' + i, '');
    }

    initializeArray();
    turn = 'X';
    localStorage.setItem('turn', turn);
    updateTurnIndicator();

    boardInPlay = true;
    localStorage.setItem('boardInPlay', boardInPlay);
});


resetButtonObj.addEventListener('click', () => {
    console.log('Reset button clicked');
    init();

    turn = 'X';
    localStorage.setItem('turn', turn);
    updateTurnIndicator();

    for (let i=0; i<NUMBER_OF_SQUARES; i++) {
        playerBoard[i] = '';
        boardObj[i].innerHTML = '';
        localStorage.setItem('sq' + i, '');
    }

    boardInPlay = true;
    localStorage.setItem('boardInPlay', boardInPlay);

    scoreX = 0;
    localStorage.setItem('scoreX', scoreX);
    countXObj.innerHTML = scoreX;

    scoreO = 0;
    localStorage.setItem('scoreO', scoreO);
    countOObj.innerHTML = scoreO;

    scoreDraw = 0;
    localStorage.setItem('scoreDraw', scoreDraw);
    countforDraw.innerHTML = scoreDraw;
});

customXObj.addEventListener('click', () => {
//    modalObj.style.display = 'block';
    let answer = prompt("What is the X token?");
    tokenX = answer;
    titleXObj.innerHTML = `Games Won By ${tokenX}: `;
    console.log(tokenX);
    refreshBoard();
});

customOObj.addEventListener('click', () => {
//    modalObj.style.display = 'block';
    let answer = prompt("What is the O token?");
    tokenO = answer;
    titleOObj.innerHTML = `Games Won By ${tokenO}: `;
    console.log(tokenO);
    refreshBoard();
    });


function init() {
    for (let i=0; i<NUMBER_OF_SQUARES; i++) {
        boardObj[i] = document.querySelector(`#square${i}`);
        boardObj[i].style.fontsize = '12pt';
    }

    turn = 'X';
    if (localStorage.getItem('turn')) {
        turn = localStorage.getItem('turn');
    }

    initializeArray();
    for (let i=0; i<playerBoard.length; i++) {
        if (localStorage.getItem("sq" + i)) {
            playerBoard[i] = localStorage.getItem("sq" + i);
        }
    }
    refreshBoard();
    
    if (localStorage.getItem('boardInPlay') == 'true') {
        boardInPlay = true;
    }
    else if (localStorage.getItem('boardInPlay') == 'false') {
        boardInPlay = false;
    }
    else {
        boardInPlay = true;
    }

    indicatorState = localStorage.getItem('indicatorState');
    console.log(`indicatorState is ${indicatorState}`);

    if (indicatorState == 'inPlay') {
        updateTurnIndicator();
    }
    else if (indicatorState == 'win') {
        updateWinnerIndicator();
    }
    else if (indicatorState == 'draw') {
        updateNoWinnerIndicator();
    }
    else {
        indicatorState == 'inPlay';
        updateTurnIndicator();
    }


    if (localStorage.getItem('scoreX')) {
        scoreX = parseInt(localStorage.getItem('scoreX'), 10);
    }
    else {
        scoreX = 0;
    }
    updateScoreItem('scoreX', scoreX, countXObj);

    if (localStorage.getItem('scoreO')) {
        scoreO = parseInt(localStorage.getItem('scoreO'), 10);
    }
    else {
        scoreO = 0;
    }
    updateScoreItem('scoreO', scoreO, countOObj);

    if (localStorage.getItem('scoreDraw')) {
        scoreDraw = parseInt(localStorage.getItem('scoreDraw'), 10);
    }
    else {
        scoreDraw = 0;
    }
    updateScoreItem('scoreDraw', scoreDraw, countforDraw);

}


function getToken() {
    if (turn == 'X') {
        console.log(tokenX)
        return tokenX;
    }
    else if (turn == 'O') {
        return tokenO;
    }
}

function refreshBoard() {
    for (let i=0; i<playerBoard.length; i++) {
        if (playerBoard[i] == 'X') {
            boardObj[i].innerHTML = tokenX;
        }
        else if (playerBoard[i] == 'O') {
            boardObj[i].innerHTML = tokenO;
        }
    }
}

function isBoardFull() {
    for (let i=0; i<playerBoard.length; i++) {
        if (playerBoard[i] == '') {
            return false;
        }
    }
    return true;
}

function isPlayerWinner(index) {
    // let row = Math.floor(index/LENGTH_OF_SIDE);
    // let col = index % LENGTH_OF_SIDE;
    
    let winFlag;

    //check rows
    for (let i=0; i<NUMBER_OF_SQUARES; i+=LENGTH_OF_SIDE) {
        // Start on the second item and compare to the first
        winFlag = true;
        let j=1+i;
        while (winFlag && (j<LENGTH_OF_SIDE+i)) {
            // If either square is blank, no need to continue comparisons
            if ((playerBoard[j-1] == '') || (playerBoard[j] == '')) {
                winFlag = false;
            }
            // If previous square equals current square, no need to continue
            else if ((playerBoard[j-1] != playerBoard[j])) {
                winFlag = false;
            }
            j++;
        }

        if (winFlag) {
            console.log(winFlag)
            return true;
        }
    }

    //check columns
    for (let i=0; i<LENGTH_OF_SIDE; i++) {
        // Start on the second item and compare to the first
        winFlag = true;
        let j=i+LENGTH_OF_SIDE;
        while (winFlag && (j<NUMBER_OF_SQUARES)) {
            // If either square is blank, no need to continue comparisons
            if ((playerBoard[j-LENGTH_OF_SIDE] == '') || (playerBoard[j] == '')) {
                winFlag = false;
            }
            // If previous square equals current square, no need to continue
            else if ((playerBoard[j-LENGTH_OF_SIDE] != playerBoard[j])) {
                winFlag = false;
            }
            j+=LENGTH_OF_SIDE
        }

        if (winFlag) {
            console.log(winFlag)
            return true;
        }
    }

    //check \ diag
    winFlag = true;
    // Start on the second item and compare to the first
    let i = LENGTH_OF_SIDE+1;
    while (winFlag && (i < NUMBER_OF_SQUARES)) {
         // If either square is blank, no need to continue comparisons
        if ((playerBoard[i-(LENGTH_OF_SIDE+1)] == '') || (playerBoard[i] == '')) {
            winFlag = false;
        }
        // If previous square equals current square, no need to continue
        else if ((playerBoard[i-(LENGTH_OF_SIDE+1)] != playerBoard[i])) {
            winFlag = false;
        }
        i+=LENGTH_OF_SIDE+1;
    }

    if (winFlag) {
        console.log(winFlag)
        return true;
    }

    //check / diag
    winFlag = true;
    // Start on the second item and compare to the first
    i = (2 * LENGTH_OF_SIDE) - 2;
    while (winFlag && (i < NUMBER_OF_SQUARES-1)) {
        // If either square is blank, no need to continue comparisons
        if ((playerBoard[i-(LENGTH_OF_SIDE-1)] == '') || (playerBoard[i] == '')) {
            winFlag = false;
        }
        // If previous square equals current square, no need to continue
        else if ((playerBoard[i-(LENGTH_OF_SIDE-1)] != playerBoard[i])) {
            winFlag = false;
        }
        i+=LENGTH_OF_SIDE-1;
    }

    return winFlag;
}


function initializeArray() {
    for (let i=0; i<NUMBER_OF_SQUARES; i++) {
        playerBoard[i] = "";
        localStorage.setItem(`square${i}`, playerBoard[i]);
    }
}


function switchTurn() {
    if (turn == 'X') {
        turn = 'O';
        localStorage.setItem('turn', turn);
    }
    else if (turn == 'O') {
        turn = 'X';
        localStorage.setItem('turn', turn);
    }

    updateTurnIndicator();
}

function updateTurnIndicator() {
    let tokenName = getToken();
    console.log(`Player's Turn: ${tokenName}`);
    turnIndicator.innerHTML = `Player's Turn: ${tokenName}`;
    turnIndicator.style.color = 'black';

    indicatorState = 'inPlay';
    localStorage.setItem('indicatorState', indicatorState);
}

function indicateWinner() {
    updateWinnerIndicator();
    updateScore();

    indicatorState = 'win';
    localStorage.setItem('indicatorState', indicatorState);
}

function updateWinnerIndicator() {
    let tokenName = getToken();
    console.log(`The winner is: ${turn}`);
    turnIndicator.innerHTML = `Winner is: ${tokenName}!!!`;
    turnIndicator.style.color = 'green';
}

function indicateNoWinner() {
    updateNoWinnerIndicator();
    updateScore();

    indicatorState = 'draw';
    localStorage.setItem('indicatorState', indicatorState);
}

function updateNoWinnerIndicator() {
    console.log(`The game is a DRAW`);
    turnIndicator.innerHTML = `Game is a DRAW - NO Winner`;
    turnIndicator.style.color = 'red';
}

function updateScore() {
    console.log(`turn is ${turn}`);

    if (turn == 'X') {
        scoreX++;
        updateScoreItem('scoreX', scoreX, countXObj);
    }
    else if (turn == 'O') {
        scoreO++;
        updateScoreItem('scoreO', scoreO, countOObj);
    }
    else {
        scoreDraw++;
        updateScoreItem('scoreDraw', scoreDraw, countforDraw);
    }
}

function updateScoreItem(tag, score, scoreObj) {
    console.log('update score item');
    localStorage.setItem(tag, score);
    scoreObj.innerHTML = score;
}
