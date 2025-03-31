// Seleciona o canvas e o contexto
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configurações do jogo
const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let food = generateFood();
let running = false;
let direction = "";
let mouseX = snake[0].x;
let mouseY = snake[0].y;

// Função para desenhar o jogo
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawFood();
    drawSnake();
}

// Função para atualizar a lógica do jogo
function update() {
    if (!running) return;
    moveSnake();
    checkCollision();
}

// Função para movimentar a cobra
function moveSnake() {
    let head = { ...snake[0] };

    if (direction) {
        switch (direction) {
            case "w": head.y -= box; break;
            case "s": head.y += box; break;
            case "a": head.x -= box; break;
            case "d": head.x += box; break;
        }
    } else {
        let dx = mouseX - head.x;
        let dy = mouseY - head.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            head.x += dx > 0 ? box : -box;
        } else {
            head.y += dy > 0 ? box : -box;
        }
    }

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

// Captura posição do mouse
canvas.addEventListener("mousemove", event => {
    let rect = canvas.getBoundingClientRect();
    mouseX = Math.floor((event.clientX - rect.left) / box) * box;
    mouseY = Math.floor((event.clientY - rect.top) / box) * box;
});

// Captura evento para iniciar o jogo e controlar a cobra
document.addEventListener("keydown", event => {
    if (event.key === "q" || event.key === "Q") {
        running = true;
    } else if (["w", "a", "s", "d"].includes(event.key.toLowerCase())) {
        direction = event.key.toLowerCase();
    }
});

// Loop do jogo
function gameLoop() {
    update();
    draw();
}
setInterval(gameLoop, 100);
