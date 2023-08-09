const worm = document.querySelector(".worm");
const gameContainer = document.querySelector(".game-container");
let wormX = 0;
let wormY = 0;
let wormSegments = [];
let appleX = 0;
let appleY = 0;
let apple = null;

function createApple() {
    if (apple) {
        apple.remove();
    }

    apple = document.createElement("div");
    apple.classList.add("apple");
    gameContainer.appendChild(apple);

    const maxX = gameContainer.clientWidth - 20;
    const maxY = gameContainer.clientHeight - 20;

    appleX = Math.floor(Math.random() * maxX);
    appleY = Math.floor(Math.random() * maxY);

    apple.style.left = appleX + "px";
    apple.style.top = appleY + "px";
}

let score = 0;

function checkCollision() {
    const wormLeft = wormX;
    const wormRight = wormX + worm.clientWidth;
    const wormTop = wormY;
    const wormBottom = wormY + worm.clientHeight;

    const appleLeft = appleX;
    const appleRight = appleX + apple.clientWidth;
    const appleTop = appleY;
    const appleBottom = appleY + apple.clientHeight;

    if (
        wormLeft < appleRight &&
        wormRight > appleLeft &&
        wormTop < appleBottom &&
        wormBottom > appleTop
    ) {
        createApple();
        increaseScore();
    }
}

 function increaseScore() {
    score++; // Aumenta a pontuação
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = score; // Atualiza o elemento HTML com a nova pontuação
}

function updateWormPosition(newX, newY) {
    wormSegments.unshift({ x: wormX, y: wormY});

    if(wormSegments.length > 1){
        const tail = wormSegments.pop();
        tail.x = wormX;
        tail.y = wormY;
        wormSegments.push(tail);
    }

    wormX = newX;
    wormY = newY;
    worm.style.left = wormX + "px";
    worm.style.top = wormY + "px";

    checkCollision();
}

function moveWorm(event) {
    let newX = wormX;
    let newY = wormY;

    switch (event.key) {
        case "ArrowUp":
            newY -= 20;
            break;
        case "ArrowDown":
            newY += 20;
            break;
        case "ArrowLeft":
            newX -= 20;
            break;
        case "ArrowRight":
            newX += 20;
            break;
    }

    newX = Math.max(newX, 0);
    newX = Math.min(newX, gameContainer.clientWidth - 20);
    newY = Math.max(newY, 0);
    newY = Math.min(newY, gameContainer.clientHeight - 20);

    updateWormPosition(newX, newY);
}


let time = 60; // Tempo inicial em segundos
const timerInterval = 1000; // Intervalo de atualização do contador (1 segundo)
let hasStarted = false; // Variável de controle para verificar se o movimento já ocorreu

function startTimer() {
    const timerElement = document.getElementById("time");

    const intervalId = setInterval(() => {
        time--;
        timerElement.textContent = time + " segundos";

        if (time <= 0) {
            clearInterval(intervalId); // Limpa o intervalo quando o tempo chega a zero
            resetGame(); // Chama a função para redefinir o jogo
        }
    }, timerInterval);
}

function startGame() {
    if (!hasStarted) {
        hasStarted = true;
        startTimer(); // Inicia o contador de tempo
    }
}

function resetGame() {
    // Resetar a posição da minhoca, pontuação, tempo, etc.
    // Por exemplo:
    wormX = 0;
    wormY = 0;
    worm.style.left = wormX + "px";
    worm.style.top = wormY + "px";
    score = 0;
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = score;
    time = 60;
    const timerElement = document.getElementById("time");
    timerElement.textContent = time + " segundos";
    createApple();
    wormSegments = [];
    hasStarted = false; // Reseta a variável de controle
}

// ... seu código existente ...

// Inicia o contador de tempo quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    createApple();
    document.addEventListener("keydown", (event) => {
        moveWorm(event);
        startGame(); // Inicia o jogo (e o timer) quando o jogador mover a minhoca pela primeira vez
    });
});
