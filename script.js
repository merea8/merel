:root {
  --bg: #f4f4f4; /* variabile per background, modificabile da JS */
  --cell-bg: #fff;
  --cell-border: #333;
  --text-color: #111;
}

/* temi */
body.theme-light {
  background-color: var(--bg);
  color: var(--text-color);
}

body.theme-dark {
  background-color: #222;
  color: #eee;
}

body.theme-blue {
  background-color: #cce0ff;
  color: #03396c;
}

body {
  font-family: sans-serif;
  text-align: center;
  margin: 0;
  padding: 20px;
  transition: background-color 250ms ease, color 250ms ease;
}

/* controlli */
#controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 10px;
}

/* griglia tris */
#game {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 8px;
  justify-content: center;
  margin: 20px auto;
}

.cell {
  width: 100px;
  height: 100px;
  background-color: var(--cell-bg);
  border: 2px solid var(--cell-border);
  font-size: 2.4em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: background-color 150ms ease, transform 120ms ease;
}

.cell:hover {
  transform: translateY(-3px);
}

.cell.taken {
  pointer-events: none;
  opacity: 0.9;
}

/* messaggio */
#message {
  margin-top: 10px;
  font-weight: bold;
  min-height: 1.4em;
}
