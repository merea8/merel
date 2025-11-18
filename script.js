const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');
const changeColorBtn = document.getElementById('changeColor');
const changePlayerBtn = document.getElementById('changePlayer');
const themeSelector = document.getElementById('themeSelector');
const soundToggle = document.getElementById('soundToggle');
const playerXname = document.getElementById('playerXname');
const playerOname = document.getElementById('playerOname');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;

// EVENTO 1–9: click su ogni cella
cells.forEach(cell => cell.addEventListener('click', handleClick));

// EVENTO 10: restart
restartBtn.addEventListener('click', restartGame);

// EVENTO 11: cambio colore sfondo
changeColorBtn.addEventListener('click', () => {
  document.body.style.backgroundColor =
    '#' + Math.floor(Math.random() * 16777215).toString(16);
});

// EVENTO 12: cambio giocatore iniziale
changePlayerBtn.addEventListener('click', () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `Ora inizia ${currentPlayer}`;
});

// EVENTO 13: cambio tema
themeSelector.addEventListener('change', () => {
  const theme = themeSelector.value;
  if (theme === "dark") document.body.style.filter = "invert(1)";
  else if (theme === "blue") document.body.style.backgroundColor = "#cce0ff";
  else document.body.style.filter = "invert(0)";
});

// EVENTO 14: ON/OFF suoni
soundToggle.addEventListener('change', () => {
  console.log(soundToggle.checked ? "Suoni attivi" : "Suoni disattivati");
});

// EVENTO 15 e 16: input giocatori
playerXname.addEventListener('input', () => {
  console.log("Player X:", playerXname.value);
});

playerOname.addEventListener('input', () => {
  console.log("Player O:", playerOname.value);
});


// -------------------
// Funzioni di gioco
// -------------------

function checkWin() {
  const winningCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winningCombos.some(combo => {
    const [a,b,c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add('taken');

  if (checkWin()) {
    message.textContent = `${getPlayerName(currentPlayer)} ha vinto!`;
    gameActive = false;
  } else if (!board.includes(null)) {
    message.textContent = "Pareggio!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Turno di ${getPlayerName(currentPlayer)}`;
  }
}

function restartGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  message.textContent = "";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('taken');
  });
}

function getPlayerName(symbol) {
  return symbol === 'X'
    ? (playerXname.value || "X")
    : (playerOname.value || "O");
}
k', restartGame);
