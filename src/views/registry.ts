import type { ComponentType } from 'react'
import { RegisterForm } from './register/RegisterForm'

export interface ViewStatus {
  labelKey: string
  tone: 'warning' | 'info'
}

export interface ViewDefinition {
  id: string
  titleKey: string
  descriptionKey: string
  thumbnail?: string
  component: ComponentType
  status?: ViewStatus
}

export const viewRegistry: ViewDefinition[] = [
  {
    id: 'register',
    titleKey: 'index.views.register.title',
    descriptionKey: 'index.views.register.description',
    component: RegisterForm,
    status: {
      labelKey: 'index.views.register.status',
      tone: 'warning',
    },
  },
]
