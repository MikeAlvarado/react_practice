import type { Direction, GameStatus, Position, Snake } from '../types/snake.types'

export const DIRECTIONS: Record<'UP' | 'DOWN' | 'LEFT' | 'RIGHT', Direction> = {
  UP: [-1, 0],
  DOWN: [1, 0],
  LEFT: [0, -1],
  RIGHT: [0, 1]
}

const KEY_TO_DIRECTION: Record<string, Direction> = {
  w: DIRECTIONS.UP,
  a: DIRECTIONS.LEFT,
  s: DIRECTIONS.DOWN,
  d: DIRECTIONS.RIGHT,
  ArrowUp: DIRECTIONS.UP,
  ArrowLeft: DIRECTIONS.LEFT,
  ArrowDown: DIRECTIONS.DOWN,
  ArrowRight: DIRECTIONS.RIGHT
}

function createInitialSnakeBody(headRow: number, headColumn: number): Position[] {
  return [
    [headRow, headColumn],
    [headRow, headColumn - 1],
    [headRow, headColumn - 2]
  ]
}

export function createSnake(gridSize: number): Snake {
  const headRow = Math.floor(gridSize / 2)
  const headColumn = Math.floor(gridSize / 2)
  const body = createInitialSnakeBody(headRow, headColumn)

  return {
    body,
    direction: DIRECTIONS.RIGHT
  }
}

export function moveSnake(snake: Snake): Snake {
  const [rowMovement, columnMovement] = snake.direction
  const [currentHeadRow, currentHeadColumn] = snake.body[0]

  const newHeadPosition: Position = [currentHeadRow + rowMovement, currentHeadColumn + columnMovement]
  const bodyWithLastSegmentRemoved = snake.body.slice(0, -1)
  const newBody = [newHeadPosition, ...bodyWithLastSegmentRemoved]

  return {
    ...snake,
    body: newBody
  }
}

export function setDirection(snake: Snake, keypress: string): Snake {
  const requestedDirection = KEY_TO_DIRECTION[keypress]
  if (!requestedDirection) return snake

  const [currentDirectionRow, currentDirectionColumn] = snake.direction
  const [requestedDirectionRow, requestedDirectionColumn] = requestedDirection

  const isOppositeDirection =
    currentDirectionRow === -requestedDirectionRow && currentDirectionColumn === -requestedDirectionColumn
  if (isOppositeDirection) return snake

  return {
    ...snake,
    direction: requestedDirection
  }
}

function isOutOfBounds([row, col]: Position, gridSize: number): boolean {
  return row < 0 || row >= gridSize || col < 0 || col >= gridSize
}

function hitsOwnBody([headRow, headColumn]: Position, body: Position[]): boolean {
  return body.slice(1).some(([row, col]) => row === headRow && col === headColumn)
}

export function tickSnake(snake: Snake, gridSize: number): { snake: Snake; status: GameStatus } {
  const movedSnake = moveSnake(snake)
  const head = movedSnake.body[0]

  if (isOutOfBounds(head, gridSize) || hitsOwnBody(head, movedSnake.body)) {
    return { snake: movedSnake, status: 'LOSE' }
  }

  return { snake: movedSnake, status: 'PLAYING' }
}
