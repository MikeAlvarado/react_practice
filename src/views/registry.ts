import type { ComponentType } from 'react'
import { RegisterForm } from './register/RegisterForm'

export interface ViewStatus {
  label: string
  tone: 'warning' | 'info'
}

export interface ViewDefinition {
  id: string
  title: string
  description: string
  thumbnail?: string
  component: ComponentType
  status?: ViewStatus
}

export const viewRegistry: ViewDefinition[] = [
  {
    id: 'register',
    title: 'Register',
    description: 'Account creation, sign-in, and password reset — with a live country lookup.',
    component: RegisterForm,
    status: {
      label: 'API deprecated',
      tone: 'warning',
    },
  },
]
