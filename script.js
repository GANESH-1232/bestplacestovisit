// Game state
let playerScore = 0;
let computerScore = 0;

// DOM elements
const choices = document.querySelectorAll('.choice');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const result = document.getElementById('result');
const resetButton = document.getElementById('reset');
const playerMoveDisplay = document.getElementById('player-move');
const computerMoveDisplay = document.getElementById('computer-move');

// Move icons
const moveIcons = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// Game logic
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return 'draw';
    
    const winningCombos = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };
    
    return winningCombos[playerChoice] === computerChoice ? 'win' : 'lose';
}

function updateScore(outcome) {
    if (outcome === 'win') {
        playerScore++;
        playerScoreDisplay.textContent = playerScore;
    } else if (outcome === 'lose') {
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
    }
}

function updateMoveDisplays(playerChoice, computerChoice) {
    playerMoveDisplay.textContent = moveIcons[playerChoice];
    computerMoveDisplay.textContent = moveIcons[computerChoice];
    
    // Reset classes
    playerMoveDisplay.className = 'move-icon';
    computerMoveDisplay.className = 'move-icon';
    
    // Add appropriate classes based on outcome
    const outcome = determineWinner(playerChoice, computerChoice);
    if (outcome === 'win') {
        playerMoveDisplay.classList.add('winner');
        computerMoveDisplay.classList.add('loser');
    } else if (outcome === 'lose') {
        computerMoveDisplay.classList.add('winner');
        playerMoveDisplay.classList.add('loser');
    }
}

function updateResultMessage(outcome) {
    const messages = {
        win: 'You win! 🎉',
        lose: 'Computer wins! 😢',
        draw: "It's a draw! 🤝"
    };
    result.textContent = messages[outcome];
}

function handleChoice(e) {
    const playerChoice = e.currentTarget.dataset.choice;
    const computerChoice = getComputerChoice();
    
    // Disable buttons temporarily
    choices.forEach(choice => choice.style.pointerEvents = 'none');
    
    // Update move displays
    updateMoveDisplays(playerChoice, computerChoice);
    
    // Determine outcome and update score
    const outcome = determineWinner(playerChoice, computerChoice);
    updateScore(outcome);
    updateResultMessage(outcome);
    
    // Re-enable buttons after animation
    setTimeout(() => {
        choices.forEach(choice => choice.style.pointerEvents = 'auto');
    }, 1000);
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = '0';
    computerScoreDisplay.textContent = '0';
    result.textContent = 'Choose your move!';
    playerMoveDisplay.textContent = '❔';
    computerMoveDisplay.textContent = '❔';
    playerMoveDisplay.className = 'move-icon';
    computerMoveDisplay.className = 'move-icon';
}

// Event listeners
choices.forEach(choice => {
    choice.addEventListener('click', handleChoice);
});

resetButton.addEventListener('click', resetGame); 