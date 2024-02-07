window.addEventListener('DOMContentLoaded', () => {
    const GAMELENGTH = 3;
    const h1 = document.createElement('h1');
    h1.setAttribute('class', 'heading');
    h1.innerText = 'Winner:';
    // const heading = `<h1 class='heading'>Winner:</h1>`;

    const gameContainer = document.createElement('div');
    gameContainer.setAttribute('class', 'game-container');
    for (let row = 0; row < GAMELENGTH; row++) {
        for (let col = 0; col < GAMELENGTH; col++) {
            const div = document.createElement('div');
            div.setAttribute('class', 'cell');
            div.setAttribute('data-row', row);
            div.setAttribute('data-col', col);
            gameContainer.appendChild(div);
        }
    }

    const controls = document.createElement('div');
    controls.setAttribute('class', 'controls')
    const newGameControl = document.createElement('button');
    const giveUpControl = document.createElement('button');

    newGameControl.innerText = 'New Game';
    giveUpControl.innerText = 'Give Up'
    controls.appendChild(newGameControl);
    controls.appendChild(giveUpControl);

    // initialize page
    document.body.appendChild(h1);
    document.body.appendChild(gameContainer);
    document.body.appendChild(controls);
})
