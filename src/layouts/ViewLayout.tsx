import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './ViewLayout.css'

interface ViewLayoutProps {
  title: string
  children: ReactNode
}

export const ViewLayout = ({ title, children }: ViewLayoutProps) => {
  return (
    <div className="view-layout">
      <header className="view-layout__header">
        <Link to="/" className="view-layout__back">← Back to index</Link>
        <span className="view-layout__title">{title}</span>
      </header>
      <div className="view-layout__content">
        {children}
      </div>
    </div>
  )
}
