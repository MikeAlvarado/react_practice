import type { Cell } from '../types/board.types'

interface BoardCellProps {
  cell: Cell
  disabled: boolean
  isExploded: boolean
  onReveal: () => void
  onFlag: () => void
}

export const BoardCell = ({ cell, disabled, isExploded, onReveal, onFlag }: BoardCellProps) => {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!cell.revealed) onFlag()
  }

  const content = cell.revealed
    ? cell.isMine ? '💣' : (cell.adjacentMines || '')
    : cell.flagged ? '🚩' : ''

  const classNames = [
    'ms-cell',
    cell.revealed ? 'ms-cell--revealed' : 'ms-cell--hidden',
    cell.revealed && cell.isMine ? 'ms-cell--mine' : '',
    isExploded ? 'ms-cell--exploded' : '',
    cell.revealed && !cell.isMine && cell.adjacentMines > 0 ? `ms-cell--n${cell.adjacentMines}` : ''
  ].filter(Boolean).join(' ')

  return (
    <button
      type="button"
      className={classNames}
      onClick={onReveal}
      onContextMenu={handleContextMenu}
      disabled={cell.revealed || disabled}
    >
      {content}
    </button>
  )
}
