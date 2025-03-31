// Seleciona o canvas e o contexto
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configurações do jogo
const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = "RIGHT";
let food = generateFood();

// Função para desenhar o jogo
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawFood();
    drawSnake();
}

// Função para atualizar a lógica do jogo
function update() {
    moveSnake();
    checkCollision();
}

// Função para movimentar a cobra
function moveSnake() {
    let head = { ...snake[0] };
    if (direction === "A") head.x -= box;
    if (direction === "W") head.y -= box;
    if (direction === "D") head.x += box;
    if (direction === "S") head.y += box;

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
    } else {
        snake.pop();
    }

    snake.unshift(head);
}

// Função para verificar colisões
function checkCollision() {
    let head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        alert("Game Over!");
        document.location.reload();
    }
}

// Função para desenhar a comida
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}

// Função para desenhar a cobra
function drawSnake() {
    ctx.fillStyle = "lime";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, box, box);
    });
}

// Função para gerar comida em posições aleatórias
function generateFood() {
    return {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
}

// Captura eventos de teclado
document.addEventListener("keydown", event => {
    if (event.key === "a" && direction !== "D") direction = "A";
    if (event.key === "w" && direction !== "S") direction = "W";
    if (event.key === "d" && direction !== "A") direction = "D";
    if (event.key === "s" && direction !== "W") direction = "S";
});

// Loop do jogo
function gameLoop() {
    update();
    draw();
}
setInterval(gameLoop, 100);
