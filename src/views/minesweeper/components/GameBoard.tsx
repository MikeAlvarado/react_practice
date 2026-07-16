import { useTranslation } from 'react-i18next'
import { useMinesweeper } from '../hooks/useMinesweeper'
import { BoardCell } from './BoardCell'
import type { BoardConfig } from '../types/board.types'

interface GameBoardProps {
  config: BoardConfig
  onChangeLevel: () => void
}

export const GameBoard = ({ config, onChangeLevel }: GameBoardProps) => {
  const { t } = useTranslation()
  const { board, status, explodedCell, reveal, toggleFlag, reset } = useMinesweeper(config.rows, config.cols, config.mines)

  const flagCount = board.reduce((acc, row) => acc + row.filter(cell => cell.flagged).length, 0)
  const flagsLeft = config.mines - flagCount
  const isOver = status !== 'PLAYING'

  return (
    <div className="ms-game">
      <div className="ms-game__header">
        <span className="ms-game__flags" aria-label={t('minesweeper.flagsLeft', { count: flagsLeft })}>
          <span aria-hidden="true">🚩</span> {flagsLeft}
        </span>
        <span
          className={`ms-game__result${isOver ? ` ms-game__result--${status.toLowerCase()}` : ''}`}
          aria-live="polite"
        >
          {isOver ? t(`minesweeper.status.${status.toLowerCase()}`) : ''}
        </span>
      </div>
      <div className="ms-board-wrap">
        <div className="ms-board">
          {board.map((row, rowIndex) => (
            <div className="ms-board__row" key={rowIndex}>
              {row.map((cell, colIndex) => (
                <BoardCell
                  key={colIndex}
                  cell={cell}
                  disabled={isOver}
                  isExploded={explodedCell?.[0] === rowIndex && explodedCell?.[1] === colIndex}
                  onReveal={() => reveal(rowIndex, colIndex)}
                  onFlag={() => toggleFlag(rowIndex, colIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="ms-game__footer">
        <button type="button" className="ms-game__btn ms-game__btn--ghost" onClick={onChangeLevel}>
          {t('minesweeper.changeLevel')}
        </button>
        <button type="button" className="ms-game__btn" onClick={reset}>
          {t('minesweeper.reset')}
        </button>
      </div>
    </div>
  )
}
