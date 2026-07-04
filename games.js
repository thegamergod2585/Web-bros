// ============= GAMES.JS - All Game Logic =============

// ======== NAVIGATION ========
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId + '-section').classList.add('active');
    event.target.classList.add('active');
}

// ======== GAME 1: FLAPPY BIRD ========
let flappyGameActive = false;
let flappyBird = { x: 50, y: 150, width: 20, height: 20, velocity: 0 };
let flappyPipes = [];
let flappyScore = 0;
let flappyGameSpeed = 0;

function startFlappyBird() {
    const gameDiv = document.getElementById('flappy-game');
    if (gameDiv.style.display === 'none') {
        gameDiv.style.display = 'block';
        flappyGameActive = true;
        flappyScore = 0;
        flappyBird = { x: 50, y: 150, width: 20, height: 20, velocity: 0 };
        flappyPipes = [];
        flappyGameSpeed = 0;
        
        const canvas = document.getElementById('flappyCanvas');
        const ctx = canvas.getContext('2d');
        
        document.addEventListener('click', flappyFlap);
        document.addEventListener('keydown', flappyKeyPress);
        
        updateFlappyBird(canvas, ctx);
    } else {
        gameDiv.style.display = 'none';
        flappyGameActive = false;
        document.removeEventListener('click', flappyFlap);
        document.removeEventListener('keydown', flappyKeyPress);
    }
}

function flappyFlap() {
    if (flappyGameActive) flappyBird.velocity = -8;
}

function flappyKeyPress(e) {
    if (e.key === 'r' || e.key === 'R') {
        startFlappyBird();
        startFlappyBird();
    }
}

function updateFlappyBird(canvas, ctx) {
    if (!flappyGameActive) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bird
    flappyBird.velocity += 0.3;
    flappyBird.y += flappyBird.velocity;
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(flappyBird.x, flappyBird.y, flappyBird.width, flappyBird.height);
    
    // Generate pipes
    flappyGameSpeed++;
    if (flappyGameSpeed % 90 === 0) {
        const gap = 100;
        const pipeY = Math.random() * (canvas.height - gap - 100) + 50;
        flappyPipes.push({ x: canvas.width, y: pipeY, width: 50, gap: gap, scored: false });
    }
    
    // Draw and update pipes
    flappyPipes = flappyPipes.filter(pipe => {
        pipe.x -= 5;
        ctx.fillStyle = '#228B22';
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.y);
        ctx.fillRect(pipe.x, pipe.y + pipe.gap, pipe.width, canvas.height);
        
        // Check collision
        if (flappyBird.x < pipe.x + pipe.width && 
            flappyBird.x + flappyBird.width > pipe.x &&
            (flappyBird.y < pipe.y || flappyBird.y + flappyBird.height > pipe.y + pipe.gap)) {
            flappyGameActive = false;
            alert('Game Over! Score: ' + flappyScore);
        }
        
        // Score
        if (!pipe.scored && pipe.x < flappyBird.x) {
            flappyScore++;
            pipe.scored = true;
            document.getElementById('flappy-score').textContent = flappyScore;
        }
        
        return pipe.x > -pipe.width;
    });
    
    // Check boundaries
    if (flappyBird.y > canvas.height || flappyBird.y < 0) {
        flappyGameActive = false;
        alert('Game Over! Score: ' + flappyScore);
    }
    
    requestAnimationFrame(() => updateFlappyBird(canvas, ctx));
}

// ======== GAME 2: SNAKE GAME ========
let snakeGameActive = false;
let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 15};
let snakeScore = 0;
let snakeDirection = {x: 1, y: 0};
let nextDirection = {x: 1, y: 0};

function startSnakeGame() {
    const gameDiv = document.getElementById('snake-game');
    if (gameDiv.style.display === 'none') {
        gameDiv.style.display = 'block';
        snake = [{x: 10, y: 10}];
        food = {x: 15, y: 15};
        snakeScore = 0;
        snakeDirection = {x: 1, y: 0};
        nextDirection = {x: 1, y: 0};
        snakeGameActive = true;
        
        document.addEventListener('keydown', snakeKeyPress);
        updateSnakeGame();
    } else {
        gameDiv.style.display = 'none';
        snakeGameActive = false;
        document.removeEventListener('keydown', snakeKeyPress);
    }
}

function snakeKeyPress(e) {
    if (e.key === 'ArrowUp' && snakeDirection.y === 0) nextDirection = {x: 0, y: -1};
    if (e.key === 'ArrowDown' && snakeDirection.y === 0) nextDirection = {x: 0, y: 1};
    if (e.key === 'ArrowLeft' && snakeDirection.x === 0) nextDirection = {x: -1, y: 0};
    if (e.key === 'ArrowRight' && snakeDirection.x === 0) nextDirection = {x: 1, y: 0};
}

function updateSnakeGame() {
    if (!snakeGameActive) return;

    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 16;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    snakeDirection = nextDirection;
    const head = {x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y};
    
    // Check boundaries
    if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
        snakeGameActive = false;
        alert('Game Over! Score: ' + snakeScore);
        return;
    }
    
    // Check self collision
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        snakeGameActive = false;
        alert('Game Over! Score: ' + snakeScore);
        return;
    }
    
    snake.unshift(head);
    
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        snakeScore += 10;
        document.getElementById('snake-score').textContent = snakeScore;
        food = {x: Math.floor(Math.random() * (canvas.width / gridSize)), y: Math.floor(Math.random() * (canvas.height / gridSize))};
    } else {
        snake.pop();
    }
    
    // Draw snake
    ctx.fillStyle = '#4caf50';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });
    
    // Draw food
    ctx.fillStyle = '#FF6B6B';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    
    setTimeout(updateSnakeGame, 100);
}

// ======== GAME 3: MEMORY MATCH ========
let memoryCards = [];
let memoryMatches = 0;
let memoryGameActive = false;
const symbols = ['🌟', '🎮', '🍎', '🎲', '🎪', '🎨', '🎭', '🎸'];

function startMemoryGame() {
    const gameDiv = document.getElementById('memory-game');
    if (gameDiv.style.display === 'none') {
        gameDiv.style.display = 'block';
        memoryMatches = 0;
        memoryGameActive = true;
        memoryCards = [];
        
        const shuffled = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
        const grid = document.getElementById('memoryGrid');
        grid.innerHTML = '';
        
        shuffled.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.textContent = '?';
            card.dataset.symbol = symbol;
            card.dataset.matched = 'false';
            card.onclick = () => flipMemoryCard(card);
            grid.appendChild(card);
            memoryCards.push({element: card, flipped: false});
        });
    } else {
        gameDiv.style.display = 'none';
        memoryGameActive = false;
    }
}

let memoryFlipped = [];

function flipMemoryCard(card) {
    if (!memoryGameActive || memoryFlipped.length >= 2 || card.dataset.matched === 'true') return;
    
    card.classList.add('flipped');
    card.textContent = card.dataset.symbol;
    memoryFlipped.push(card);
    
    if (memoryFlipped.length === 2) {
        if (memoryFlipped[0].dataset.symbol === memoryFlipped[1].dataset.symbol) {
            memoryFlipped.forEach(c => {
                c.dataset.matched = 'true';
                c.classList.add('matched');
            });
            memoryMatches++;
            document.getElementById('memory-matches').textContent = memoryMatches;
            
            if (memoryMatches === 8) {
                alert('You won! All pairs matched!');
                memoryGameActive = false;
            }
            memoryFlipped = [];
        } else {
            setTimeout(() => {
                memoryFlipped.forEach(c => {
                    c.classList.remove('flipped');
                    c.textContent = '?';
                });
                memoryFlipped = [];
            }, 800);
        }
    }
}

// ======== GAME 4: GUESSING GAME ========
let guessingNumber = 0;
let guessingAttempts = 0;
let guessingGameActive = false;

function startGuessingGame() {
    const gameDiv = document.getElementById('guessing-game');
    if (gameDiv.style.display === 'none') {
        gameDiv.style.display = 'block';
        guessingNumber = Math.floor(Math.random() * 100) + 1;
        guessingAttempts = 0;
        guessingGameActive = true;
        document.getElementById('guessResult').textContent = '';
        document.getElementById('guessAttempts').textContent = '0';
        document.getElementById('guessInput').value = '';
        document.getElementById('guessInput').focus();
    } else {
        gameDiv.style.display = 'none';
        guessingGameActive = false;
    }
}

function submitGuess() {
    if (!guessingGameActive) return;
    
    const guess = parseInt(document.getElementById('guessInput').value);
    if (isNaN(guess)) return;
    
    guessingAttempts++;
    document.getElementById('guessAttempts').textContent = guessingAttempts;
    
    let message = '';
    if (guess === guessingNumber) {
        message = `🎉 Correct! You won in ${guessingAttempts} attempts!`;
        guessingGameActive = false;
    } else if (guess < guessingNumber) {
        message = '📈 Too low! Try higher!';
    } else {
        message = '📉 Too high! Try lower!';
    }
    
    document.getElementById('guessResult').textContent = message;
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').focus();
}

document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && document.getElementById('guessing-game').style.display !== 'none') {
        submitGuess();
    }
});

// ======== GAME 5: COLOR MATCH ========
let colorScore = 0;
let colorGameActive = false;

function startColorGame() {
    const gameDiv = document.getElementById('color-game');
    if (gameDiv.style.display === 'none') {
        gameDiv.style.display = 'block';
        colorScore = 0;
        colorGameActive = true;
        generateColorChallenge();
    } else {
        gameDiv.style.display = 'none';
        colorGameActive = false;
    }
}

const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];
const colorValues = {
    'Red': '#FF0000',
    'Blue': '#0000FF',
    'Green': '#00FF00',
    'Yellow': '#FFFF00',
    'Purple': '#800080',
    'Orange': '#FFA500'
};

function generateColorChallenge() {
    const textColor = colors[Math.floor(Math.random() * colors.length)];
    const shuffled = [...colors].sort(() => Math.random() - 0.5);
    
    document.getElementById('colorText').textContent = textColor;
    const buttonsDiv = document.getElementById('colorButtons');
    buttonsDiv.innerHTML = '';
    
    shuffled.forEach(color => {
        const btn = document.createElement('button');
        btn.className = 'color-btn';
        btn.textContent = color;
        btn.style.backgroundColor = colorValues[color];
        btn.style.color = ['Yellow', 'Orange'].includes(color) ? '#000' : '#fff';
        btn.onclick = () => checkColorAnswer(color, textColor);
        buttonsDiv.appendChild(btn);
    });
}

function checkColorAnswer(selected, correct) {
    if (!colorGameActive) return;
    
    if (selected === correct) {
        colorScore++;
        document.getElementById('color-score').textContent = colorScore;
        generateColorChallenge();
    } else {
        alert(`Game Over! Final Score: ${colorScore}`);
        colorGameActive = false;
    }
}

// ======== GAME 6: QUICK MATH ========
let mathScore = 0;
let mathTimeLeft = 30;
let mathGameActive = false;
let mathProblem = {};

function startMathGame() {
    const gameDiv = document.getElementById('math-game');
    if (gameDiv.style.display === 'none') {
        gameDiv.style.display = 'block';
        mathScore = 0;
        mathTimeLeft = 30;
        mathGameActive = true;
        document.getElementById('math-score').textContent = '0';
        
        generateMathProblem();
        
        const timer = setInterval(() => {
            if (!mathGameActive) {
                clearInterval(timer);
                return;
            }
            mathTimeLeft--;
            document.getElementById('math-time').textContent = mathTimeLeft;
            
            if (mathTimeLeft <= 0) {
                clearInterval(timer);
                mathGameActive = false;
                alert(`Time's up! Final Score: ${mathScore}`);
            }
        }, 1000);
        
        document.getElementById('mathInput').focus();
    } else {
        gameDiv.style.display = 'none';
        mathGameActive = false;
    }
}

function generateMathProblem() {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    const operations = ['+', '-', '*'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    
    let answer = 0;
    if (op === '+') answer = a + b;
    else if (op === '-') answer = a - b;
    else answer = a * b;
    
    mathProblem = {text: `${a} ${op} ${b}`, answer: answer};
    document.getElementById('mathProblem').textContent = mathProblem.text;
    document.getElementById('mathInput').value = '';
    document.getElementById('mathResult').textContent = '';
}

function submitMathAnswer() {
    if (!mathGameActive) return;
    
    const answer = parseInt(document.getElementById('mathInput').value);
    
    if (answer === mathProblem.answer) {
        mathScore++;
        document.getElementById('math-score').textContent = mathScore;
        generateMathProblem();
    } else {
        document.getElementById('mathResult').textContent = '❌ Wrong!';
        setTimeout(() => generateMathProblem(), 1500);
    }
}

document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && document.getElementById('math-game').style.display !== 'none') {
        submitMathAnswer();
    }
});
