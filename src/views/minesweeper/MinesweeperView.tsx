import { useTranslation } from 'react-i18next'
import { useMinesweeper } from './hooks/useMinesweeper'
import { BoardCell } from './components/BoardCell'

const ROWS = 9
const COLS = 9
const MINE_COUNT = 10

export const MinesweeperView = () => {
  const { t } = useTranslation()
  const { board, status, reveal, toggleFlag, reset } = useMinesweeper(ROWS, COLS, MINE_COUNT)

  return (
    <div>
      <p>{t(`minesweeper.status.${status.toLowerCase()}`, { count: MINE_COUNT })}</p>
      <button type="button" onClick={reset}>{t('minesweeper.reset')}</button>
      <div>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((cell, colIndex) => (
              <BoardCell
                key={colIndex}
                cell={cell}
                onReveal={() => reveal(rowIndex, colIndex)}
                onFlag={() => toggleFlag(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
