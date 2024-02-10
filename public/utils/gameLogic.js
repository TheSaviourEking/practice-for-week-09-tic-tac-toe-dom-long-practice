/* Phase 3 */
export function checkHorizontalWin(gameBoard) {
    const BOARDLENGTH = gameBoard.childNodes.length;

    for (let id = 1; id < BOARDLENGTH; id += 3) {
        const centerCell = document.getElementById(`square-${id}`);
        const leftCell = document.getElementById(`square-${id - 1}`);
        const rightCell = document.getElementById(`square-${id + 1}`);

        if (centerCell.childNodes[0] && leftCell.childNodes[0] && rightCell.childNodes[0]) {
            if (leftCell.childNodes[0].className === centerCell.childNodes[0].className &&
                centerCell.childNodes[0].className === rightCell.childNodes[0].className) {
                return centerCell.childNodes[0].className;
            }
        }
    }

    return false;
}

export function checkVerticalWin(gameBoard) {
    const BOARDLENGTH = gameBoard.childNodes.length;

    for (let id = (BOARDLENGTH - 1) / 2 - 1; id < BOARDLENGTH / 2 + 1; id++) {
        const centerCell = document.getElementById(`square-${id}`);
        const topCell = document.getElementById(`square-${id - 3}`);
        const bottomCell = document.getElementById(`square-${id + 3}`);

        if (centerCell.childNodes[0] && topCell.childNodes[0] && bottomCell.childNodes[0]) {
            if (topCell.childNodes[0].className === centerCell.childNodes[0].className &&
                centerCell.childNodes[0].className === bottomCell.childNodes[0].className) {
                return centerCell.childNodes[0].className;
            }
        }
    }
    return false;
}
export function checkDiagonalWin(gameBoard) {
    const BOARDLENGTH = gameBoard.childNodes.length;

    for (let id = (BOARDLENGTH - 1) / 2; id < (BOARDLENGTH - 1) / 2 + 1; id += 3) {
        const centerCell = document.getElementById(`square-${id}`);
        const topCell = document.getElementById(`square-${id - 4}`);
        const bottomCell = document.getElementById(`square-${id + 4}`);

        if (centerCell.childNodes[0] && topCell.childNodes[0] && bottomCell.childNodes[0]) {
            if (topCell.childNodes[0].className === centerCell.childNodes[0].className &&
                centerCell.childNodes[0].className === bottomCell.childNodes[0].className) {
                return centerCell.childNodes[0].className;
            }
        }
    }

    for (let id = (BOARDLENGTH - 1) / 2; id < (BOARDLENGTH - 1) / 2 + 1; id += 3) {
        const centerCell = document.getElementById(`square-${id}`);
        const topCell = document.getElementById(`square-${id - 2}`);
        const bottomCell = document.getElementById(`square-${id + 2}`);

        if (centerCell.childNodes[0] && topCell.childNodes[0] && bottomCell.childNodes[0]) {
            if (topCell.childNodes[0].className === centerCell.childNodes[0].className &&
                centerCell.childNodes[0].className === bottomCell.childNodes[0].className) {
                return centerCell.childNodes[0].className;
            }
        }
    }

    return false;
}

export function isEmptyGrid(gameBoard) {
    for (let i = 0; i < gameBoard.childNodes.length; i++) {
        let child = gameBoard.childNodes[i];
        if (child.childNodes[0].className === 'x' || child.childNodes[0].className === 'o') {
            return false;
        }
    }
    return true;
}

export function isFullGrid(gameBoard) {

    // debugger;
    for (let i = 0; i < gameBoard.childNodes.length; i++) {
        let child = gameBoard.childNodes[i].childNodes[0];
        if (!child?.className) {
            return false;
        }
    }
    return true;
}

export function isTie(gameBoard) {
    if (isFullGrid(gameBoard)) {
        if (!checkDiagonalWin(gameBoard) && !checkHorizontalWin(gameBoard) && !checkVerticalWin(gameBoard)) {
            return 'T';
        }
    }
    return false;
}

export function emptySlotsInBoard(gameBoard) {
    const result = [];

    for (let id = 0; id < gameBoard.childNodes.length; id++) {
        let child = gameBoard.childNodes[id].childNodes[0];
        if (!child?.className) {
            result.push({ id })
        }
    }

    return result;
}
