import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { viewRegistry } from './registry'
import './IndexView.css'

export const IndexView = () => {
  const { t } = useTranslation()

  return (
    <div className="index-view">
      <h1 className="index-view__title">{t('index.title')}</h1>
      <p className="index-view__subtitle">{t('index.subtitle')}</p>
      <div className="index-view__grid">
        {viewRegistry.map((view) => (
          <Link key={view.id} to={`/${view.id}`} className="index-card">
            {view.status && (
              <span className={`index-card__status index-card__status--${view.status.tone}`}>
                {t(view.status.labelKey)}
              </span>
            )}
            {view.thumbnail && (
              <img className="index-card__thumbnail" src={view.thumbnail} alt="" />
            )}
            <div className="index-card__title-row">
              <h2 className="index-card__title">{t(view.titleKey)}</h2>
              <span className="index-card__version">{view.version}</span>
            </div>
            <p className="index-card__description">{t(view.descriptionKey)}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
