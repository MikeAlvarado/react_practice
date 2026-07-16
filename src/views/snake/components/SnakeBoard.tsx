import type { Position } from '../types/snake.types'

interface SnakeBoardProps {
  gridSize: number
  body: Position[]
}

export const SnakeBoard = ({ gridSize, body }: SnakeBoardProps) => {
  const rowIndexes = Array.from({ length: gridSize }, (_, row) => row)
  const colIndexes = Array.from({ length: gridSize }, (_, col) => col)

  return (
    <div className="snake-board">
      {rowIndexes.map((row) => (
        <div className="snake-board__row" key={row}>
          {colIndexes.map((col) => {
            const segmentIndex = body.findIndex(([segmentRow, segmentCol]) => segmentRow === row && segmentCol === col)
            const isHead = segmentIndex === 0
            const isBody = segmentIndex > 0

            const classNames = [
              'snake-cell',
              isHead ? 'snake-cell--head' : '',
              isBody ? 'snake-cell--body' : ''
            ].filter(Boolean).join(' ')

            return <div className={classNames} key={col} />
          })}
        </div>
      ))}
    </div>
  )
}
