import { BrowserRouter } from 'react-router-dom'
import { Header, Footer } from './layout'
import { AppRoutes } from './routes'
import './styles'

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="min-h-screen pt-20">
        <AppRoutes />
      </main>

      <Footer />
    </BrowserRouter>
  )
}
