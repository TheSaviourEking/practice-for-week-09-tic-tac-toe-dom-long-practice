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
        child.addEventListener('click', gameContainerClickHandler);
    })
}

let turn = 'o';
function switchTurn() {
    turn === 'x' ? turn = 'o' : turn = 'x';
    return turn;
}
let won = false;

function gameContainerClickHandler(event) {
    const target = event.currentTarget;

    /* Buttons */
    const newGameBtn = document.getElementById('newGameBtn');
    newGameBtn.addEventListener('click', newGameBtnListener);

    const giveUpBtn = document.getElementById('giveUpBtn');
    giveUpBtn.addEventListener('click', giveUpBtnListener);

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
                won = true; // game status store;
            } else if (win === 'T') {
                h1.innerText += 'None';
            }
            newGameBtn.disabled = false;
            return;
        } else {
            newGameBtn.disabled = true;
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

/* Button Events */
function newGameBtnListener(event) {
    const gameBoard = document.getElementsByClassName('game-container')[0];
    function clearGameStatus() {
        if (won) {
            won = false;
        }
    }

    function clearHeader() {
        const h1 = document.getElementsByClassName('heading')[0];
        h1.innerText = '';
    }

    function clearBoard() {
        gameBoard.childNodes.forEach(cell => {
            cell.addEventListener('click', gameContainerClickHandler); // readding the click event handler while clearing board to avoid double loops
            const cellChild = cell.childNodes[0];
            if (cell && cellChild) {
                cell.removeChild(cellChild)
            }
        })
    }

    clearGameStatus();
    clearHeader();
    clearBoard();
    switchTurn();
    event.target.disabled = true;

    const giveUpBtn = document.getElementById('giveUpBtn');
    giveUpBtn.disabled = false;

}

function giveUpBtnListener(event) {
    function setWon() {
        won = true;
    }

    function resetStatus() {
        const gameBoard = document.getElementsByClassName('game-container')[0];
        const h1 = document.getElementsByClassName('heading')[0];
        if (!isEmptyGrid(gameBoard)) {
            h1.innerText = `Won by "${turn.toUpperCase()}" player`;
        }
    }
    event.target.disabled = true;
    setWon();
    resetStatus();
    const newGameBtn = document.getElementById('newGameBtn');
    newGameBtn.disabled = false;
}

window.onload = init;
// window.addEventListener('DOMContentLoaded', init)
