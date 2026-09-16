import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HomePage } from './pages/HomePage'
import { EstadosPage } from './pages/EstadosPage'
import { EstadoDetailPage } from './pages/EstadoDetailPage'
import { MunicipiosPage } from './pages/MunicipiosPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-neutral-50">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/estados" element={<EstadosPage />} />
            <Route path="/estados/:uf" element={<EstadoDetailPage />} />
            <Route path="/municipios" element={<MunicipiosPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
