console.log('connected');

let NUMBER_OF_SQUARES = 9;
let turn = 'X';
let board = [];

for (let i=0; i<NUMBER_OF_SQUARES; i++) {
    board[i] = document.querySelector(`#square${i}`);
    board[i].addEventListener('click', () => {
        console.log(`Square ${i} has been clicked`);
    });
}

