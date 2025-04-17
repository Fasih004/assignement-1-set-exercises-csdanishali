// Game state variables
let score = 0;
let lives = 3;
let round = 1;
let correctColor = null;

// DOM elements
const rgbValueElement = document.getElementById('rgbValue');
const optionsContainer = document.getElementById('optionsContainer');
const messageElement = document.getElementById('message');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const roundElement = document.getElementById('round');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const finalRoundElement = document.getElementById('finalRound');
const playAgainButton = document.getElementById('playAgain');

// Initialize the game
function initGame() {
    score = 0;
    lives = 3;
    round = 1;
    updateScoreboard();
    gameOverElement.style.display = 'none';
    generateNewRound();
}

// Generate a new round with random color options
function generateNewRound() {
    optionsContainer.innerHTML = '';
    messageElement.textContent = '';
    messageElement.className = 'message';
    
    // Generate random RGB color
    correctColor = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
    
    // Display the RGB code to guess
    rgbValueElement.textContent = `RGB(${correctColor.r}, ${correctColor.g}, ${correctColor.b})`;
    
    // Generate color options (1 correct + 2 incorrect)
    const options = [correctColor];
    for (let i = 0; i < 2; i++) {
        options.push({
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        });
    }
    
    // Shuffle options
    shuffleArray(options);
    
    // Create option elements
    options.forEach(color => {
        const optionElement = document.createElement('div');
        optionElement.className = 'color-option';
        optionElement.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
        
        optionElement.addEventListener('click', () => {
            checkAnswer(color);
        });
        
        optionsContainer.appendChild(optionElement);
    });
}

// Check if selected color is correct
function checkAnswer(selectedColor) {
    // Disable all options after selection
    const options = document.querySelectorAll('.color-option');
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });

    if (selectedColor.r === correctColor.r && 
        selectedColor.g === correctColor.g && 
        selectedColor.b === correctColor.b) {
        // Correct answer
        score += 10;
        round++;
        messageElement.textContent = 'Correct! +10 points';
        messageElement.className = 'message correct';
    } else {
        // Incorrect answer
        lives--;
        messageElement.textContent = 'Wrong! Try again';
        messageElement.className = 'message incorrect';
    }
    
    updateScoreboard();
    
    // Check game over or continue
    if (lives <= 0) {
        setTimeout(endGame, 1000);
    } else {
        setTimeout(generateNewRound, 1500);
    }
}

// Update scoreboard display
function updateScoreboard() {
    scoreElement.textContent = score;
    livesElement.textContent = lives;
    roundElement.textContent = round;
}

// End game and show results
function endGame() {
    finalScoreElement.textContent = score;
    finalRoundElement.textContent = round - 1;
    gameOverElement.style.display = 'flex';
}

// Utility function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Event listeners
playAgainButton.addEventListener('click', initGame);

// Start game when page loads
window.addEventListener('load', initGame);