// Your code here
function init() {
    const gameContainer = document.getElementsByClassName('game-container')[0];
    // gameContainer.addEventListener('click', gameContainerClickHandler);

    // console.log(gameContainer.childNodes)

    /* cell eventListeners */
    gameContainer.childNodes.forEach(child => {
        child.addEventListener('click', gameContainerClickHandler)
    })


}

let turn = 'o';
function switchTurn() {
    turn === 'x' ? turn = 'o' : turn = 'x';
    return turn;
}
// let firstClick = true;
function gameContainerClickHandler(event) {
    const target = event.currentTarget;

    const xSymbol = document.createElement('img');
    xSymbol.src = 'assets/player-x.svg';

    const oSymbol = document.createElement('img');
    oSymbol.src = 'assets/player-o.svg';

    const turn = switchTurn();

    if (turn) {
        try {
            if (turn === 'x') target.appendChild(xSymbol);
            if (turn === 'o') target.appendChild(oSymbol);
        } catch (error) {
            console.error(error)
        }

        target.removeEventListener('click', gameContainerClickHandler);
    }
}

window.onload = init;
// window.addEventListener('DOMContentLoaded', init)
