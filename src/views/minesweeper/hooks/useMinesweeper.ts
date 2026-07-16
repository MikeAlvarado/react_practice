import { useRef, useState } from 'react'
import {
  calculateAdjacentMines,
  checkGame,
  cloneBoard,
  createBoard,
  revealAllMines,
  revealSlot,
  setFlag,
  setMines
} from '../logic/board'
import type { Board, GameStatus, Position } from '../types/board.types'

export function useMinesweeper(rows: number, cols: number, mineCount: number) {
  const [board, setBoard] = useState<Board>(() => createBoard(rows, cols))
  const [status, setStatus] = useState<GameStatus>('PLAYING')
  const [explodedCell, setExplodedCell] = useState<Position | null>(null)
  const isFirstClick = useRef(true)

  const reveal = (row: number, col: number) => {
    if (status !== 'PLAYING') return

    const nextBoard = cloneBoard(board)

    if (isFirstClick.current) {
      setMines(nextBoard, [row, col], mineCount)
      calculateAdjacentMines(nextBoard)
      isFirstClick.current = false
    }

    const result = revealSlot(nextBoard, row, col)

    if (result === 'LOSE') {
      revealAllMines(nextBoard)
      setExplodedCell([row, col])
      setBoard(nextBoard)
      setStatus('LOSE')
      return
    }

    setBoard(nextBoard)
    setStatus(checkGame(nextBoard, mineCount))
  }

  const toggleFlag = (row: number, col: number) => {
    if (status !== 'PLAYING') return
    if (isFirstClick.current) return

    const cell = board[row][col]
    if (cell.revealed) return

    const flagCount = board.reduce((acc, r) => acc + r.filter(c => c.flagged).length, 0)
    if (!cell.flagged && flagCount >= mineCount) return

    const nextBoard = cloneBoard(board)
    setFlag(nextBoard, row, col)
    setBoard(nextBoard)
  }

  const reset = () => {
    isFirstClick.current = true
    setExplodedCell(null)
    setStatus('PLAYING')
    setBoard(createBoard(rows, cols))
  }

  return { board, status, explodedCell, reveal, toggleFlag, reset }
}
