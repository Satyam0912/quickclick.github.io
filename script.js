const gameInfo = document.getElementById("gameInfo");
const startBtn = document.getElementById("startBtn");
const result = document.getElementById("result");
const message = document.getElementById("message");
const gameArea = document.getElementById("gameArea");

let inPlay = false;
let count = 0;
let playArea = {};
const maxDuration = 2;

const showMessage = (notification) => {
    message.innerHTML = `<h3>${notification}</h3>`;
}

const getMeTheHeight = () => {
    return gameArea.clientHeight <= 100 ? gameArea.clientHeight + 200 : gameArea.clientHeight - 200;
}

const getMeTheWidth = () => {
    return gameArea.clientWidth <= 100 ? gameArea.clientWidth + 200 : gameArea.clientWidth - 200;
}

const random = (num) => {
    return Math.floor(Math.random() * num);
}

const randomColorGenerator = () => {
    return `rgb(${random(256)},${random(256)},${random(256)})`;
}

const resetGame = () => {
    clearTimeout(playArea.timer)
    inPlay = false;
    startBtn.style.display = 'block'
}

const handleBoxClick = (start) => {

    let end = new Date().getTime();

    let duration = (end - start) / 1000;

    if (playArea.timer) {
        clearTimeout(playArea.timer)
    }

    clearTimeout(playArea.timer)

    showMessage(`It took you ${duration} seconds to click.`)

    if (duration > maxDuration) {
        gameArea.children[0].remove()
        result.innerHTML = `Too slow <span id="loser">You lost!</span> your score was ${count}
        <br>
        click the start button to start again`;
        resetGame();
    }
    else {
        gameArea.children[0].remove();
        count++;
        playArea.timer = setTimeout(myBox, random(4000));
        if (count === 15) {
            result.innerHTML = `You reach ${15}
            <span id="winner">You win!</span>
            <br>
            Click the start button to play again!`
            resetGame()
        } else {
            result.innerHTML = `Score: ${count} of 15`
        }
    }

}

const myBox = () => {

    let box = document.createElement('div');

    box.classList.add('box')

    box.style.top = random(getMeTheHeight()) + "px";
    box.style.left = random(getMeTheWidth()) + "px";

    box.style.backgroundColor = randomColorGenerator()

    box.start = new Date().getTime();

    box.addEventListener('click', () => handleBoxClick(box.start));

    playArea.timer = setTimeout(() => handleBoxClick(box.start), 2000)

    gameArea.appendChild(box);
}

const showBox = () => {
    playArea.timer = setTimeout(() => myBox(), random(4000))
}

const handleStartBtn = () => {
    inPlay = true;
    gameInfo.style.display = "none"
    startBtn.style.display = "none"
    result.innerHTML = "";
    count = 0;
    showMessage("Starting...")
    showBox()
}