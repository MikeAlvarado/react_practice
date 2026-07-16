import type { Board, GameStatus, Position, RevealResult } from '../types/board.types'

export function createBoard(rows: number, cols: number): Board {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      revealed: false,
      flagged: false,
      adjacentMines: 0
    }))
  )
}

export function cloneBoard(board: Board): Board {
  return board.map(row => row.map(cell => ({ ...cell })))
}

export function getNeighbors(row: number, col: number, rows: number, cols: number): Position[] {
  const neighbors: Position[] = []

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

export function setFlag(board: Board, row: number, col: number): void {
  const cell = board[row][col]

  if (cell.revealed) return

  cell.flagged = !cell.flagged
}

export function checkGame(board: Board, mineCount: number): GameStatus {
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

export function setMines(board: Board, firstClick: Position, mineCount: number): void {
  const rows = board.length
  const cols = board[0].length
  const [firstRow, firstCol] = firstClick

  // Zona prohibida: la celda del click + sus 8 vecinos
  const forbidden = new Set<string>()
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

export function calculateAdjacentMines(board: Board): void {
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

export function revealSlot(board: Board, row: number, col: number): RevealResult {
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
