import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ViewLayout } from './layouts/ViewLayout'
import { IndexView } from './views/index/IndexView'
import { viewRegistry } from './views/index/registry'
import { LanguageSwitcher } from './components/LanguageSwitcher'

function App() {
  const { t } = useTranslation()

  return (
    <BrowserRouter>
      <LanguageSwitcher />
      <Routes>
        <Route path="/" element={<IndexView />} />
        {viewRegistry.map((view) => (
          <Route
            key={view.id}
            path={`/${view.id}`}
            element={
              <ViewLayout title={t(view.titleKey)}>
                <view.component />
              </ViewLayout>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
