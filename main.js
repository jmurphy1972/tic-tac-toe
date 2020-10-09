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

let nameforX = document.querySelector('#nameforX');
let nameforO = document.querySelector('#nameforO');

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
    updateKey('turn', turn);
    updateTurnIndicator();

    boardInPlay = true;
    updateKey('boardInPlay', boardInPlay);
});


resetButtonObj.addEventListener('click', () => {
    console.log('Reset button clicked');

    turn = 'X';
    updateKey('turn', turn);

    for (let i=0; i<NUMBER_OF_SQUARES; i++) {
        playerBoard[i] = '';
        boardObj[i].innerHTML = '';
        localStorage.setItem('sq' + i, '');
    }

    boardInPlay = true;
    localStorage.setItem('boardInPlay', boardInPlay);

    scoreX = 0;
    updateKeyAndObj('scoreX', scoreX, countXObj);

    scoreO = 0;
    updateKeyAndObj('scoreO', scoreO, countOObj);

    scoreDraw = 0;
    updateKeyAndObj('scoreDraw', scoreDraw, countforDraw);

    tokenX = 'X';
    updateKeyAndObj('tokenX', 'X', nameforX);
    tokenO = 'O';
    updateKeyAndObj('tokenO', 'O', nameforO);

    updateTurnIndicator();
    refreshBoard();
});


customXObj.addEventListener('click', () => {
   tokenX = customToken('X', 'tokenX', tokenX, nameforX);
   refreshBoard();

   if (indicatorState == 'inPlay') {
    updateTurnIndicator();
   }
   else if (indicatorState == 'win') {
    updateWinnerIndicator();
   }
});

customOObj.addEventListener('click', () => {
   tokenO = customToken('O', 'tokenO', tokenO, nameforO);
   refreshBoard();
   
   if (indicatorState == 'inPlay') {
    updateTurnIndicator();
   }
   else if (indicatorState == 'win') {
    updateWinnerIndicator();
   }
});

function customToken(player, key, value, htmlObj) {
    let answer = prompt(`What is the ${player} token? (max 8 char) `);
    if (answer == null) {
        answer = value;
    }

    value = answer.substring(0, 8);
    updateKeyAndObj(key, value, htmlObj);

    return value;
}


function init() {
    for (let i=0; i<NUMBER_OF_SQUARES; i++) {
        boardObj[i] = document.querySelector(`#square${i}`);
        boardObj[i].style.fontsize = '12pt';
    }

    if (localStorage.getItem('turn') == 'X') {
        turn = 'X';
    }
    else if (localStorage.getItem('turn') == 'O') {
        turn = 'O';
    }
    else if (localStorage.getItem('turn') == '') {
        turn = 'X';
    }
    else {
        turn = 'X';
    }

    for (let i=0; i<NUMBER_OF_SQUARES; i++) {
        if (localStorage.getItem("sq" + i)) {
            playerBoard[i] = localStorage.getItem("sq" + i);
        }
        else {
            playerBoard[i] = '';
            updateKey(`sq${i}`, playerBoard[i]);
        }
    }

    tokenX = getStringFromStorageWithDefault('tokenX', tokenX, nameforX, 'X');
    tokenO = getStringFromStorageWithDefault('tokenO', tokenO, nameforO, 'O');
    refreshBoard();

    boardInPlay = getBooleanFromStorageWithDefault('boardInPlay', true);

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

    scoreX = getIntFromStorageWithDefault('scoreX', scoreX, countXObj, 0);
    scoreO = getIntFromStorageWithDefault('scoreO', scoreO, countOObj, 0);
    scoreDraw = getIntFromStorageWithDefault('scoreDraw', scoreDraw, countforDraw, 0);
}

function getBooleanFromStorageWithDefault(key, def) {
    let value;

    if (localStorage.getItem(key) == 'true') {
        value = true;
    }
    else if (localStorage.getItem(key) == 'false') {
        value = false;
    }
    else {
        value = def;
        localStorage.setItem(key, value);
    }

    return value;
}

function getStringFromStorageWithDefault(key, value, htmlObj, def) {
    if (localStorage.getItem(key)) {
        value = localStorage.getItem(key);
    }
    else {
        value = def;
    }
    updateKeyAndObj(key, value, htmlObj);
    return value;
}

function getIntFromStorageWithDefault(key, value, htmlObj, def) {
    if (localStorage.getItem(key)) {
        value = parseInt(localStorage.getItem(key), 10);
    }
    else {
        value = def;
    }
    updateKeyAndObj(key, value, htmlObj);
    return value;
}


function getToken() {
    if (turn == 'X') {
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
        updateKey(`sq${i}`, playerBoard[i]);
    }
}


function switchTurn() {
    if (turn == 'X') {
        turn = 'O';
        updateKey('turn', turn);
    }
    else if (turn == 'O') {
        turn = 'X';
        updateKey('turn', turn);
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
        updateKeyAndObj('scoreX', scoreX, countXObj);
    }
    else if (turn == 'O') {
        scoreO++;
        updateKeyAndObj('scoreO', scoreO, countOObj);
    }
    else {
        scoreDraw++;
        updateKeyAndObj('scoreDraw', scoreDraw, countforDraw);
    }
}

function updateKeyAndObj(key, value, htmlObj) {
    console.log(`update ${key} and ${value} on ${htmlObj}`);
    localStorage.setItem(key, value);
    htmlObj.innerHTML = value;
}

function updateKey(key, value) {
    console.log(`update ${key} and ${value}`);
    localStorage.setItem(key, value);
}
