import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ViewLayout } from './layouts/ViewLayout'
import { IndexView } from './views/IndexView'
import { viewRegistry } from './views/registry'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexView />} />
        {viewRegistry.map((view) => (
          <Route
            key={view.id}
            path={`/${view.id}`}
            element={
              <ViewLayout title={view.title}>
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
