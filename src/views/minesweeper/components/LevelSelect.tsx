import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CUSTOM_DEFAULT_SIZE, CUSTOM_MINE_DENSITY, CUSTOM_SIZE_MAX, CUSTOM_SIZE_MIN, LEVEL_PRESETS } from '../config/levels'
import type { BoardConfig } from '../types/board.types'

interface LevelSelectProps {
  onStart: (config: BoardConfig) => void
}

const CUSTOM_ID = 'custom'

export const LevelSelect = ({ onStart }: LevelSelectProps) => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<string>(LEVEL_PRESETS[0].id)
  const [customSize, setCustomSize] = useState(CUSTOM_DEFAULT_SIZE)
  const isCustom = selected === CUSTOM_ID

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isCustom) {
      const size = Math.min(CUSTOM_SIZE_MAX, Math.max(CUSTOM_SIZE_MIN, customSize || CUSTOM_SIZE_MIN))
      const mines = Math.round(size * size * CUSTOM_MINE_DENSITY)
      onStart({ rows: size, cols: size, mines })
      return
    }

    const preset = LEVEL_PRESETS.find(level => level.id === selected)
    if (preset) onStart({ rows: preset.rows, cols: preset.cols, mines: preset.mines })
  }

  return (
    <form className="ms-setup-form" onSubmit={handleSubmit}>
      <div className="ms-level-grid">
        {LEVEL_PRESETS.map(level => (
          <button
            key={level.id}
            type="button"
            className={`ms-level-option ${selected === level.id ? 'is-selected' : ''}`}
            onClick={() => setSelected(level.id)}
          >
            <span className="ms-level-option__name">{t(`minesweeper.levels.${level.id}`)}</span>
            <span className="ms-level-option__meta">{level.cols}×{level.rows} · {level.mines} {t('minesweeper.setup.mines')}</span>
          </button>
        ))}
        <button
          type="button"
          className={`ms-level-option ${isCustom ? 'is-selected' : ''}`}
          onClick={() => setSelected(CUSTOM_ID)}
        >
          <span className="ms-level-option__name">{t('minesweeper.levels.custom')}</span>
          <span className="ms-level-option__meta">{t('minesweeper.setup.customMeta')}</span>
        </button>
      </div>

      <div className={`form-field-collapse ${isCustom ? '' : 'is-collapsed'}`} inert={!isCustom}>
        <div className="form-field-collapse__inner">
          <div className="form-field">
            <label htmlFor="customSize">{t('minesweeper.setup.customSize')}</label>
            <input
              type="number"
              id="customSize"
              name="customSize"
              min={CUSTOM_SIZE_MIN}
              max={CUSTOM_SIZE_MAX}
              value={customSize}
              onChange={(e) => setCustomSize(Number(e.target.value))}
            />
            <p className="form-field__hint">
              {t('minesweeper.setup.customHint', { min: CUSTOM_SIZE_MIN, max: CUSTOM_SIZE_MAX })}
            </p>
          </div>
        </div>
      </div>

      <button type="submit">{t('minesweeper.setup.start')}</button>
    </form>
  )
}
