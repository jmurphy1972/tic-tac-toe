console.log('connected');

'use strict';

let LENGTH_OF_SIDE = 3;
let NUMBER_OF_SQUARES = LENGTH_OF_SIDE * LENGTH_OF_SIDE;
let turn;

let tokenX = 'X';
let tokenO = 'O';

let boardObj = [];
let playerBoard = [];
let boardInPlay = true;

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

let countXObj;
let countOObj;
let countforDraw;

init();

for (let i=0; i<NUMBER_OF_SQUARES; i++) {
    boardObj[i] = document.querySelector(`#square${i}`);
    boardObj[i].style.fontsize = '12pt';
    
    boardObj[i].addEventListener('click', () => {
        if (boardInPlay) {
            console.log(`Square ${i} has been clicked`);
            
            if (playerBoard[i] == '') {
                playerBoard[i] = turn;
                boardObj[i].innerHTML = getToken();

                if (isPlayerWinner(i)) {
                    console.log(`The winner is: ${turn}`);
                    boardInPlay = false;
                    indicateWinner();
                }
                else {
                    switchTurn();
 //                   localStorage.setItem(turnState, turn);
                }
            }

            if (isBoardFull()) {
                if (boardInPlay) {
                    console.log("There is NO winner");
                    turn = '';
                    indicateNoWinner();
                }

                boardInPlay = false;
            }

        }
    });
}

let playAgainButtonObj = document.querySelector('#playAgainButton');
let customXObj = document.querySelector('#customX');
let customOObj = document.querySelector('#customO');

let titleXObj = document.querySelector('#TitleforX');
let titleOObj = document.querySelector('#TitleforO');

playAgainButtonObj.addEventListener('click', () => {
    console.log('Play Again Button clicked');
    init();
});

customXObj.addEventListener('click', () => {
//    modalObj.style.display = 'block';
    let answer = prompt("What is the X token?");
    tokenX = answer;
    titleXObj.innerHTML = `Games Won By ${tokenX}: `;
    console.log(tokenX);
    updateBoardWithNewToken();
});

customOObj.addEventListener('click', () => {
//    modalObj.style.display = 'block';
    let answer = prompt("What is the O token?");
    tokenO = answer;
    titleOObj.innerHTML = `Games Won By ${tokenO}: `;
    console.log(tokenO);
    updateBoardWithNewToken();
    });


function init() {
    for (let i=0; i<playerBoard.length; i++) {
        playerBoard[i] = '';
        boardObj[i].innerHTML = '';
    }

    initializeArray();
    turn = 'X';
    updateTurnIndicator();
    boardInPlay = true;

    countXObj = document.querySelector('#CountforX');
    countOObj = document.querySelector('#CountforO');
    countforDraw = document.querySelector('#CountforDraw');

//    turn = localStorage.get(turnState);
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

function updateBoardWithNewToken() {
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
    }
}


function switchTurn() {
    if (turn == 'X') {
        turn = 'O';
    }
    else if (turn == 'O') {
        turn = 'X';
    }

    updateTurnIndicator();
}

function updateTurnIndicator() {
    let tokenName = getToken();
    turnIndicator.innerHTML = `Player's Turn: ${tokenName}`;
    turnIndicator.style.color = 'black';
}

function indicateWinner() {
    let tokenName = getToken();
    turnIndicator.innerHTML = `Winner is: ${tokenName}!!!`;
    turnIndicator.style.color = 'green';
    updateScore();
}

function indicateNoWinner() {
    turnIndicator.innerHTML = `Game is a DRAW - NO Winner`;
    turnIndicator.style.color = 'red';
    updateScore();
}

function updateScore() {
    console.log(`turn is ${turn}`);

    if (turn == 'X') {
        scoreX++;
        countXObj.innerHTML = scoreX;
    }
    else if (turn == 'O') {
        scoreO++;
        countOObj.innerHTML = scoreO;
    }
    else {
        scoreDraw++;
        countforDraw.innerHTML = scoreDraw;
    }
}
