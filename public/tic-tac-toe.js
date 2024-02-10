import {
    checkHorizontalWin,
    checkVerticalWin,
    checkDiagonalWin,
    isEmptyGrid,
    isFullGrid,
    isTie,
    emptySlotsInBoard
} from './utils/gameLogic.js';

// Your code here
function init() {
    const gameContainer = document.getElementsByClassName('game-container')[0];
    // gameContainer.addEventListener('click', gameContainerClickHandler);

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

function gameContainerClickHandler(event) {
    const target = event.currentTarget;

    const xSymbol = document.createElement('img');
    xSymbol.src = 'assets/player-x.svg';
    xSymbol.className = 'x';

    const oSymbol = document.createElement('img');
    oSymbol.src = 'assets/player-o.svg';
    oSymbol.className = 'o';

    const turn = switchTurn();

    if (turn) {
        try {
            if (turn === 'x') target.appendChild(xSymbol);
            if (turn === 'o') target.appendChild(oSymbol);
        } catch (error) {
            console.error(error)
        }

        target.removeEventListener('click', gameContainerClickHandler);

        const win = checkWin();
        if (win) {
            const gameBoard = document.getElementsByClassName('game-container')[0];
            const emptySlots = emptySlotsInBoard(gameBoard);
            for (let cellId = 0; cellId < emptySlots.length; cellId++) {
                const cell = document.getElementById(`square-${emptySlots[cellId].id}`);
                cell.removeEventListener('click', gameContainerClickHandler)
            }

            const h1 = document.getElementsByClassName('heading')[0];
            h1.innerText = `Winner: `;
            if (win === 'o' || win === 'x') {
                h1.innerText += win.toUpperCase();
            } else if (win === 'T') {
                h1.innerText += 'None';
            } else {
                h1.innerText = 'Game Over';
            }
            return;
        }
    }
}

function checkWin() {
    const gameBoard = document.getElementsByClassName('game-container')[0];
    if (isFullGrid(gameBoard)) {
        return isTie(gameBoard)
    } else if (isEmptyGrid(gameBoard)) {
        return false;
    } else {
        return checkHorizontalWin(gameBoard) || checkVerticalWin(gameBoard) || checkDiagonalWin(gameBoard)
    }
}

window.onload = init;
// window.addEventListener('DOMContentLoaded', init)
