export interface Cell {
  isMine: boolean
  revealed: boolean
  flagged: boolean
  adjacentMines: number
}

export type Board = Cell[][]

export type Position = [row: number, col: number]

export type GameStatus = 'PLAYING' | 'WIN' | 'LOSE'

export type RevealResult = 'CONTINUE' | 'LOSE'

export interface LevelPreset {
  id: string
  rows: number
  cols: number
  mines: number
}

export interface BoardConfig {
  rows: number
  cols: number
  mines: number
}
