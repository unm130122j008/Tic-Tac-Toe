const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const scoreText = document.getElementById('score');
const newGameBtn = document.getElementById('newGameBtn');
const quoteText = document.getElementById('quote');
const clickSound = document.getElementById('clickSound');

const quotes = [
  "Stay positive, work hard, make it happen!",
  "You are capable of amazing things!",
  "Believe in yourself and all that you are.",
  "Keep pushing forward!",
  "Every move counts — just like in life!"
];

let boardState = Array(9).fill('');
let currentPlayer = 'X';
let round = 1;
let scores = { X: 0, O: 0 };
let gameActive = true;

const winCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || boardState[index]) return;

  clickSound.play();
  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    scores[currentPlayer]++;
    statusText.textContent = `Player ${currentPlayer} wins Round ${round}!`;
    updateScore();
    gameActive = false;
    round++;

    if (scores[currentPlayer] === 2) {
      statusText.textContent = `🎉 Player ${currentPlayer} wins the Match!`;
      newGameBtn.style.display = 'inline-block';
    } else {
      setTimeout(startNextRound, 1500);
    }
  } else if (boardState.every(cell => cell)) {
    statusText.textContent = `Round ${round} is a Draw!`;
    round++;
    gameActive = false;
    setTimeout(startNextRound, 1500);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin(player) {
  return winCombos.some(combo => 
    combo.every(index => boardState[index] === player)
  );
}

function updateScore() {
  scoreText.textContent = `Score — X: ${scores.X} | O: ${scores.O}`;
}

function startNextRound() {
  boardState = Array(9).fill('');
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = round % 2 === 0 ? 'O' : 'X';
  statusText.textContent = `Round ${round} - Player ${currentPlayer}'s turn`;
  quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  gameActive = true;
}

function resetGame() {
  boardState = Array(9).fill('');
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  round = 1;
  scores = { X: 0, O: 0 };
  updateScore();
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  newGameBtn.style.display = 'none';
  gameActive = true;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
newGameBtn.addEventListener('click', resetGame);

// Initialize quote on first load
quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
