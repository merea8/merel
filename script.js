// Seleziona tutte le celle della griglia
const cells = document.querySelectorAll('.cell');

// Seleziona l'elemento che mostra i messaggi
const message = document.getElementById('message');

// Seleziona il pulsante "Ricomincia"
const restartBtn = document.getElementById('restart');

// Giocatore corrente: inizia sempre "X"
let currentPlayer = 'X';

// Array che rappresenta lo stato del tabellone (9 caselle)
let board = Array(9).fill(null);

// Variabile che indica se la partita è ancora in corso
let gameActive = true;


// ----------------------------
// FUNZIONE: Controlla la vittoria
// ----------------------------
function checkWin() {

  // Tutte le combinazioni vincenti del tris
  const winningCombos = [
    [0,1,2], // riga 1
    [3,4,5], // riga 2
    [6,7,8], // riga 3
    [0,3,6], // colonna 1
    [1,4,7], // colonna 2
    [2,5,8], // colonna 3
    [0,4,8], // diagonale
    [2,4,6]  // diagonale opposta
  ];

  // Controlla se una combinazione è completa
  return winningCombos.some(combo => {
    const [a, b, c] = combo;

    // Una combinazione è vincente se:
    // - le tre celle NON sono vuote
    // - hanno lo stesso simbolo
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}


// ----------------------------
// FUNZIONE: Gestisce il click su una cella
// ----------------------------
function handleClick(e) {

  // Ottiene l'indice della cella cliccata
  const index = e.target.dataset.index;

  // Se la partita è finita o la cella è già occupata → ignora il click
  if (!gameActive || board[index]) return;

  // Inserisce il simbolo del giocatore corrente nella cella
  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  // Aggiunge una classe che evita ulteriori click
  e.target.classList.add('taken');

  // Controlla se questo movimento ha portato a una vittoria
  if (checkWin()) {
    message.textContent = `${currentPlayer} ha vinto!`; // Messaggio di vittoria
    gameActive = false; // Ferma il gioco
  }
  // Se la griglia è piena e nessuno ha vinto → pareggio
  else if (!board.includes(null)) {
    message.textContent = 'Pareggio!';
    gameActive = false;
  }
  // Altrimenti si cambia giocatore
  else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Turno di ${currentPlayer}`;
  }
}


// ----------------------------
// FUNZIONE: Ricomincia la partita
// ----------------------------
function restartGame() {

  // Reset delle variabili
  board = Array(9).fill(null);
  gameActive = true;
  currentPlayer = 'X';

  // Cancella messaggio
  message.textContent = '';

  // Cancella simboli nelle celle
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken'); // La cella torna cliccabile
  });
}


// ----------------------------
// AGGIUNTA EVENTI
// ----------------------------

// Per ogni cella: aggiunge un evento click che esegue handleClick()
cells.forEach(cell => cell.addEventListener('click', handleClick));

// Aggiunge evento al pulsante "Ricomincia"
restartBtn.addEventListener('click', restartGame);
