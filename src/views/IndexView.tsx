import { Link } from 'react-router-dom'
import { viewRegistry } from './registry'
import './IndexView.css'

export const IndexView = () => {
  return (
    <div className="index-view">
      <h1 className="index-view__title">Component showcase</h1>
      <p className="index-view__subtitle">Pick a view to open it.</p>
      <div className="index-view__grid">
        {viewRegistry.map((view) => (
          <Link key={view.id} to={`/${view.id}`} className="index-card">
            {view.status && (
              <span className={`index-card__status index-card__status--${view.status.tone}`}>
                {view.status.label}
              </span>
            )}
            {view.thumbnail && (
              <img className="index-card__thumbnail" src={view.thumbnail} alt="" />
            )}
            <h2 className="index-card__title">{view.title}</h2>
            <p className="index-card__description">{view.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
