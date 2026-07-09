import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './ViewLayout.css'

interface ViewLayoutProps {
  title: string
  children: ReactNode
}

export const ViewLayout = ({ title, children }: ViewLayoutProps) => {
  const { t } = useTranslation()

  return (
    <div className="view-layout">
      <nav className="view-layout__topbar">
        <div className="view-layout__topbar-inner">
          <Link to="/" className="view-layout__back">
            <span aria-hidden="true">←</span> {t('layout.backToIndex')}
          </Link>
          <span className="view-layout__title">{title}</span>
        </div>
      </nav>
      <div className="view-layout__content">
        {children}
      </div>
    </div>
  )
}
