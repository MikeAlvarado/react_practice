import type { LevelPreset } from '../types/board.types'

export const LEVEL_PRESETS: LevelPreset[] = [
  { id: 'beginner', rows: 9, cols: 9, mines: 10 },
  { id: 'intermediate', rows: 16, cols: 16, mines: 40 },
  { id: 'expert', rows: 16, cols: 30, mines: 99 }
]

export const CUSTOM_SIZE_MIN = 5
export const CUSTOM_SIZE_MAX = 30
export const CUSTOM_DEFAULT_SIZE = 10
export const CUSTOM_MINE_DENSITY = 0.15
