import type { Cell } from '../types/board.types'

interface BoardCellProps {
  cell: Cell
  onReveal: () => void
  onFlag: () => void
}

export const BoardCell = ({ cell, onReveal, onFlag }: BoardCellProps) => {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    onFlag()
  }

  const content = cell.revealed
    ? cell.isMine ? '💣' : cell.adjacentMines || ''
    : cell.flagged ? '🚩' : ''

  return (
    <button
      type="button"
      onClick={onReveal}
      onContextMenu={handleContextMenu}
      disabled={cell.revealed}
      style={{ width: 24, height: 24, padding: 0, textAlign: 'center' }}
    >
      {content}
    </button>
  )
}
