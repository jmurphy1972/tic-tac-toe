console.log('connected');

'use strict';

let LENGTH_OF_SIDE = 3;
let NUMBER_OF_SQUARES = LENGTH_OF_SIDE * LENGTH_OF_SIDE;
let NUMBER_OF_TOKENS = 4;
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
let customXImgObj = document.querySelector('#customXimage');
let customOImgObj = document.querySelector('#customOimage');

let nameforX = document.querySelector('#nameforX');
let nameforO = document.querySelector('#nameforO');

let countXObj = document.querySelector('#CountforX');
let countOObj = document.querySelector('#CountforO');
let countforDraw = document.querySelector('#CountforDraw');

let imgObj = [];
let imgToken = [];
let imageHeader = document.querySelector('#imageHeader');

customXImgButtonPressed = false;
customOImgButtonPressed = false;

let aiButtonObj = document.querySelector('.aiButton');
let aiText = document.querySelector('.aiMode');
let aiMode = false;

init();

for (let i=0; i<NUMBER_OF_SQUARES; i++) {
    
    boardObj[i].addEventListener('click', () => {

        if (boardInPlay) {
            console.log(`Square ${i} has been clicked`);
            
            if (playerBoard[i] == '') {
                playerBoard[i] = turn;
                localStorage.setItem('sq' + i, playerBoard[i]);

                if (turn == 'X') {
                    if (tokenX.includes('.jpg')) {
                        imgObj[i].src = getToken();
                    }
                    else {
                        boardObj[i].innerHTML = getToken();
                    }
                }
                else {
                    if (tokenO.includes('.jpg')) {
                        imgObj[i].src = getToken();
                    }
                    else {
                        boardObj[i].innerHTML = getToken();
                    }
                }

                checkPlayerWinner();
            }

            checkBoardFull();

            // AI System
            if ((aiMode) && (boardInPlay) && (turn == 'O')) {
                let emptySquareCount = 0;
                for (let j=0; j<NUMBER_OF_SQUARES; j++) {
                    if (playerBoard[j] == '') {
                        emptySquareCount++;
                    }
                }
                console.log(`empty square count is ${emptySquareCount}`);

                let aiMove = Math.floor(Math.random() * emptySquareCount);
                emptySquareCount = 0;
                for (let j=0; j<NUMBER_OF_SQUARES; j++) {
                    if (playerBoard[j] == '') {
                        if (emptySquareCount == aiMove) {
                            console.log(`AI chooses ${j}`);
                            playerBoard[j] = turn;
                            localStorage.setItem('sq' + j, playerBoard[j]);
                            
                            if (tokenO.includes('.jpg')) {
                                console.log(`space is ${j}`);
                                imgObj[j].src = getToken();
                            }
                            else {
                                boardObj[j].innerHTML = getToken();
                            }
                        }
                        emptySquareCount++;
                    }
                }

                checkPlayerWinner();
                checkBoardFull();
            }

            location.reload();
        }
    });
}


for (let i=0; i<NUMBER_OF_TOKENS; i++) {
    imgToken[i].addEventListener('click', () => {
        if (customXImgButtonPressed) {
            tokenX = imgToken[i].getAttribute('src');
            updateStorage('tokenX', tokenX);
            refreshBoard();
            customXImgButtonPressed = false;
            location.reload();
        }
        if (customOImgButtonPressed) {
            tokenO = imgToken[i].getAttribute('src');
            updateStorage('tokenO', tokenO);
            refreshBoard();
            customOImgButtonPressed = false;
            location.reload();
        }
    });
}

function checkPlayerWinner() {
    if (isPlayerWinner()) {
        boardInPlay = false;
        updateStorage('boardInPlay', boardInPlay);
        indicateWinner();
    }
    else {
        switchTurn();
        updateStorage('turn', turn);
        console.log(localStorage.getItem('turn'));
    }
}

function checkBoardFull() {
    if (isBoardFull()) {
        if (boardInPlay) {
            console.log("There is NO winner");
            turn = '';
            localStorage.setItem('turn', turn);
            indicateNoWinner();
        }

        boardInPlay = false;
        updateStorage('boardInPlay', boardInPlay);
    }
}


playAgainButtonObj.addEventListener('click', () => {
    console.log('Play Again Button clicked');
    initializeBoard();
});

aiButtonObj.addEventListener('click', () => {
    console.log('AI Button clicked');
    
    if (aiMode) {
        aiMode = false;
        aiText.innerHTML = 'The system is NOT in AI mode';
        aiText.style.color = 'black';
    }
    else {
        aiMode = true;
        aiText.innerHTML = 'The system is in AI mode';
        aiText.style.color = 'red';
    }
    updateStorage('aiMode', aiMode);
});

resetButtonObj.addEventListener('click', () => {
    console.log('Reset button clicked');
    initializeBoard();

    aiMode = false;
    updateStorage('aiMode', aiMode);

    if (aiMode) {
        aiText.innerHTML = 'The system is in AI mode';
        aiText.style.color = 'red';
    }
    else {
        aiText.innerHTML = 'The system is NOT in AI mode';
        aiText.style.color = 'black';
    }

    scoreX = 0;
    updateStorageAndHtmlObj('scoreX', scoreX, countXObj);

    scoreO = 0;
    updateStorageAndHtmlObj('scoreO', scoreO, countOObj);

    scoreDraw = 0;
    updateStorageAndHtmlObj('scoreDraw', scoreDraw, countforDraw);

    tokenX = 'X';
    updateStorageAndHtmlObj('tokenX', 'X', nameforX);
    tokenO = 'O';
    updateStorageAndHtmlObj('tokenO', 'O', nameforO);

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

customXImgObj.addEventListener('click', () => {
    console.log('customXImgObj button clicked');

    if (!customOImgButtonPressed) {

        if (customXImgButtonPressed) {
            customXImgButtonPressed = false;
        }
        else {
            customXImgButtonPressed = true;
        }

        for (let i=0; i<NUMBER_OF_TOKENS; i++) {
            if (customXImgButtonPressed) {
                imgToken[i].style.display = 'block';
            }
            else {
                imgToken[i].style.display = 'none';
            }
        }
        
        if (customXImgButtonPressed == 'none') {
            imageHeader.style.display = 'block';
        }
        else {
            imageHeader.style.display = 'none';
        }
    }

});

customOImgObj.addEventListener('click', () => {
    console.log('customXImgObj button clicked');

    if (!customXImgButtonPressed) {

        if (customOImgButtonPressed) {
            customOImgButtonPressed = false;
        }
        else {
            customOImgButtonPressed = true;
        }
        
        for (let i=0; i<NUMBER_OF_TOKENS; i++) {
            if (customOImgButtonPressed) {
                imgToken[i].style.display = 'block';
            }
            else {
                imgToken[i].style.display = 'none';
            }
        }
        
        if (customOImgButtonPressed == 'none') {
            imageHeader.style.display = 'block';
        }
        else {
            imageHeader.style.display = 'none';
        }
    }
});


function initializeBoard() {
    for (let i=0; i<NUMBER_OF_SQUARES; i++) {
        boardObj[i] = document.querySelector(`#square${i}`);
        boardObj[i].style.fontsize = '12pt';
        
        playerBoard[i] = '';
        updateStorage(`sq${i}`, playerBoard[i]);
        updateStorageAndHtmlObj('sq' + i, '', boardObj[i]);
    }

    turn = 'X';
    updateStorage('turn', turn);
    updateTurnIndicator();

    boardInPlay = true;
    updateStorage('boardInPlay', boardInPlay);
}

function customToken(player, key, value, htmlObj) {
    let answer = prompt(`What is the ${player} token? (max 8 char) `);
    if (answer == null) {
        return value;
    }

    value = answer.substring(0, 8);
    updateStorageAndHtmlObj(key, value, htmlObj);

    return value;
}


function init() {
    for (let i=0; i<NUMBER_OF_SQUARES; i++) {
        boardObj[i] = document.querySelector(`#square${i}`);
        boardObj[i].style.fontsize = '12pt';

        imgObj[i] = boardObj[i].querySelector('img');
    }

    imgToken = document.querySelectorAll('img.imageLibraryEntry');

    aiMode = getBooleanFromStorageWithDefault('aiMode', false);
    if (aiMode) {
        aiText.innerHTML = 'The system is in AI mode';
        aiText.style.color = 'red';
    }
    else {
        aiText.innerHTML = 'The system is NOT in AI mode';
        aiText.style.color = 'black';
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
            updateStorage(`sq${i}`, playerBoard[i]);
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
    updateStorageAndHtmlObj(key, value, htmlObj);
    return value;
}

function getIntFromStorageWithDefault(key, value, htmlObj, def) {
    if (localStorage.getItem(key)) {
        value = parseInt(localStorage.getItem(key), 10);
    }
    else {
        value = def;
    }
    updateStorageAndHtmlObj(key, value, htmlObj);
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
            if (!tokenX.includes('.jpg')) {
                boardObj[i].innerHTML = tokenX;
            }
            else {
                imgObj[i].src = tokenX;
            }
        }
        else if (playerBoard[i] == 'O') {
            if (!tokenO.includes('.jpg')) {
                boardObj[i].innerHTML = tokenO;
            }
            else {
                imgObj[i].src = tokenO;
            }
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

function isPlayerWinner() {
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


function switchTurn() {
    if (turn == 'X') {
        turn = 'O';
        updateStorage('turn', turn);
    }
    else if (turn == 'O') {
        turn = 'X';
        updateStorage('turn', turn);
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
    turnIndicator.style.color = 'limegreen';
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
        updateStorageAndHtmlObj('scoreX', scoreX, countXObj);
    }
    else if (turn == 'O') {
        scoreO++;
        updateStorageAndHtmlObj('scoreO', scoreO, countOObj);
    }
    else {
        scoreDraw++;
        updateStorageAndHtmlObj('scoreDraw', scoreDraw, countforDraw);
    }
}

function updateStorageAndHtmlObj(key, value, htmlObj) {
    console.log(`update ${key} and ${value} on ${htmlObj}`);
    localStorage.setItem(key, value);
    htmlObj.innerHTML = value;
}

function updateStorage(key, value) {
    console.log(`update ${key} and ${value}`);
    localStorage.setItem(key, value);
}
