"use strict"; //baraye inke yek seri khata ha kamtar beshe va az feature haye jadide JS estefade kard.

// constant Vriables :
const ball = document.getElementById('ball');
const board = document.getElementById('game-board');
const score = document.getElementById('score');
const startButton = document.getElementById('start-button');
const factorialInput = document.getElementById('input');
const factorialValue = document.getElementById('factorial-value');
const factorialBoard = document.getElementById('factorial-board');

// ba event 'click' tabe start farakhani mishavad :
startButton.addEventListener('click', start);

// variables :
let counter = 0;
let sumOfScores = 0;

function calculateFactorial() {
    let result = 1;
    //string to integer
    const number = parseInt(factorialInput.value);

    if (number <= 1) result = 1;
    else {
        for (let i = 2; i <= number; i++) {
            result *= i;
        }
    }
    factorialValue.textContent = String(result);
}


function randomPosition() {
    //ijade position random baraye ball dar andaze safhe bazi.
    const randomX = String(Math.random() * 600 + 50);
    const randomY = String(Math.random() * 400 + 50);
    ball.style.left = `${randomX}px`;
    ball.style.top = `${randomY}px`;

    // afzayeshe counter baraye etmame bazi bad az 10 bar.
    counter++;

    // shart haye bord ya bakhte user.
    //if (counter === 10 && sumOfScores <= 10000) {
    if (counter == 12 && sumOfScores <= 2500) {
        board.removeEventListener('click', handleBoardClick);
        ball.removeEventListener('mouseenter', randomPosition);
        startButton.removeEventListener('click', start);
        board.style.display = 'none';
        factorialBoard.style.display = 'flex';
    }
    if (sumOfScores > 2500 || counter > 18) {
    //if (sumOfScores > 10000 || counter > 50) {
        board.removeEventListener('click', handleBoardClick);
        ball.removeEventListener('mouseenter', randomPosition);
        startButton.removeEventListener('click', start);
        window.alert('You Lose!');
    }
}


function handleBoardClick(event) {
    // parseInt : tabdile float be integer
    // mohasebe meghdar emtiaz ba tavajoh be andaze click nesbat be vasate ball:
    const mouseX = parseInt(event.clientX);
    const mouseY = parseInt(event.clientY);
    const ballX = parseInt(ball.getBoundingClientRect().x) + 25;
    const ballY = parseInt(ball.getBoundingClientRect().y) + 25;
    const XDistance = Math.pow(ballX - mouseX, 2);
    const YDistance = Math.pow(ballY - mouseY, 2);
    const distance = parseInt(Math.sqrt(XDistance + YDistance));
    sumOfScores += distance;
    score.textContent = String(sumOfScores);
}


function start(event) {
    // vase inke yek  dar pedar emal nashavad.
    event.stopPropagation();
    ball.style.opacity = 1;
    //event "mouseenter" : hover shodane ball vaghti mouse rooye ball miad .
    ball.addEventListener('mouseenter', randomPosition);
    // event click  baraye mohasebe score.
    board.addEventListener('click', handleBoardClick);
}
