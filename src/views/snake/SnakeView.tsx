import { useTranslation } from 'react-i18next'
import { useSnake } from './hooks/useSnake'
import { SnakeBoard } from './components/SnakeBoard'
import { GRID_SIZE, TICK_INTERVAL_MS } from './config/game'
import './SnakeView.css'

export const SnakeView = () => {
  const { t } = useTranslation()
  const { snake, status, reset } = useSnake(GRID_SIZE, TICK_INTERVAL_MS)
  const isOver = status !== 'PLAYING'

  return (
    <div className="snake-game">
      <div className="snake-game__header">
        <p className="snake-game__hint">{t('snake.hint')}</p>
        <span
          className={`snake-game__result${isOver ? ' snake-game__result--lose' : ''}`}
          aria-live="polite"
        >
          {isOver ? t('snake.status.lose') : ''}
        </span>
      </div>
      <div className="snake-board-wrap">
        <SnakeBoard gridSize={GRID_SIZE} body={snake.body} />
      </div>
      <div className="snake-game__footer">
        <button type="button" className="snake-game__btn" onClick={reset}>
          {t('snake.reset')}
        </button>
      </div>
    </div>
  )
}
