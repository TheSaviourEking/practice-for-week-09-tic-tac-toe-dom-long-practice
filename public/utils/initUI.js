window.addEventListener('DOMContentLoaded', () => {
    const BOARDLENGTH = 9;
    const h1 = document.createElement('h1');
    h1.setAttribute('class', 'heading');

    const gameContainer = document.createElement('div');
    gameContainer.setAttribute('class', 'game-container');
    
    for (let id = 0; id < BOARDLENGTH; id++) {
        const div = document.createElement('div');
        div.setAttribute('class', 'cell');
        div.setAttribute('id', `square-${id}`);

        gameContainer.appendChild(div);
    }

    const controls = document.createElement('div');
    controls.setAttribute('class', 'controls');
    const newGameControl = document.createElement('button');
    newGameControl.setAttribute('id', 'newGameBtn');
    const giveUpControl = document.createElement('button');
    giveUpControl.setAttribute('id', 'giveUpBtn');

    newGameControl.innerText = 'New Game';
    giveUpControl.innerText = 'Give Up';
    controls.appendChild(newGameControl);
    controls.appendChild(giveUpControl);

    // initialize page
    document.body.appendChild(h1);
    document.body.appendChild(gameContainer);
    document.body.appendChild(controls);
})
