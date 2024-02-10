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

    if (localStorage.getItem('tic-tac-toe')) {
        const gameState = JSON.parse(localStorage.getItem('tic-tac-toe'));
        const winner = JSON.parse(localStorage.getItem('winner'));

        const h1 = document.getElementsByClassName('heading')[0];
        h1.innerText = winner;

        for (let i = 0; i < gameState[0].length; i++) {
            const { index, className } = gameState[0][i];
            gameContainer.childNodes[index].appendChild(createSymbols(className));
        }
        const emptySlots = emptySlotsInBoard(gameContainer);
        for (let cellId = 0; cellId < emptySlots.length; cellId++) {
            const cell = document.getElementById(`square-${emptySlots[cellId].id}`);
            cell.addEventListener('click', gameContainerClickHandler)
        }

    } else {
        /* cell eventListeners */
        // const gameContainer = document.getElementsByClassName('game-container')[0];
        gameContainer.childNodes.forEach(child => {
            child.addEventListener('click', gameContainerClickHandler);
        })
    }

    const newGameBtn = document.getElementById('newGameBtn');
    newGameBtn.disabled = true;

    const giveUpBtn = document.getElementById('giveUpBtn');
    giveUpBtn.disabled = false;
}

const gameState = JSON.parse(localStorage.getItem('tic-tac-toe'));

const players = ['x', 'o'];
let currentPlayerIndex = gameState ? gameState[1] : 1;
function switchPlayers() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    return players[currentPlayerIndex];
}
let won = false;

function gameContainerClickHandler(event) {
    const target = event.currentTarget;

    /* Buttons */
    const newGameBtn = document.getElementById('newGameBtn');
    newGameBtn.addEventListener('click', newGameBtnListener);

    const giveUpBtn = document.getElementById('giveUpBtn');
    giveUpBtn.addEventListener('click', giveUpBtnListener);

    const turn = switchPlayers();

    if (turn) {
        try {
            if (turn === 'x') target.appendChild(createSymbols('x'));
            if (turn === 'o') target.appendChild(createSymbols('o'));
        } catch (error) {
            console.error(error)
        }

        const gameContainer = document.getElementsByClassName('game-container')[0];
        const gameBoardClassArr = [[]];
        for (let i = 0; i < gameContainer.childNodes.length; i++) {
            const child = gameContainer.childNodes[i];
            if (child && child.childNodes[0]?.className) {
                gameBoardClassArr[0].push({ index: i, className: child.childNodes[0].className });
            }
        }
        gameBoardClassArr.push(currentPlayerIndex);
        localStorage.setItem('tic-tac-toe', JSON.stringify(gameBoardClassArr));
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
                h1.innerText += " " + win.toUpperCase();
                won = true; // game status store;

            } else if (win === 'T') {
                h1.innerText += ' ' + 'None';
            }
            localStorage.setItem('winner', JSON.stringify(h1.innerText));
            giveUpBtn.disabled = true;
            newGameBtn.disabled = false;
            return;

        } else {
            newGameBtn.disabled = true;
        }
    }
}

function createSymbols(className) {
    const symbol = document.createElement('img');
    symbol.src = `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${className}.svg`;
    symbol.className = className;
    return symbol;
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
    localStorage.removeItem('tic-tac-toe');

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
    switchPlayers();
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
        if (!isEmptyGrid(gameBoard) && !isFullGrid(gameBoard)) {
            h1.innerText += `Winner: ${players[currentPlayerIndex].toUpperCase()}`;
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
