// script.js - principale
document.addEventListener("DOMContentLoaded", () => {
  // selezioni
  const cells = Array.from(document.querySelectorAll('.cell'));
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

  // inizializza messaggio
  message.textContent = `Turno di ${currentPlayer}`;

  // ==========================
  // Funzioni di gioco
  // ==========================
  function getPlayerName(symbol) {
    return symbol === 'X' ? (playerXname.value || 'X') : (playerOname.value || 'O');
  }

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
    const index = Number(e.currentTarget.dataset.index);
    if (!gameActive || board[index]) return;

    // aggiorna stato
    board[index] = currentPlayer;
    e.currentTarget.textContent = currentPlayer;
    e.currentTarget.classList.add('taken');

    // controlla vittoria / pareggio
    if (checkWin()) {
      message.textContent = `${getPlayerName(currentPlayer)} ha vinto!`;
      gameActive = false;
      highlightWinningCombo();
    } else if (!board.includes(null)) {
      message.textContent = 'Pareggio!';
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
    message.textContent = `Turno di ${getPlayerName(currentPlayer)}`;
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('taken', 'win');
    });
  }

  // evidenzia combo vincente (se vuoi)
  function highlightWinningCombo() {
    const combos = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    combos.forEach(combo => {
      const [a,b,c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        cells[a].classList.add('win');
        cells[b].classList.add('win');
        cells[c].classList.add('win');
      }
    });
  }

  // ==========================
  // Event listeners (10+)
  // ==========================
  // 1-9: click sulle 9 celle
  cells.forEach(cell => cell.addEventListener('click', handleClick));

  // 10: restart
  restartBtn.addEventListener('click', restartGame);

  // 11: cambia colore sfondo (usa variabile CSS)
  changeColorBtn.addEventListener('click', () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
    document.documentElement.style.setProperty('--bg', randomColor);
  });

  // 12: cambia giocatore iniziale
  changePlayerBtn.addEventListener('click', () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Ora inizia ${getPlayerName(currentPlayer)}`;
  });

  // 13: cambio tema (applica classe al body)
  themeSelector.addEventListener('change', () => {
    const t = themeSelector.value;
    document.body.classList.remove('theme-light','theme-dark','theme-blue');
    if (t === 'dark') document.body.classList.add('theme-dark');
    else if (t === 'blue') document.body.classList.add('theme-blue');
    else document.body.classList.add('theme-light');
  });

  // 14: toggle suoni (esempio)
  soundToggle.addEventListener('change', () => {
    console.log('Suoni:', soundToggle.checked ? 'ON' : 'OFF');
  });

  // 15-16: input nomi giocatori
  playerXname.addEventListener('input', () => {
    message.textContent = `Turno di ${getPlayerName(currentPlayer)}`;
  });
  playerOname.addEventListener('input', () => {
    message.textContent = `Turno di ${getPlayerName(currentPlayer)}`;
  });

  // (opzionale) 17: supporto tastiera per navigare / inserire (esempio)
  document.addEventListener('keydown', (ev) => {
    if (!gameActive) return;
    // se premi 'r' ricomincia
    if (ev.key === 'r' || ev.key === 'R') restartGame();
  });
});

