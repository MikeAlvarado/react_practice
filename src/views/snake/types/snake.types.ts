export type Position = [row: number, col: number]

export type Direction = [rowMovement: number, columnMovement: number]

export interface Snake {
  body: Position[]
  direction: Direction
}

export type GameStatus = 'PLAYING' | 'LOSE'
