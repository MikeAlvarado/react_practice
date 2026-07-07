import type { ComponentType } from 'react'
import { RegisterForm } from './register/RegisterForm'

export interface ViewDefinition {
  id: string
  title: string
  description: string
  thumbnail?: string
  component: ComponentType
}

export const viewRegistry: ViewDefinition[] = [
  {
    id: 'register',
    title: 'Register',
    description: 'Account creation form with live country lookup.',
    component: RegisterForm,
  },
]
