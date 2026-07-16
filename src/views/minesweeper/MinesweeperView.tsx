import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LevelSelect } from './components/LevelSelect'
import { GameBoard } from './components/GameBoard'
import type { BoardConfig } from './types/board.types'
import './MinesweeperView.css'

export const MinesweeperView = () => {
  const { t } = useTranslation()
  const [config, setConfig] = useState<BoardConfig | null>(null)

  if (!config) {
    return (
      <div className="ms-card">
        <div className="ms-card__mark" aria-hidden="true">💣</div>
        <h2 className="ms-card__title">{t('minesweeper.setup.title')}</h2>
        <p className="ms-card__subtitle">{t('minesweeper.setup.subtitle')}</p>
        <LevelSelect onStart={setConfig} />
      </div>
    )
  }

  return (
    <GameBoard
      key={`${config.rows}x${config.cols}x${config.mines}`}
      config={config}
      onChangeLevel={() => setConfig(null)}
    />
  )
}
