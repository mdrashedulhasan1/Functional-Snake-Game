let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameOver.mp3");
const moveSound = new Audio("../music/move.mp3");
const backgroundMusicSound = new Audio("../music/backgroundMusic.mp3");
let speed = 7;
let pastPrintTime = 0;
let snakeArr = [{ x: 10, y: 15 }];
let food = { x: 17, y: 9 };
let score = 0;
let highScoreValue = 0;
function main(currentTime) {
    window.requestAnimationFrame(main);
    if((currentTime - pastPrintTime)/ 1000 < 1/speed) {
        return;
    }
    pastPrintTime = currentTime;
    gameStart();
}
function isCollide(snake){
    //Crashed yourself
    for(let i=1; i<snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 25 || snake[0].x <= 0 || snake[0].y >=25 || snake[0].y <= 0){
        return true;
    }
}
function gameStart() {
    
    //Part1: Updating snake array and Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        backgroundMusicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert('Game over. Please press any key to play again!');
        snakeArr = [{ x: 10, y: 15 }];
        // backgroundMusicSound.play();
        score = 0;
    }

    //If you have eaten the food then regenerate food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        foodSound.play();
        score += 10;
        if(score > highScoreValue){
            highScoreValue = score;
            localStorage.setItem("highscore", JSON.stringify(highScoreValue));
            highScoreBoard.innerHTML = `High Score: ${highScoreValue}`;
        }
        scoreBoard.innerHTML = `Score: ${score}`;
        let a = 5;
        let b = 7;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Snake Head & Body
    const safeArea = document.getElementById('safe-area');
    safeArea.innerHTML = "";
    snakeArr.forEach((e, index) => {
        const snakeHead = document.createElement('div');
        snakeHead.style.gridColumnStart = e.x;
        snakeHead.style.gridRowStart = e.y;
        if (index === 0) {
            snakeHead.classList.add('snake-head');
        }
        else {
            snakeHead.classList.add('snake-body');
        }
        safeArea.appendChild(snakeHead);
    });
    //Snake Food
    const snakeFood = document.createElement('div');
    snakeFood.style.gridColumnStart = food.x;
    snakeFood.style.gridRowStart = food.y;
    snakeFood.classList.add('snake-food');
    safeArea.appendChild(snakeFood);
}
//High Score
let highScore = localStorage.getItem("highscore");
if(highScore === null){
    highScoreValue = 0;
    localStorage.setItem("highscore", JSON.stringify(highScoreValue));
    highScoreBoard.innerHTML = `High Score: ${highScoreValue}`;
}
else{
    highScoreValue = JSON.parse(highScore);
    highScoreBoard.innerHTML = `High Score: ${highScore}`;
}
// Logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    backgroundMusicSound.play();
    switch (e.key) {
        case 'ArrowUp':
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'ArrowDown':
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case 'ArrowRight':
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case 'ArrowLeft':
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

    }
})