// Your code here
function init() {
    const gameContainer = document.getElementsByClassName('game-container')[0];
    gameContainer.addEventListener('click', gameContainerClickHandler);

    /* gameContainer click */


}

let turn = 'o';
function switchTurn() {
    turn === 'x' ? turn = 'o' : turn = 'x';
    return turn;
}



window.onload = init;
