console.log('connected');

'use strict';

let LENGTH_OF_SIDE = 3;
let NUMBER_OF_SQUARES = LENGTH_OF_SIDE * LENGTH_OF_SIDE;
let turn = 'X';
let boardObj = [];
let playerBoard = [];
let boardInPlay = true;

init();

for (let i=0; i<NUMBER_OF_SQUARES; i++) {
    boardObj[i] = document.querySelector(`#square${i}`);
    boardObj[i].style.fontsize = '12pt';
    
    boardObj[i].addEventListener('click', () => {
        if (boardInPlay) {
            console.log(`Square ${i} has been clicked`);
            
            if (playerBoard[i] == '') {
                boardObj[i].innerHTML = turn;
                playerBoard[i] = turn;

                if (checkBoard(i)) {
                    console.log(`The winner is: ${turn}`);
                    boardInPlay = false;
                    indicateWinner();
                }
                else {
                    switchTurn();
                }
            }

            if (boardFull()) {
                boardInPlay = false;
                console.log("There is NO winner");
                indicateNoWinner();
            }

        }
    });
} 

function init() {
    let turnIndicator = document.querySelector('#turnIndicator');
    turnIndicator.innerHTML = `Player's Turn: ${turn}`;
    initializeArray();
}

function boardFull() {
    for (let i=0; i<playerBoard.length; i++) {
        if (playerBoard[i] == '') {
            return false;
        }
    }

    return true;
}

function checkBoard(index) {
    // let row = Math.floor(index/LENGTH_OF_SIDE);
    // let col = index % LENGTH_OF_SIDE;
    
    let winFlag;

    //check rows
    for (let i=0; i<NUMBER_OF_SQUARES; i+=LENGTH_OF_SIDE) {

        winFlag = true;
        for (let j=1+i; j<LENGTH_OF_SIDE+i; j++) {
            if ((playerBoard[j-1] == '') || (playerBoard[j] == '')) {
                winFlag = false;
            }
            else if ((playerBoard[j] != playerBoard[j-1])) {
                winFlag = false;
            }
        }

        if (winFlag) {
            console.log(winFlag)
            return true;
        }
    }

    //check cols
    for (let i=0; i<LENGTH_OF_SIDE; i++) {

        winFlag = true;
        for (let j=i+LENGTH_OF_SIDE; j<NUMBER_OF_SQUARES; j+=LENGTH_OF_SIDE) {
            if ((playerBoard[j-LENGTH_OF_SIDE] == '') || (playerBoard[j] == '')) {
                winFlag = false;
            }
            else if ((playerBoard[j] != playerBoard[j-LENGTH_OF_SIDE])) {
                winFlag = false;
            }
        }

        if (winFlag) {
            console.log(winFlag)
            return true;
        }
    }   

    console.log(winFlag);
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
    turnIndicator.innerHTML = `Player's Turn: ${turn}`;
}

function indicateWinner() {
    turnIndicator.innerHTML = `Winner is: ${turn}`;
}

function indicateNoWinner() {
    turnIndicator.innerHTML = `There is NO winner!!!`;
}
