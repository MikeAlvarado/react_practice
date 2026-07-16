import { useRef, useState } from 'react'
import {
  calculateAdjacentMines,
  checkGame,
  cloneBoard,
  createBoard,
  revealSlot,
  setFlag,
  setMines
} from '../logic/board'
import type { Board, GameStatus } from '../types/board.types'

export function useMinesweeper(rows: number, cols: number, mineCount: number) {
  const [board, setBoard] = useState<Board>(() => createBoard(rows, cols))
  const [status, setStatus] = useState<GameStatus>('PLAYING')
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
    setBoard(nextBoard)

    if (result === 'LOSE') {
      setStatus('LOSE')
      return
    }

    setStatus(checkGame(nextBoard, mineCount))
  }

  const toggleFlag = (row: number, col: number) => {
    if (status !== 'PLAYING') return

    const nextBoard = cloneBoard(board)
    setFlag(nextBoard, row, col)
    setBoard(nextBoard)
  }

  const reset = () => {
    isFirstClick.current = true
    setStatus('PLAYING')
    setBoard(createBoard(rows, cols))
  }

  return { board, status, reveal, toggleFlag, reset }
}
