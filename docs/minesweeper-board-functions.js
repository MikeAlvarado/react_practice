// Copia de solo lectura de la lógica del buscaminas: funciones puras, sin nada de React.
// Pensada para leerse y ejecutarse directo aquí, sin necesidad de compilar TypeScript
// ni de levantar la app. El código real (con tipos) vive en:
// src/views/minesweeper/logic/board.ts — si tocas algo ahí, refleja el cambio aquí también.
//
// ---------------------------------------------------------------------------
// Cómo correr este archivo
// ---------------------------------------------------------------------------
// Requiere Node.js (no depende de nada del proyecto). Desde la raíz del repo:
//
//   node docs/minesweeper-board-functions.js
//
// Eso ejecuta el bloque de ejemplo al final del archivo (ver `runExample`),
// que arma un tablero 4x4 chiquito, coloca minas, revela celdas y lo imprime
// en consola para que se vea el flujo completo de una partida.
//
// Si en cambio quieres usar estas funciones desde otro script (este archivo
// es un módulo ES — el repo tiene "type": "module" en package.json):
//
//   import {
//     createBoard, setMines, calculateAdjacentMines, revealSlot
//   } from './minesweeper-board-functions.js'
//
//   const board = createBoard(9, 9)
//   setMines(board, [0, 0], 10)       // el primer click siempre es seguro
//   calculateAdjacentMines(board)
//   revealSlot(board, 0, 0)
// ---------------------------------------------------------------------------

// Crea un tablero de `rows` x `cols` donde todas las celdas empiezan vacías,
// ocultas y sin bandera. `adjacentMines` se calcula después, una vez que ya
// sabemos dónde quedaron las minas.
export function createBoard(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      revealed: false,
      flagged: false,
      adjacentMines: 0
    }))
  )
}

// Copia profunda del tablero (filas y celdas nuevas). Se usa antes de mutar
// el tablero para que React detecte el cambio de referencia y vuelva a pintar.
export function cloneBoard(board) {
  return board.map(row => row.map(cell => ({ ...cell })))
}

// Devuelve las coordenadas [row, col] de las hasta 8 celdas vecinas de
// (row, col), descartando las que caen fuera del tablero.
export function getNeighbors(row, col, rows, cols) {
  const neighbors = []

  for (let dRow = -1; dRow <= 1; dRow++) {
    for (let dCol = -1; dCol <= 1; dCol++) {
      if (dRow === 0 && dCol === 0) continue // saltar la celda misma

      const newRow = row + dRow
      const newCol = col + dCol

      const isValidRow = newRow >= 0 && newRow < rows
      const isValidCol = newCol >= 0 && newCol < cols

      if (isValidRow && isValidCol) {
        neighbors.push([newRow, newCol])
      }
    }
  }

  return neighbors
}

// Pone o quita la bandera de una celda oculta. No hace nada si la celda ya
// está revelada (no tiene sentido marcar algo que ya se descubrió).
export function setFlag(board, row, col) {
  const cell = board[row][col]

  if (cell.revealed) return

  cell.flagged = !cell.flagged
}

// Determina si la partida ya se ganó: gana cuando todas las celdas que NO
// son mina están reveladas. Si aún faltan celdas por descubrir, sigue en
// juego (la derrota se detecta aparte, en `revealSlot`, al pisar una mina).
export function checkGame(board, mineCount) {
  const rows = board.length
  const cols = board[0].length
  const totalCells = rows * cols

  const revealedCount = board.reduce((acc, row) => {
    return acc + row.filter(cell => cell.revealed).length
  }, 0)

  const cellsToWin = totalCells - mineCount

  if (revealedCount === cellsToWin) {
    return 'WIN'
  }

  return 'PLAYING'
}

// Coloca `mineCount` minas al azar, evitando la celda del primer click y sus
// 8 vecinos (así el primer click nunca puede perder ni destapar una mina).
export function setMines(board, firstClick, mineCount) {
  const rows = board.length
  const cols = board[0].length
  const [firstRow, firstCol] = firstClick

  // Zona prohibida: la celda del click + sus 8 vecinos
  const forbidden = new Set()
  forbidden.add(`${firstRow},${firstCol}`)
  getNeighbors(firstRow, firstCol, rows, cols).forEach(([r, c]) => {
    forbidden.add(`${r},${c}`)
  })

  let minesPlaced = 0
  while (minesPlaced < mineCount) {
    const r = Math.floor(Math.random() * rows)
    const c = Math.floor(Math.random() * cols)
    const key = `${r},${c}`

    if (forbidden.has(key)) continue      // dentro de zona 3x3 excluida
    if (board[r][c].isMine) continue      // ya era mina, evita duplicar

    board[r][c].isMine = true
    minesPlaced++
  }
}

// Recorre el tablero y, para cada mina, le suma 1 a `adjacentMines` de sus
// vecinas. Se llama una sola vez, justo después de `setMines`.
export function calculateAdjacentMines(board) {
  const rows = board.length
  const cols = board[0].length

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isMine) {
        getNeighbors(r, c, rows, cols).forEach(([nr, nc]) => {
          board[nr][nc].adjacentMines++
        })
      }
    }
  }
}

// Revela una celda. Si es una mina, la partida se pierde ("LOSE"). Si no
// tiene minas vecinas (adjacentMines === 0), se propaga en cascada
// revelando también a sus vecinas (el clásico "flood fill" del buscaminas).
export function revealSlot(board, row, col) {
  const cell = board[row][col]

  // Guard clause: rompe el loop infinito A<->B, y evita re-procesar
  if (cell.revealed || cell.flagged) return 'CONTINUE'

  cell.revealed = true

  if (cell.isMine) {
    return 'LOSE'
  }

  if (cell.adjacentMines === 0) {
    const rows = board.length
    const cols = board[0].length
    getNeighbors(row, col, rows, cols).forEach(([nr, nc]) => {
      revealSlot(board, nr, nc)
    })
  }

  return 'CONTINUE'
}

// Se usa cuando el jugador pierde: descubre todas las minas del tablero.
export function revealAllMines(board) {
  board.forEach(row => row.forEach(cell => {
    if (cell.isMine) cell.revealed = true
  }))
}

// ---------------------------------------------------------------------------
// Ejemplo ejecutable: solo corre si llamas a este archivo directo con Node
// (no corre si otro archivo hace `import` de este módulo).
// ---------------------------------------------------------------------------
function printBoard(board) {
  const symbol = (cell) => {
    if (cell.flagged) return '🚩'
    if (!cell.revealed) return '·'
    if (cell.isMine) return '💣'
    return cell.adjacentMines === 0 ? ' ' : String(cell.adjacentMines)
  }

  console.log(board.map(row => row.map(symbol).join(' ')).join('\n'))
}

function runExample() {
  const rows = 4
  const cols = 4
  const mineCount = 3
  const firstClick = [0, 0]

  let board = createBoard(rows, cols)
  console.log('Tablero recién creado (todo oculto):')
  printBoard(board)

  // El primer click se resuelve antes de sembrar minas, así nunca pierdes
  // de entrada: la celda que clickeaste y sus vecinas quedan libres de minas.
  setMines(board, firstClick, mineCount)
  calculateAdjacentMines(board)

  const [row, col] = firstClick
  const result = revealSlot(board, row, col)
  console.log(`\nDespués de revelar (${row}, ${col}) -> ${result}:`)
  printBoard(board)

  console.log(`\n¿Ya se ganó? -> ${checkGame(board, mineCount)}`)

  // Simula perder: revela a la fuerza una celda con mina para ver revealAllMines.
  const mineCell = board.flat().find(cell => cell.isMine && !cell.revealed)
  if (mineCell) mineCell.revealed = true
  revealAllMines(board)
  console.log('\nTablero al perder (todas las minas visibles):')
  printBoard(board)
}

const isMainModule = import.meta.url === `file://${process.argv[1]}`
if (isMainModule) {
  runExample()
}
