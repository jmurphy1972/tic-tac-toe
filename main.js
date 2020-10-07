console.log('connected');

let LENGTH_OF_SIDE = 3;
let NUMBER_OF_SQUARES = LENGTH_OF_SIDE * LENGTH_OF_SIDE;
let turn = 'X';
let boardObj = [];
let playerBoard = [];
let noWinner = true;

init();

for (let i=0; i<NUMBER_OF_SQUARES; i++) {
    boardObj[i] = document.querySelector(`#square${i}`);
    boardObj[i].style.fontsize = '12pt';
    
    boardObj[i].addEventListener('click', () => {
        if (noWinner) {
            console.log(`Square ${i} has been clicked`);
            boardObj[i].innerHTML = turn;
            playerBoard[i] = turn;

            if (checkWin(i)) {
                console.log(`The winner is: ${turn}`);
                noWinner = false;
            }
            else {
                switchTurn();
            }
        }
    });
} 

function init() {
    let turnIndicator = document.querySelector('#turnIndicator');
    turnIndicator.innerHTML = `Player's Turn: ${turn}`;
    initializeArray();
}

function checkWin(index) {
    let row = Math.floor(index/LENGTH_OF_SIDE);
    let col = index % LENGTH_OF_SIDE;
    
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
