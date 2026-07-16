import type { ComponentType } from 'react'
import { RegisterForm } from '../register/RegisterForm'
import { MinesweeperView } from '../minesweeper/MinesweeperView'
import { SnakeView } from '../snake/SnakeView'

export interface ViewStatus {
  labelKey: string
  tone: 'warning' | 'info' | 'beta'
}

export interface ViewDefinition {
  id: string
  titleKey: string
  descriptionKey: string
  version: string
  thumbnail?: string
  component: ComponentType
  status?: ViewStatus
}

export const viewRegistry: ViewDefinition[] = [
  {
    id: 'register',
    titleKey: 'index.views.register.title',
    descriptionKey: 'index.views.register.description',
    version: 'v1.2',
    component: RegisterForm,
    status: {
      labelKey: 'index.views.register.status',
      tone: 'warning',
    },
  },
  {
    id: 'minesweeper',
    titleKey: 'index.views.minesweeper.title',
    descriptionKey: 'index.views.minesweeper.description',
    version: 'v1.1',
    component: MinesweeperView,
  },
  {
    id: 'snake',
    titleKey: 'index.views.snake.title',
    descriptionKey: 'index.views.snake.description',
    version: 'v0.2',
    component: SnakeView,
    status: {
      labelKey: 'index.views.snake.status',
      tone: 'beta',
    },
  },
]
